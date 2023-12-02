import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { defaultBlockDomainList, getBlockDomainList } from "../../redux/blockDomainListSlice";
import { defaultBlockDomainRemove, removeBlockDomain } from "../../redux/blockDomainRemoveSlice";

import { decodeParams } from './../../helper';

import BreadCrumb from "../../components/breadcrumb";
import DataTable from '../../components/data-table';
import Alert from "../../components/alert";

const BlockDomain = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const blockDomainList = useSelector(({ blockDomainList }) => blockDomainList);
  const blockDomainRemove = useSelector(({ blockDomainRemove }) => blockDomainRemove);
  const [isLoaded, setIsLoaded] = useState(false);
  const [alertListError, setAlertListError] = useState({show: false, message: ''});
  const [alertRemove, setAlertRemove] = useState({show: false, type: '', message: ''})
  const [filter, setFilter] = useState({
    keyword: decodeParams(location?.search)?.keyword ?? '',
  })
  const [currnetPage, setCurrentPage] = useState('1');
  const [perPage, setPerPage] = useState('10');
  const [selectData, setSelectData] = useState({})
  const [showSuccessdAlert, setShowSuccessdAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const title = [
    {
      label: 'Name',
      object: 'name',
      titlePosition: 'left',
      customRender: (data) => {
        return <span className="whitespace-nowrap">{data?.name}</span>
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
    } = blockDomainList;

    if(!isLoading && isSuccess) {
      setCurrentPage(data?.currentPage);
      setPerPage(data?.perPage);
      dispatch(defaultBlockDomainList());
    }

    if(!isLoading && isError) {
      setAlertListError({show: true, message: errorMessage});
    }
  }, [blockDomainList]);

  useEffect(() => {
    let {
      isLoading,
      isError,
      isSuccess,
      errorMessage,
    } = blockDomainRemove;

    if (!isLoading && isSuccess) {
      setShowDeleteAlert(false);
      setAlertRemove({
        show: true,
        type: 'success',
        message: `<span class="font-bold">${selectData?.name}</span>&nbsp;<span>email domain successfully</span>&nbsp;<span class="font-bold">Deleted</span>`
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

  }, [blockDomainRemove]);

  const onReset = () => {
    let resetParams = {
      keyword: null,
    }
    setCurrentPage('1');
    setFilter({...resetParams, keyword: ''});
    getListData({keyword: null, page: 1, perPage: parseInt(perPage)})
  }

  const getListData = (params) => {
    if (!blockDomainList?.isLoading) {
      let result = {
        keyword: params?.keyword ?? '',
        page: params?.page ?? 1,
        limit: params?.perPage ?? 10,
      }
      dispatch(getBlockDomainList(result));
    }
  }

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden hide-scroll">
      <BreadCrumb
        title={'Block Domain'}
        list={[
          {title: 'Block Domain', path: '', active: true},
        ]}
      />

      <div className="w-full h-fit flex flex-col bg-white shadow-lg rounded pb-16 desktop:pb-5">
        <DataTable
          isLoading={blockDomainList?.isLoading}
          data={blockDomainList?.data?.list}
          title={title}
          perPage={perPage}
          currentPage={currnetPage}
          showInfo={true}
          withNumber={true}
          withAction={true}
          showAddAction={true}
          addLabel={'Add Email Domain +'}
          onAdd={() => {console.log('add action')}}
          renderAction={(data) => (
            <div className="flex flex-row items-center justify-end gap-2">
              <span
                className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-red-600 text-white"
                onClick={() => {
                  setSelectData(data);
                  setShowDeleteAlert(true);
                }}
              >
                <i className="fa-solid fa-trash"></i>
              </span>
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
                <div className="w-full tablet:w-fit flex flex-col gap-1">
                  <span className="text-xs hidden tablet:block">&nbsp;</span>
                  <div
                    className="cursor-pointer w-full tablet:w-fit h-full flex items-center justify-center text-white border border-sky-900 bg-sky-900 rounded px-4"
                    onClick={() => {
                      setCurrentPage('1');
                      getListData({
                        keyword: filter?.keyword !== '' ? filter?.keyword : null,
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
              page: 1,
              perPage: parseInt(data),
            })
          }}
          onChangePage={(data) => {
            setCurrentPage(data);
            getListData({
              keyword: filter?.keyword !== '' ? filter?.keyword : null,
              page: parseInt(data),
              perPage: parseInt(perPage),
            })
          }}
          onPrevPage={(data) => {
            setCurrentPage(data);
            getListData({
              keyword: filter?.keyword !== '' ? filter?.keyword : null,
              page: parseInt(data),
              perPage: parseInt(perPage),
            })
          }}
          onNextPage={(data) => {
            setCurrentPage(data);
            getListData({
              keyword: filter?.keyword !== '' ? filter?.keyword : null,
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
        show={alertListError?.show}
        type="danger"
        title="Get List"
        message={alertListError?.message}
        showCancelButton={false}
        onConfirm={() => {
          setAlertListError({show: false, message: ''});
          dispatch(defaultBlockDomainList());
        }}
      />

      <Alert
        show={showDeleteAlert}
        type="delete"
        title="Delete"
        message={`<span>Will you delete</span>&nbsp;<span class="font-bold">${selectData?.name}</span>&nbsp;<span>email domain</span>?`}
        showCancelButton={true}
        onCancel={() => {
          setSelectData({})
          setShowDeleteAlert(false);
        }}
        onConfirm={() => dispatch(removeBlockDomain(selectData?.id))}
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
          dispatch(defaultBlockDomainRemove());
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

export default BlockDomain;
