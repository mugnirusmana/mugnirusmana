import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Tooltip } from "@material-tailwind/react";

import { defaultBlockDomainList, getBlockDomainList } from "../../redux/blockDomainListSlice";
import { defaultBlockDomainRemove, removeBlockDomain } from "../../redux/blockDomainRemoveSlice";
import { defaultBlockDomainCreate, createBlockDomain } from "../../redux/blockDomainCreateSlice";

import { decodeParams } from './../../helper';

import BreadCrumb from "../../components/breadcrumb";
import DataTable from '../../components/data-table';
import Alert from "../../components/alert";
import Modal from "../../components/modal";

const BlockDomain = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const blockDomainList = useSelector(({ blockDomainList }) => blockDomainList);
  const blockDomainRemove = useSelector(({ blockDomainRemove }) => blockDomainRemove);
  const blockDomainCreate = useSelector(({ blockDomainCreate }) => blockDomainCreate);
  const [isLoaded, setIsLoaded] = useState(false);
  const [alertListError, setAlertListError] = useState({show: false, message: ''});
  const [alertRemove, setAlertRemove] = useState({show: false, type: '', message: ''})
  const [alertCreate, setAlertCreate] = useState({show: false, type: '', message: ''})
  const [filter, setFilter] = useState({
    keyword: decodeParams(location?.search)?.keyword ?? '',
  })
  const [currnetPage, setCurrentPage] = useState('1');
  const [perPage, setPerPage] = useState('10');
  const [selectData, setSelectData] = useState({})
  const [showSuccessdAlert, setShowSuccessdAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showModalAddData, setShowModalAddData] = useState(false);
  const [dataAddEmailDomain, setDataAddEmailDomain] = useState({
    value: '',
    errorMessage: '&nbsp;'
  });
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

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      data
    } = blockDomainCreate;

    if (!isLoading && isSuccess) {
      setShowModalAddData(false);
      setAlertCreate({show: true, type: 'success', message: `<span class="font-bold">${dataAddEmailDomain?.value}</span>&nbsp;successfully&nbsp;<span class="font-bold">Created</span>`})
    }

    if (!isLoading && isError) {
      setDataAddEmailDomain({
        ...dataAddEmailDomain,
        errorMessage: `<span>${data?.error?.name}</span>`
      });
    }

  }, [blockDomainCreate]);

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

  const validateAddEmailDomain = (value) => {
    let result = {
      isError: false,
      errorMessage: '&nbsp;',
    }
    if (!value || value === "") {
     result.isError = true;
     result.errorMessage = "Name is required";
    } else if (value?.length > 50) {
      result.isError = true;
      result.errorMessage = "Name max 50 characters";
    }
    return result;
  }

  const submitAddEmailDomain = () => {
    let result = validateAddEmailDomain(dataAddEmailDomain?.value);
    if(result?.isError) {
      setDataAddEmailDomain({
        ...dataAddEmailDomain,
        errorMessage: result.errorMessage,
      });
    } else {
      let params = {
        name: dataAddEmailDomain?.value,
      }
      dispatch(createBlockDomain(params));
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
          onAdd={() => setShowModalAddData(true)}
          renderAction={(data) => (
            <div className="flex flex-row items-center justify-end gap-2">
              <Tooltip
                className="rounded px-2 py-1 bg-white text-sky-900 border border-sky-900 text-xs font-bold shadow-lg"
                content={"Delete"}
                placement="top"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                <span
                  className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-red-600 text-white"
                  onClick={() => {
                    setSelectData(data);
                    setShowDeleteAlert(true);
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </span>
              </Tooltip>
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
                <div className="w-full tablet:w-fit flex flex-col gap-1" onClick={() => onReset()}>
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
            page: 1,
            perPage: parseInt(perPage)
          })
        }}
      />

      <Alert
        show={alertCreate?.show}
        type={alertCreate?.type}
        title="Add Email Domain"
        message={alertCreate.message}
        showCancelButton={false}
        onConfirm={() => {
          setAlertCreate({
            show:false,
            type: '',
            message: ''
          })
          setDataAddEmailDomain({value: '', errorMessage: '&nbsp;'});
          dispatch(defaultBlockDomainCreate());
          getListData({
            keyword: filter?.keyword !== '' ? filter?.keyword : null,
            page: 1,
            perPage: parseInt(perPage)
          })
        }}
      />

      <Modal
        show={showModalAddData}
        onClose={() => {
          setShowModalAddData(false)
          setDataAddEmailDomain({
            value: '',
            errorMessage: '&nbsp;',
          })
        }}
        isLoading={blockDomainCreate?.isLoading}
        renderContent={() => {
          return (
            <div className="w-full h-fit flex flex-col">
              <span className="text-center font-bold mb-5">Add Email Domain</span>
              <span className="text-xs mb-2">Name</span>
              <input
                type={'text'}
                className="w-full px-2 rounded h-[30px] text outline-none border border-sky-900 text-xs"
                placeholder="Fill email domain here"
                value={dataAddEmailDomain?.value}
                onChange={(e) => {
                  let value = e?.target?.value?.toLocaleLowerCase();
                  setDataAddEmailDomain({
                    value: value,
                    errorMessage: validateAddEmailDomain(value)?.errorMessage,
                  })
                  dispatch(defaultBlockDomainCreate());
                }}
              />
              <span className="text-xs text-red-500 mb-10" dangerouslySetInnerHTML={{__html: dataAddEmailDomain.errorMessage}}></span>
              <div className="w-full flex items-center justify-center gap-5">
                <div
                  className={`p-2 ${blockDomainCreate?.isLoading ? 'cursor-default' : 'cursor-pointer'} w-full flex items-center justify-center rounded border border-sky-900 text-sky-900 bg-white`}
                  onClick={() => {
                    if (!blockDomainCreate?.isLoading) {
                      setDataAddEmailDomain({
                        value: '',
                        errorMessage: '&nbsp;',
                      });
                      dispatch(defaultBlockDomainCreate());
                    }
                  }}
                >{blockDomainCreate?.isLoading ? 'Loading...' : 'Reset'}</div>
                <div
                  className={`p-2 ${blockDomainCreate?.isLoading ? 'cursor-default' : 'cursor-pointer'} w-full flex items-center justify-center rounded border border-sky-900 text-white bg-sky-900`}
                  onClick={() => {
                    if (!blockDomainCreate?.isLoading) submitAddEmailDomain();
                  }}
                >{blockDomainCreate?.isLoading ? 'Loading...' : 'Submit'}</div>
              </div>
            </div>
          )
        }}
      />
    </div>
  );
};

export default BlockDomain;
