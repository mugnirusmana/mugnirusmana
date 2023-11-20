import React, { useEffect, useState } from "react";

import BreadCrumb from "../../components/breadcrumb";
import DataTable from '../../components/data-table';
import SelectOption from "../../components/select-option";
import Alert from "../../components/alert";

const Attenders = () => {
  const [filter, setFilter] = useState({
    keyword: '',
    attendance: {},
    status: {},
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
      label: 'Participants',
      object: 'participants',
      titlePosition: 'left',
      customRender: (data) => {
        if (data?.participants > 3) {
          return <span className="whitespace-nowrap">More than 3 People</span>
        } else if (data?.participants === 1) {
          return <span className="whitespace-nowrap">1 Person</span>
        } else {
          return <span className="whitespace-nowrap">{data?.participants} Pople</span>
        }
      }
    },
    {
      label: 'Attendance',
      object: 'attendance',
      customRender: (data) => {
        if (data?.attendance === 1) {
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
        if (data?.status === 1) {
          return <div className="w-full flex items-center justify-center"><span className="text-xs bg-green-600 rounded p-1 text-white text-center whitespace-nowrap">Displayed</span></div>
        } else {
          return <div className="w-full flex items-center justify-center"><span className="text-xs bg-red-600 rounded p-1 text-white text-center whitespace-nowrap">Not Displayed</span></div>
        }
      }
    }
  ]
  const data = {
    data: [
      {id: 1, name: 'John Doe 1', participants: 1, attendance: 1, status: 0, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
      {id: 2, name: 'John Doe 2', participants: 4, attendance: 1, status: 1, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
      {id: 3, name: 'John Doe 3', participants: 1, attendance: 0, status: 0, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
      {id: 4, name: 'John Doe 4', participants: 3, attendance: 1, status: 0, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
      {id: 5, name: 'John Doe 5', participants: 2, attendance: 1, status: 1, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
      {id: 6, name: 'John Doe 6', participants: 1, attendance: 0, status: 0, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
      {id: 7, name: 'John Doe 7', participants: 3, attendance: 1, status: 0, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
      {id: 8, name: 'John Doe 8', participants: 1, attendance: 0, status: 0, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
      {id: 8, name: 'John Doe 9', participants: 2, attendance: 1, status: 0, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
      {id: 10, name: 'John Doe 10', participants: 1, attendance: 1, status: 0, comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'},
    ],
    paginate: {
      totalPage: 10,
      totalData: 100,
    }
  }

  useEffect(() => {
    getListData({
      keyword: filter?.keyword !== '' ? filter?.keyword : null,
      attendance: filter?.attendance?.value ? parseInt(filter?.attendance?.value) : null,
      status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
      page: parseInt(1),
      perPage: parseInt(10),
    });
  }, []);

  const onReset = () => {
    let resetParams = {
      keyword: null,
      attendance: {},
      status: {},
    }
    setFilter({...resetParams, keyword: ''});
    getListData({keyword: null, attendance: null, status: null, page: parseInt(currnetPage), perPage: parseInt(perPage)})
  }

  const getListData = (params) => {
    let result = {
      keyword: params?.keyword ?? null,
      attendance: params?.attendance ?? null,
      status: params?.status ?? null,
      page: params?.page ?? 1,
      perPage: params?.perPage ?? 10,
    }

    console.log('get data ', result);
  }

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden hide-scroll">
      <BreadCrumb
        title={'Attenders'}
        list={[
          {title: 'Attenders', path: '', active: true},
        ]}
      />

      <div className="w-full h-fit flex flex-col bg-white shadow-lg rounded p-5 pb-16 desktop:pb-5">
        <DataTable
          isLoading={false}
          data={data}
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
              {!data?.status ? (
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
              {!data?.status ? (
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
                    options={[{label: 'Displayed', value: '1'}, {label: 'Not Displayed', value: '2'}]}
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
                    onClick={() => getListData({
                      keyword: filter?.keyword !== '' ? filter?.keyword : null,
                      attendance: filter?.attendance?.value ? parseInt(filter?.attendance?.value) : null,
                      status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
                      page: parseInt(currnetPage),
                      perPage: parseInt(perPage),
                    })}>Filter</div>
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
            getListData({
              keyword: filter?.keyword !== '' ? filter?.keyword : null,
              attendance: filter?.attendance?.value ? parseInt(filter?.attendance?.value) : null,
              status: filter?.status?.value ? parseInt(filter?.status?.value) : null,
              page: parseInt(currnetPage),
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
        type="info"
        title="Displayed"
        message={`<span>Will you display</span>&nbsp;<span class="font-bold">${selectData?.name}</span>&nbsp;<span>comment</span>?`}
        showCancelButton={false}
        onCancel={() => {
          setSelectData({})
          setShowDisplayedAlert(false);
        }}
        onConfirm={() => {
          setSelectData({})
          setShowDisplayedAlert(false);
          setShowSuccessdAlert(true);
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
    </div>
  );
};

export default Attenders;
