import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { defaultAttenderList, getAttenderList } from "../../redux/attenderListSlice";
import { defaultAttenderDisplayed, submitAttenderDisplay } from "../../redux/attenderDisplayedSlice";
import { defaultAttenderNotDisplayed, submitAttenderNotDisplay } from "../../redux/attenderNotDisplayedSlice";
import { defaultAttenderRemove, removeAttender } from "../../redux/attenderRemoveSlice";
import { defaultAttenderQr, regenerateAttenderQr } from "../../redux/attenderQrSlice";

import { decodeParams } from './../../helper';

import BreadCrumb from "../../components/breadcrumb";
import DataTable from '../../components/data-table';
import SelectOption from "../../components/select-option";
import Alert from "../../components/alert";

const Attenders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const auth = useSelector(({ auth }) => auth);
  const attenderList = useSelector(({ attenderList }) => attenderList);
  const attenderDisplayed = useSelector(({ attenderDisplayed }) => attenderDisplayed);
  const attenderNotDisplayed = useSelector(({ attenderNotDisplayed }) => attenderNotDisplayed);
  const attenderRemove = useSelector(({ attenderRemove }) => attenderRemove);
  const attenderQr = useSelector(({ attenderQr }) => attenderQr);
  const [isLoaded, setIsLoaded] = useState(false);
  const [alertListError, setAlertListError] = useState({show: false, message: ''});
  const [alertDisplayed, setAlertDisplayed] = useState({show: false, type: '', message: ''});
  const [alertNotDisplayed, setAlertNotDisplayed] = useState({show: false, type: '', message: ''});
  const [alertRemove, setAlertRemove] = useState({show: false, type: '', message: ''})
  const [alertRegenerateQr, setAlertRegenerateQr] = useState({show: false, type: '', message: ''})
  const [filter, setFilter] = useState({
    keyword: decodeParams(location?.search)?.keyword ?? '',
    attendance: { value: decodeParams(location?.search)?.attendance === 'will_not_attend' ? 2 : decodeParams(location?.search)?.attendance === 'will_attend' ? 1 : null, label: decodeParams(location?.search)?.attendance === 'will_not_attend' ? 'Will Not Attend' : decodeParams(location?.search)?.attendance === 'will_attend' ? 'Will Attend' : null},
    status: { value: decodeParams(location?.search)?.status === 'displayed' ? 2 : decodeParams(location?.search)?.status === 'not_displayed' ? 1 : null, label: decodeParams(location?.search)?.status === 'displayed' ? 'Displayed' : decodeParams(location?.search)?.status === 'not_displayed' ? 'Not Displayed' : null},
    status_attend: {value: decodeParams(location?.search)?.scan === 'yes' ? 2 : decodeParams(location?.search)?.scan === 'no' ? 1 : null, label: decodeParams(location?.search)?.scan === 'yes' ? 'Scanned' : decodeParams(location?.search)?.scan === 'no' ? 'Not Scan Yet' : null},
  })
  const [currnetPage, setCurrentPage] = useState('1');
  const [perPage, setPerPage] = useState('10');
  const [selectData, setSelectData] = useState({})
  const [showSuccessdAlert, setShowSuccessdAlert] = useState(false);
  const [showNotDisplayedAlert, setShowNotDisplayedAlert] = useState(false);
  const [showDisplayedAlert, setShowDisplayedAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showRegenerateQrAlert, setShowRegenerateQrAlert] = useState(false);
  const title = [
    {
      label: 'Name',
      object: 'name',
      titlePosition: 'left',
      customRender: (data) => {
        return <span className="whitespace-nowrap">{data?.name}</span>
      }
    },
    {
      label: 'Emails',
      object: 'email',
      titlePosition: 'left',
      customRender: (data) => {
        return <span className="whitespace-nowrap">{data?.email}</span>
      }
    },
    {
      label: 'Attendance',
      object: 'attendance',
      customRender: (data) => {
        if (parseInt(data?.attendance) === 1) {
          return <div className="w-full flex items-center justify-center"><span className="text-xs bg-green-600 rounded p-1 text-white text-center whitespace-nowrap">Will Attend</span></div>
        } else {
          return <div className="w-full flex items-center justify-center"><span className="text-xs bg-red-600 rounded p-1 text-white text-center whitespace-nowrap">Will Not Attend</span></div>
        }
      }
    },
    {
      label: 'Status',
      object: 'status',
      customRender: (data) => {
        if (parseInt(data?.status) === 2) {
          return <div className="w-full flex items-center justify-center"><span className="text-xs bg-green-600 rounded p-1 text-white text-center whitespace-nowrap">Displayed</span></div>
        } else {
          return <div className="w-full flex items-center justify-center"><span className="text-xs bg-red-600 rounded p-1 text-white text-center whitespace-nowrap">Not Displayed</span></div>
        }
      }
    },
    {
      label: 'Scan QR',
      object: 'status_attend',
      customRender: (data) => {
        if (parseInt(data?.status_attend) === 2) {
          return <div className="w-full flex items-center justify-center"><span className="text-xs bg-green-600 rounded p-1 text-white text-center whitespace-nowrap">Scanned</span></div>
        } else {
          return <div className="w-full flex items-center justify-center"><span className="text-xs bg-red-600 rounded p-1 text-white text-center whitespace-nowrap">Not Scan Yet</span></div>
        }
      }
    }
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      setIsLoaded(false);
      getListData({
        keyword: filter?.keyword !== '' ? filter?.keyword : null,
        attendance: filter?.attendance?.value ? parseInt(filter?.attendance?.value) : null,
        status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
        status_attend: filter?.status_attend?.value ? parseInt(filter?.status_attend?.value) : null,
        page: parseInt(1),
        perPage: parseInt(10),
      });
    }
  }, [isLoaded])

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage,
      data,
    } = attenderList;

    if(!isLoading && isSuccess) {
      setCurrentPage(data?.currentPage);
      setPerPage(data?.perPage);
      dispatch(defaultAttenderList());
    }

    if(!isLoading && isError) {
      setAlertListError({show: true, message: errorMessage});
    }
  }, [attenderList]);

  useEffect(() => {
    let {
      isLoading,
      isError,
      isSuccess,
      errorMessage
    } = attenderDisplayed;

    if (!isLoading && isSuccess) {
      setShowDisplayedAlert(false);
      setAlertDisplayed({
        show: true,
        type: 'success',
        message: `<span clas="font-bold">${selectData?.name}</span>&nbsp;<span>comment successfully</span>&nbsp;<span clas="font-bold">Displayed</span>`
      })
    }

    if (!isLoading && isError) {
      setShowDisplayedAlert(false);
      setAlertDisplayed({
        show: true,
        type: 'danger',
        message: errorMessage
      })
    }

  }, [attenderDisplayed]);

  useEffect(() => {
    let {
      isLoading,
      isError,
      isSuccess,
      errorMessage,
    } = attenderNotDisplayed;

    if (!isLoading && isSuccess) {
      setShowNotDisplayedAlert(false);
      setAlertNotDisplayed({
        show: true,
        type: 'success',
        message: `<span class="font-bold">${selectData?.name}</span>&nbsp;<span>comment successfully</span>&nbsp;<span class="font-bold">Hidden</span>`
      })
    }

    if (!isLoading && isError) {
      setShowNotDisplayedAlert(false);
      setAlertNotDisplayed({
        show: true,
        type: 'danger',
        message: errorMessage
      })
    }

  }, [attenderNotDisplayed]);

  useEffect(() => {
    let {
      isLoading,
      isError,
      isSuccess,
      errorMessage,
    } = attenderRemove;

    if (!isLoading && isSuccess) {
      setShowDeleteAlert(false);
      setAlertRemove({
        show: true,
        type: 'success',
        message: `<span class="font-bold">${selectData?.name}</span>&nbsp;<span>comment successfully</span>&nbsp;<span class="font-bold">Deleted</span>`
      });
    }

    if (!isLoading && isError) {
      setShowDeleteAlert(false);
      setAlertRemove({
        show: true,
        type: 'danger',
        message: errorMessage
      });
    }

  }, [attenderRemove]);

  useEffect(() => {
    let {
      isLoading,
      isError,
      isSuccess,
      errorMessage
    } = attenderQr;

    if(!isLoading && isSuccess) {
      setShowRegenerateQrAlert(false);
      setAlertRegenerateQr({
        show: true,
        type: 'success',
        message: `<span class="font-bold">${selectData?.name}</span>&nbsp;<span>comment successfully</span>&nbsp;<span class="font-bold">Regenerated</span>`
      });
    }

    if(!isLoading && isError) {
      setShowRegenerateQrAlert(false);
      setAlertRegenerateQr({
        show: true,
        type: 'danger',
        message: errorMessage
      })
    }

  }, [attenderQr]);

  const onReset = () => {
    let resetParams = {
      keyword: null,
      attendance: {},
      status: {},
      status_attend: {},
    }
    setCurrentPage('1');
    setFilter({...resetParams, keyword: ''});
    getListData({keyword: null, attendance: null, status: null, status_attend: null, page: 1, perPage: parseInt(perPage)})
  }

  const getListData = (params) => {
    if (!attenderList?.isLoading) {
      let result = {
        keyword: params?.keyword ?? '',
        attendance: params?.attendance ?? '',
        status: params?.status ?? '',
        status_attend: params?.status_attend ?? '',
        page: params?.page ?? 1,
        limit: params?.perPage ?? 10,
      }
      dispatch(getAttenderList(result));
    }
  }

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden hide-scroll">
      <BreadCrumb
        title={'Attenders'}
        list={[
          {title: 'Attenders', path: '', active: true},
        ]}
      />

      <div className="w-full h-fit flex flex-col bg-white shadow-lg rounded pb-16 desktop:pb-5">
        <DataTable
          isLoading={attenderList?.isLoading}
          data={attenderList?.data?.list}
          title={title}
          perPage={perPage}
          currentPage={currnetPage}
          showInfo={true}
          withNumber={true}
          withAction={true}
          renderAction={(data) => (
            <div className="flex flex-row items-center justify-end gap-2">
              <span
                className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-sky-600 text-white"
                onClick={() => navigate(`/attenders/${data?.id}`)}
              >
                <i className="fa-solid fa-eye"></i>
              </span>
              {auth?.data?.role === 'admin' ? (
                <>
                  {parseInt(data?.status) === 1 ? (
                    <span
                      className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-orange-400 text-white"
                      onClick={() => {
                        setSelectData(data);
                        setShowDisplayedAlert(true);
                      }}
                    >
                      <i className="fa-solid fa-toggle-on"></i>
                    </span>
                  ) : (
                    <span
                      className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-green-600 text-white"
                      onClick={() => {
                        setSelectData(data);
                        setShowNotDisplayedAlert(true);
                      }}
                    >
                      <i className="fa-solid fa-toggle-off"></i>
                    </span>
                  )}
                  {parseInt(data?.status_attend) === 1 ? (
                    <span
                      className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-amber-600 text-white"
                      onClick={() => {
                        setSelectData(data);
                        setShowRegenerateQrAlert(true);
                      }}
                    >
                      <i className="fa-solid fa-qrcode"></i>
                    </span>
                  ) : null}
                  {parseInt(data?.status) === 1 ? (
                    <span
                      className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-red-600 text-white"
                      onClick={() => {
                        setSelectData(data);
                        setShowDeleteAlert(true);
                      }}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </span>
                  ) : null}
                </>
              ) : null}
            </div>
          )}
          renderCustomFilter={() => (
            <div className="w-full flex flex-col mb-5">
              <span className="font-bold">Filter</span>
              <div className="w-full flex flex-col tablet:flex-row gap-2">
                <div className="w-full flex flex-col gap-1">
                  <span className="text-xs">Keyword</span>
                  <input
                    type={'text'}
                    className="w-full px-2 rounded h-[30px] text outline-none border border-sky-900 text-xs"
                    placeholder="Search by name or email"
                    value={filter?.keyword}
                    onChange={(e) => setFilter({...filter, keyword: e?.currentTarget?.value})}
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-xs">Attendance</span>
                  <SelectOption
                    isLoading={false}
                    placeholder={'Select Attendance'}
                    options={[{label: 'Will Attend', value: '1'}, {label: 'Will Not Attend', value: '2'}]}
                    objectLabel={'label'}
                    objectUniq={'value'}
                    value={filter?.attendance}
                    showClear={true}
                    onClear={(data) => setFilter({...filter, attendance: data})}
                    showSearch={false}
                    onChange={(data) => setFilter({...filter, attendance: data})}
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-xs">Status</span>
                  <SelectOption
                    isLoading={false}
                    placeholder={'Select Status'}
                    options={[{label: 'Displayed', value: '2'}, {label: 'Not Displayed', value: '1'}]}
                    objectLabel={'label'}
                    objectUniq={'value'}
                    value={filter?.status}
                    showClear={true}
                    onClear={(data) => setFilter({...filter, status: data})}
                    showSearch={false}
                    onChange={(data) => setFilter({...filter, status: data})}
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-xs">Status Scan</span>
                  <SelectOption
                    isLoading={false}
                    placeholder={'Select Status'}
                    options={[{label: 'Scanned', value: '2'}, {label: 'Not Scan Yet', value: '1'}]}
                    objectLabel={'label'}
                    objectUniq={'value'}
                    value={filter?.status_attend}
                    showClear={true}
                    onClear={(data) => setFilter({...filter, status_attend: data})}
                    showSearch={false}
                    onChange={(data) => setFilter({...filter, status_attend: data})}
                  />
                </div>
                <div className="w-full tablet:w-fit flex flex-col gap-1">
                  <span className="text-xs hidden tablet:block">&nbsp;</span>
                  <div
                    className="cursor-pointer w-full tablet:w-fit h-full flex items-center justify-center text-white border border-sky-900 bg-sky-900 rounded px-4"
                    onClick={() => {
                      setCurrentPage('1');
                      getListData({
                        keyword: filter?.keyword !== '' ? filter?.keyword : null,
                        attendance: filter?.attendance?.value ? parseInt(filter?.attendance?.value) : null,
                        status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
                        status_attend: filter?.status_attend?.value ? parseInt(filter?.status_attend?.value) : null,
                        page: 1,
                        perPage: parseInt(perPage),
                      })
                    }}>Filter</div>
                </div>
                <div className="w-full tablet:w-fit flex flex-col gap-1" onClick={onReset}>
                  <span className="text-xs hidden tablet:block">&nbsp;</span>
                  <div className="cursor-pointer w-full tablet:w-fit h-full flex items-center justify-center text-sky-900 border border-sky-900 rounded px-4">Reset</div>
                </div>
              </div>
            </div>
          )}
          onChangePerPage={(data) => {
            setPerPage(data)
            setCurrentPage('1');
            getListData({
              keyword: filter?.keyword !== '' ? filter?.keyword : null,
              attendance: filter?.attendance?.value ? parseInt(filter?.attendance?.value) : null,
              status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
              status_attend: filter?.status_attend?.value ? parseInt(filter?.status_attend?.value) : null,
              page: 1,
              perPage: parseInt(data),
            })
          }}
          onChangePage={(data) => {
            setCurrentPage(data);
            getListData({
              keyword: filter?.keyword !== '' ? filter?.keyword : null,
              attendance: filter?.attendance?.value ? parseInt(filter?.attendance?.value) : null,
              status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
              status_attend: filter?.status_attend?.value ? parseInt(filter?.status_attend?.value) : null,
              page: parseInt(data),
              perPage: parseInt(perPage),
            })
          }}
          onPrevPage={(data) => {
            setCurrentPage(data);
            getListData({
              keyword: filter?.keyword !== '' ? filter?.keyword : null,
              attendance: filter?.attendance?.value ? parseInt(filter?.attendance?.value) : null,
              status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
              status_attend: filter?.status_attend?.value ? parseInt(filter?.status_attend?.value) : null,
              page: parseInt(data),
              perPage: parseInt(perPage),
            })
          }}
          onNextPage={(data) => {
            setCurrentPage(data);
            getListData({
              keyword: filter?.keyword !== '' ? filter?.keyword : null,
              attendance: filter?.attendance?.value ? parseInt(filter?.attendance?.value) : null,
              status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
              status_attend: filter?.status_attend?.value ? parseInt(filter?.status_attend?.value) : null,
              page: parseInt(data),
              perPage: parseInt(perPage),
            })
          }}
        />
      </div>

      <Alert
        show={showSuccessdAlert}
        type="success"
        title="Success"
        message={`Data Successfully Deleted`}
        showCancelButton={false}
        onConfirm={() => setShowSuccessdAlert(false)}
      />

      <Alert
        show={showDisplayedAlert}
        isLoading={attenderDisplayed?.isLoading}
        type="info"
        title="Display Comment"
        message={`<span>Will you display</span>&nbsp;<span class="font-bold">${selectData?.name}</span>&nbsp;<span>comment</span>?`}
        showCancelButton={true}
        onCancel={() => {
          setSelectData({})
          setShowDisplayedAlert(false);
        }}
        onConfirm={() => dispatch(submitAttenderDisplay(selectData?.id))}
      />

      <Alert
        show={alertDisplayed?.show}
        type={alertDisplayed?.type}
        title="Display Comment"
        message={alertDisplayed.message}
        showCancelButton={false}
        onConfirm={() => {
          setAlertDisplayed({
            show:false,
            type: '',
            message: ''
          })
          setSelectData({});
          dispatch(defaultAttenderDisplayed());
          getListData({
            keyword: filter?.keyword !== '' ? filter?.keyword : null,
            attendance: filter?.attendance?.value ? parseInt(filter?.attendance?.value) : null,
            status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
            page: 1,
            perPage: parseInt(perPage)
          })
        }}
      />

      <Alert
        show={showNotDisplayedAlert}
        type="info"
        title="Hide Comment"
        message={`<span>Will you hide</span>&nbsp;<span class="font-bold">${selectData?.name}</span>&nbsp;<span>comment</span>?`}
        showCancelButton={true}
        onCancel={() => {
          setSelectData({})
          setShowNotDisplayedAlert(false);
        }}
        onConfirm={() => dispatch(submitAttenderNotDisplay(selectData?.id))}
      />

      <Alert
        show={alertNotDisplayed?.show}
        type={alertNotDisplayed?.type}
        title="Hide Comment"
        message={alertNotDisplayed.message}
        showCancelButton={false}
        onConfirm={() => {
          setAlertNotDisplayed({
            show:false,
            type: '',
            message: ''
          })
          setSelectData({});
          dispatch(defaultAttenderNotDisplayed());
          getListData({
            keyword: filter?.keyword !== '' ? filter?.keyword : null,
            attendance: filter?.attendance?.value ? parseInt(filter?.attendance?.value) : null,
            status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
            page: 1,
            perPage: parseInt(perPage)
          })
        }}
      />

      <Alert
        show={showDeleteAlert}
        type="delete"
        title="Delete"
        message={`<span>Will you delete</span>&nbsp;<span class="font-bold">${selectData?.name}</span>&nbsp;<span>comment</span>?`}
        showCancelButton={true}
        onCancel={() => {
          setSelectData({})
          setShowDeleteAlert(false);
        }}
        onConfirm={() => dispatch(removeAttender(selectData?.id))}
      />

      <Alert
        show={alertRemove?.show}
        type={alertRemove?.type}
        title="Delete"
        message={alertRemove.message}
        showCancelButton={false}
        onConfirm={() => {
          setAlertRemove({
            show:false,
            type: '',
            message: ''
          })
          setSelectData({});
          dispatch(defaultAttenderRemove());
          getListData({
            keyword: filter?.keyword !== '' ? filter?.keyword : null,
            attendance: filter?.attendance?.value ? parseInt(filter?.attendance?.value) : null,
            status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
            page: 1,
            perPage: parseInt(perPage)
          })
        }}
      />

      <Alert
        show={alertListError?.show}
        type="danger"
        title="Get List"
        message={alertListError?.message}
        showCancelButton={false}
        onConfirm={() => {
          setAlertListError({show: false, message: ''});
          dispatch(defaultAttenderList());
        }}
      />

      <Alert
        isLoading={attenderQr?.isLoading}
        show={showRegenerateQrAlert}
        type="question"
        title="Regenerate QR"
        message={`<span>Will you regenerate</span>&nbsp;<span class="font-bold">${selectData?.name}</span>&nbsp;<span>QR</span>?`}
        showCancelButton={true}
        onCancel={() => {
          setSelectData({})
          setShowRegenerateQrAlert(false);
        }}
        onConfirm={() => dispatch(regenerateAttenderQr(selectData?.id))}
      />

      <Alert
        show={alertRegenerateQr?.show}
        type={alertRegenerateQr?.type}
        title={"Regenerate Qr"}
        message={alertRegenerateQr?.message}
        showCancelButton={false}
        onConfirm={() => {
          setAlertRegenerateQr({
            show: false,
            type: '',
            message: ''
          });
          setSelectData({});
          dispatch(defaultAttenderQr());
          getListData({
            keyword: filter?.keyword !== '' ? filter?.keyword : null,
            attendance: filter?.attendance?.value ? parseInt(filter?.attendance?.value) : null,
            status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
            page: 1,
            perPage: parseInt(perPage)
          })
        }}
      />
    </div>
  );
};

export default Attenders;
