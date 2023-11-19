import React, { useEffect, useState } from "react";

import BreadCrumb from "./../../components/breadcrumb";
import DataTable from './../../components/data-table';

const Comments = () => {
  const [filter, setFilter] = useState({
    keyword: '',
    attendance: '0',
    status: '0',
  })
  const [currnetPage, setCurrentPage] = useState('');
  const [perPage, setPerPage] = useState('');
  const title = [
    {
      label: 'Name',
      object: 'name',
    },
    {
      label: 'Participants',
      object: 'participants',
      customRender: (data) => {
        if (data?.participants > 3) {
          return <span>More then 3 People</span>
        } else if (data?.participants === 1) {
          return <span>1 Person</span>
        } else {
          return <span>{data?.participants} Pople</span>
        }
      }
    },
    {
      label: 'attendance',
      object: 'attendance',
      customRender: (data) => {
        if (data?.attendance === 1) {
          return <span className="text-xs bg-green-600 rounded p-1 text-white">Will Attend</span>
        } else {
          return <span className="text-xs bg-red-600 rounded p-1 text-white">Will Not Attend</span>
        }
      }
    },
    {
      label: 'Status',
      object: 'status',
      customRender: (data) => {
        if (data?.status === 1) {
          return <span className="text-xs bg-green-600 rounded p-1 text-white">Displayed</span>
        } else {
          return <span className="text-xs bg-red-600 rounded p-1 text-white">Not Displayed</span>
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
    setCurrentPage('1');
    setPerPage('10');
  }, []);

  useEffect(() => {
    if (currnetPage && perPage) {
      getListData();
    }
  }, [currnetPage, perPage]);

  const onReset = () => {
    let resetField = {
      keyword: '',
      attendance: '0',
      status: '0',
    }
    setFilter(resetField);
    getListData(resetField)
  }

  const getListData = (resetParams = {}) => {
    let params = {
      keyword: resetParams?.keyword??filter?.keyword,
      attendance: resetParams?.attendance??filter?.attendance,
      status: resetParams?.status??filter?.status,
      page: currnetPage,
      perPage: perPage,
    }

    console.log('get data ', params);
  }

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden hide-scroll">
      <BreadCrumb
        title={'Comments'}
        list={[
          {title: 'Comments', path: '', active: true},
        ]}
      />

      <div className="w-full h-fit flex flex-col bg-white shadow-lg rounded p-5 pb-16 desktop:pb-5">

        <div className="w-full flex flex-col mb-5">
          <span className="font-bold">Filter</span>
          <div className="w-full flex flex-col desktop:flex-row gap-2">
            <div className="w-full flex flex-col gap-1">
              <span className="text-xs">Keyword</span>
              <input
                type={'text'}
                className="w-full px-2 rounded h-[30px] text outline-none border border-sky-900"
                placeholder="Search by name"
                value={filter?.keyword}
                onChange={(e) => setFilter({...filter, keyword: e?.currentTarget?.value})}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <span className="text-xs">Attendance</span>
              <select
                className="w-full outline-none border border-sky-900 rounded h-[30px]"
                value={filter?.attendance}
                onChange={(e) => setFilter({...filter, attendance: e?.currentTarget?.value})}
              >
                <option value="0">All</option>
                <option value="1">Will Attend</option>
                <option value="2">Will Not Attend</option>
              </select>
            </div>
            <div className="w-full flex flex-col gap-1">
              <span className="text-xs">Status</span>
              <select
                className="w-full outline-none border border-sky-900 rounded h-[30px]"
                value={filter?.status}
                onChange={(e) => setFilter({...filter, status: e?.currentTarget?.value})}
              >
                <option value="0">All</option>
                <option value="1">Displayed</option>
                <option value="2">Not Displayed</option>
              </select>
            </div>
            <div className="w-full desktop:w-fit flex flex-col gap-1">
              <span className="text-xs hidden desktop:block">&nbsp;</span>
              <div className="cursor-pointer w-full desktop:w-fit h-full flex items-center justify-center text-white border border-sky-900 bg-sky-900 rounded px-4" onClick={getListData}>Filter</div>
            </div>
            <div className="w-full desktop:w-fit flex flex-col gap-1" onClick={onReset}>
              <span className="text-xs hidden desktop:block">&nbsp;</span>
              <div className="cursor-pointer w-full desktop:w-fit h-full flex items-center justify-center text-sky-900 border border-sky-900 rounded px-4">Reset</div>
            </div>
          </div>
        </div>

        <DataTable
          isLoading={false}
          config={data}
          title={title}
          perPage={perPage}
          currentPage={currnetPage}
          showInfo={true}
          showTitleFooter={true}
          withNumber={true}
          withAction={true}
          renderAction={(data) => {
            return (
              <div className="flex flex-row gap-2">
                <span
                  className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-sky-600 text-white"
                  onClick={() => console.log('data open ', data)}
                >
                  <i className="fa-solid fa-eye"></i>
                </span>
                {!data?.status ? (
                  <span
                    className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-orange-400 text-white"
                    onClick={() => console.log('data toggle on ', data)}
                  >
                    <i className="fa-solid fa-toggle-on"></i>
                  </span>
                ) : (
                  <span
                    className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-green-600 text-white"
                    onClick={() => console.log('data toggle off ', data)}
                  >
                    <i className="fa-solid fa-toggle-off"></i>
                  </span>
                )}
                {!data?.status ? (
                  <span
                    className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-red-600 text-white"
                    onClick={() => console.log('data remove ', data)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </span>
                ) : null}
              </div>
            )
          }}
          onChangePerPage={(data) => setPerPage(data)}
          onChangePage={(data) => setCurrentPage(data)}
        />
      </div>
    </div>
  );
};

export default Comments;
