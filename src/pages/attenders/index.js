import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { defaultAttenderList, getAttenderList } from "../../redux/attenderListSlice";
import { defaultAttenderDisplayed, submitAttenderDisplay } from "../../redux/attenderDisplayedSlice";

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
  const [alertListError, setAlertListError] = useState({show: false, message: ''});
  const [alertDisplayed, setAlertDisplayed] = useState({show: false, type: '', message: ''});
  const [filter, setFilter] = useState({
    keyword: decodeParams(location?.search)?.keyword ?? '',
    attendance: { value: decodeParams(location?.search)?.attendance === 'will_not_attend' ? 2 : decodeParams(location?.search)?.attendance === 'will_attend' ? 1 : null, label: decodeParams(location?.search)?.attendance === 'will_not_attend' ? 'Will Not Attend' : decodeParams(location?.search)?.attendance === 'will_attend' ? 'Will Attend' : null},
    status: { value: decodeParams(location?.search)?.status === 'displayed' ? 2 : decodeParams(location?.search)?.status === 'not_displayed' ? 1 : null, label: decodeParams(location?.search)?.status === 'displayed' ? 'Displayed' : decodeParams(location?.search)?.status === 'not_displayed' ? 'Not Displayed' : null},
  })
  const [currnetPage, setCurrentPage] = useState('1');
  const [perPage, setPerPage] = useState('10');
  const [selectData, setSelectData] = useState({})
  const [showSuccessdAlert, setShowSuccessdAlert] = useState(false);
  const [showNotDisplayedAlert, setShowNotDisplayedAlert] = useState(false);
  const [showDisplayedAlert, setShowDisplayedAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
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
    }
  ];

  useEffect(() => {
    getListData({
      keyword: filter?.keyword !== '' ? filter?.keyword : null,
      attendance: filter?.attendance?.value ? parseInt(filter?.attendance?.value) : null,
      status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
      page: parseInt(1),
      perPage: parseInt(10),
    });
  }, []);

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
        message: `<span class="font-bold">${selectData?.name}</span>&nbsp;<span>comment successfully</span>&nbsp;<span class="font-bold">Displayed</span>`
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

  }, [attenderDisplayed])

  const onReset = () => {
    let resetParams = {
      keyword: null,
      attendance: {},
      status: {},
    }
    setCurrentPage('1');
    setFilter({...resetParams, keyword: ''});
    getListData({keyword: null, attendance: null, status: null, page: 1, perPage: parseInt(perPage)})
  }

  const getListData = (params) => {
    if (!attenderList?.isLoading) {
      let result = {
        keyword: params?.keyword ?? '',
        attendance: params?.attendance ?? '',
        status: params?.status ?? '',
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
                onClick={() => console.log('data open ', data)}
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
                    placeholder="Search by name"
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
        title="Displayed"
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
        title="Displayed"
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
        title="Don't Display"
        message={`<span>Won't you display</span>&nbsp;<span class="font-bold">${selectData?.name}</span>&nbsp;<span>comment</span>?`}
        showCancelButton={true}
        onCancel={() => {
          setSelectData({})
          setShowNotDisplayedAlert(false);
        }}
        onConfirm={() => {
          setSelectData({})
          setShowNotDisplayedAlert(false);
          setShowSuccessdAlert(true);
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
        onConfirm={() => {
          setSelectData({})
          setShowDeleteAlert(false)
          setShowSuccessdAlert(true);
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
    </div>
  );
};

export default Attenders;
