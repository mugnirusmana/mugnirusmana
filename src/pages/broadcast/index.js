import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from "@material-tailwind/react";

import { defaultBroadcastList, getBroadcastList } from './../../redux/broadcastListSlice';
import { defaultBroadcastWhatsapp, sendToWhatsapp } from './../../redux/broadcastWhatsappSlice';
import { defaultBroadcastEmail, sendToEmail } from './../../redux/broadcastEmailSlice';
import { defaultBroadcastRemove, setBroadcastRemove } from './../../redux/broadcastRemoveSlice';

import { downloadFile } from './../../helper';

import SampleBroadcast from './../../assets/sample-file/broadcasts-import.xlsx';

import BreadCrumb from "../../components/breadcrumb";
import Button from "../../components/Button";
import DataTable from '../../components/data-table';
import SelectOption from "../../components/select-option";
import Alert from "../../components/alert";
import Modal from "../../components/modal";
import Loader from "../../components/loader";

const Broadcast = () => {
  const dispatch = useDispatch();
  const broadcastList = useSelector(({ broadcastList }) => broadcastList);
  const broadcastWhatsapp = useSelector(({ broadcastWhatsapp }) => broadcastWhatsapp);
  const broadcastEmail = useSelector(({ broadcastEmail }) => broadcastEmail);
  const broadcastRemove = useSelector(({ broadcastRemove }) => broadcastRemove);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState({
    keyword: '',
    status_whatsapp: {value: '', label: ''},
    status_email: {value: '', label: ''},
  });
  const [showModalInfo, setShowModalInfo] = useState(false);
  const [showModalRulesExcel, setShowModalRulesExcel] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    isLoading: false,
    type: '',
    title: '',
    message: '',
    showCancel: false,
    cancelLabel: '',
    onCancel: () => {},
    confirmLabel: '',
    onConfirm: () => {}
  });
  const [selectedData, setSelectedData] = useState({});
  const [currnetPage, setCurrentPage] = useState('1');
  const [perPage, setPerPage] = useState('10');
  const title = [
    {
      label: 'Name',
      titlePosition: 'left',
      customRender: (data) => {
        return <span className="whitespace-nowrap">{data?.name}</span>
      }
    },
    {
      label: 'Contact',
      titlePosition: 'left',
      customRender: (data) => {
        return <div className="flex flex-col">
          <span className='whitespace-nowrap'>Whatsapp: <b className='text-xs'>{data?.whatsapp??'-'}</b></span>
          <span className='whitespace-nowrap'>Email: <b className='text-xs'>{data?.email??'-'}</b></span>
        </div>
      }
    },
    {
      label: 'Status Whatsapp',
      customRender: (data) => {
        if(data?.whatsapp) {
          if (parseInt(data?.status_whatsapp) === 2) {
            return <div className="w-full flex items-center justify-center"><span className="text-xs bg-green-600 rounded p-1 text-white text-center whitespace-nowrap">Sent</span></div>
          } else {
            return <div className="w-full flex items-center justify-center"><span className="text-xs bg-red-600 rounded p-1 text-white text-center whitespace-nowrap">Not Sent Yet</span></div>
          }
        } else {
          return <div className="w-full flex items-center justify-center"><span className="text-xs rounded p-1 text-center whitespace-nowrap">-</span></div>;
        }
      }
    },
    {
      label: 'Status Email',
      customRender: (data) => {
        if(data?.email) {
          if (parseInt(data?.status_email) === 2) {
            return <div className="w-full flex items-center justify-center"><span className="text-xs bg-green-600 rounded p-1 text-white text-center whitespace-nowrap">Sent</span></div>
          } else {
            return <div className="w-full flex items-center justify-center"><span className="text-xs bg-red-600 rounded p-1 text-white text-center whitespace-nowrap">Not Sent Yet</span></div>
          }
        } else {
          return <div className="w-full flex items-center justify-center"><span className="text-xs rounded p-1 text-center whitespace-nowrap">-</span></div>;
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
        keyword: filter?.keyword !== '' ? filter?.keyword : '',
        status_whatsapp: filter?.status_whatsapp?.value ? parseInt(filter?.status_whatsapp?.value) : '',
        status_email: filter?.status_email?.value ? parseInt(filter?.status_email?.value) : '',
        page: parseInt(1),
        perPage: parseInt(10),
      });
    }
  }, [isLoaded]);

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage
    } = broadcastList;

    if (!isLoading && isSuccess) {
      dispatch(defaultBroadcastList());
    }

    if (!isLoading && isError) {
      setAlert({
        show: true,
        isLoading: false,
        type: 'warning',
        title: 'Get List Data',
        message: errorMessage,
        showCancel: false,
        cancelLabel: '',
        onCancel: () => {},
        confirmLabel: 'Confirm',
        onConfirm: () => {
          setAlert({
            show: false,
            isLoading: false,
            type: '',
            title: '',
            message: '',
            showCancel: false,
            cancelLabel: '',
            onCancel: () => {},
            confirmLabel: '',
            onConfirm: () => {}
          })
          dispatch(defaultBroadcastList())
        }
      })
    }
  }, [broadcastList]);

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage,
      data,
    } = broadcastWhatsapp;

    if (!isLoading && isSuccess) {
      let link = data?.link;
      setAlert({
        show: true,
        isLoading: false,
        type: 'success',
        title: 'Whatsapp',
        message: `Successfully udpate status whatsap <b>${selectedData?.name}</b>`,
        showCancel: false,
        cancelLabel: '',
        onCancel: () => {},
        confirmLabel: 'Confirm',
        onConfirm: () => {
          setAlert({
            show: false,
            isLoading: false,
            type: '',
            title: '',
            message: '',
            showCancel: false,
            cancelLabel: '',
            onCancel: () => {},
            confirmLabel: '',
            onConfirm: () => {}
          });
          getListData({
            keyword: filter?.keyword !== '' ? filter?.keyword : '',
            status_whatsapp: filter?.status_whatsapp?.value ? parseInt(filter?.status_whatsapp?.value) : '',
            status_email: filter?.status_email?.value ? parseInt(filter?.status_email?.value) : '',
            page: parseInt(1),
            perPage: parseInt(perPage),
          });
          setSelectedData({});
          dispatch(defaultBroadcastWhatsapp());
          setTimeout(() => {
            window.open(link, '_blank');
          }, 300);
        }
      })
    }

    if (!isLoading && isError) {
      setAlert({
        show: true,
        isLoading: false,
        type: 'warning',
        title: 'Whatsapp',
        message: errorMessage,
        showCancel: false,
        cancelLabel: '',
        onCancel: () => {},
        confirmLabel: 'Confirm',
        onConfirm: () => {
          setAlert({
            show: false,
            isLoading: false,
            type: '',
            title: '',
            message: '',
            showCancel: false,
            cancelLabel: '',
            onCancel: () => {},
            confirmLabel: '',
            onConfirm: () => {}
          });
          dispatch(defaultBroadcastWhatsapp());
          setSelectedData({});
        }
      })
    }

  }, [broadcastWhatsapp]);

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage
    } = broadcastEmail;

    if (!isLoading && isSuccess) {
      setAlert({
        show: true,
        isLoading: false,
        type: 'success',
        title: 'Email',
        message: `Successfully sent the invitation via email to <b>${selectedData?.name}</b>`,
        showCancel: false,
        cancelLabel: '',
        onCancel: () => {},
        confirmLabel: 'Confirm',
        onConfirm: () => {
          setAlert({
            show: false,
            isLoading: false,
            type: '',
            title: '',
            message: '',
            showCancel: false,
            cancelLabel: '',
            onCancel: () => {},
            confirmLabel: '',
            onConfirm: () => {}
          });
          getListData({
            keyword: filter?.keyword !== '' ? filter?.keyword : '',
            status_whatsapp: filter?.status_whatsapp?.value ? parseInt(filter?.status_whatsapp?.value) : '',
            status_email: filter?.status_email?.value ? parseInt(filter?.status_email?.value) : '',
            page: parseInt(1),
            perPage: parseInt(perPage),
          });
          setSelectedData({});
          dispatch(defaultBroadcastEmail());
        }
      })
    }

    if (!isLoading && isError) {
      setAlert({
        show: true,
        isLoading: false,
        type: 'warning',
        title: 'Whatsapp',
        message: errorMessage,
        showCancel: false,
        cancelLabel: '',
        onCancel: () => {},
        confirmLabel: 'Confirm',
        onConfirm: () => {
          setAlert({
            show: false,
            isLoading: false,
            type: '',
            title: '',
            message: '',
            showCancel: false,
            cancelLabel: '',
            onCancel: () => {},
            confirmLabel: '',
            onConfirm: () => {}
          });
          dispatch(defaultBroadcastEmail());
          setSelectedData({});
        }
      })
    }
  }, [broadcastEmail])

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage
    } = broadcastRemove;

    if (!isLoading && isSuccess) {
      setAlert({
        show: true,
        isLoading: false,
        type: 'success',
        title: 'Delete',
        message: `<b>${selectedData?.name}</b> user broadcast successfully deleted`,
        showCancel: false,
        cancelLabel: '',
        onCancel: () => {},
        confirmLabel: 'Confirm',
        onConfirm: () => {
          setAlert({
            show: false,
            isLoading: false,
            type: '',
            title: '',
            message: '',
            showCancel: false,
            cancelLabel: '',
            onCancel: () => {},
            confirmLabel: '',
            onConfirm: () => {}
          });
          getListData({
            keyword: filter?.keyword !== '' ? filter?.keyword : '',
            status_whatsapp: filter?.status_whatsapp?.value ? parseInt(filter?.status_whatsapp?.value) : '',
            status_email: filter?.status_email?.value ? parseInt(filter?.status_email?.value) : '',
            page: parseInt(1),
            perPage: parseInt(perPage),
          });
          setSelectedData({});
          dispatch(defaultBroadcastRemove());
        }
      })
    }

    if (!isLoading && isError) {
      setAlert({
        show: true,
        isLoading: false,
        type: 'warning',
        title: 'Delete',
        message: errorMessage,
        showCancel: false,
        cancelLabel: '',
        onCancel: () => {},
        confirmLabel: 'Confirm',
        onConfirm: () => {
          setAlert({
            show: false,
            isLoading: false,
            type: '',
            title: '',
            message: '',
            showCancel: false,
            cancelLabel: '',
            onCancel: () => {},
            confirmLabel: '',
            onConfirm: () => {}
          });
          dispatch(defaultBroadcastRemove());
          setSelectedData({});
        }
      });
    }
  }, [broadcastRemove]);

  const getListData = (params) => {
    if (!broadcastList?.isLoading) {
      let result = {
        keyword: params?.keyword ?? '',
        status_whatsapp: params?.status_whatsapp ?? '',
        status_email: params?.status_email ?? '',
        page: params?.page ?? 1,
        limit: params?.perPage ?? 10,
      }
      dispatch(getBroadcastList(result));
    }
  }

  const onReset = () => {
    let resetParams = {
      keyword: '',
      status_whatsapp: {value: '', label: ''},
      status_email: {value: '', label: ''},
    }
    setCurrentPage('1');
    setFilter({...resetParams, keyword: ''});
    getListData({
      keyword: '',
      status_whatsapp: '',
      status_email: '',
      page: parseInt(1),
      perPage: parseInt(perPage),
    });
  }

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden hide-scroll">
      <BreadCrumb
        title={'Broadcast'}
        list={[
          {title: 'Broadcast', path: '', active: true},
        ]}
      />

      <div className="w-full h-fit flex flex-col bg-white shadow-lg rounded pb-16 desktop:pb-5">
        <div className='w-full flex flex-col tablet:flex-row gap-5 px-5 pt-5'>
          <div className='w-full hidden tablet:block'></div>
          <div className='w-full tablet:w-fit'>
            <Button
              width={'w-full tablet:w-fit'}
              text={'text-xs'}
              bold={false}
              shadow={false}
              isLoading={broadcastList?.isLoading}
              disabled={false}
              type={'reset'}
              label={'Info'}
              onClick={() => setShowModalInfo(true)}
            />
          </div>
          <div className='w-full tablet:w-fit'>
            <Button
              width={'w-full tablet:w-fit'}
              text={'text-xs'}
              bold={false}
              shadow={false}
              isLoading={broadcastList?.isLoading}
              disabled={false}
              type={'reset'}
              label={'Rules Field Excel'}
              onClick={() => setShowModalRulesExcel(true)}
            />
          </div>
          <div className='w-full tablet:w-fit'>
            <Button
              width={'w-full tablet:w-fit'}
              text={'text-xs'}
              bold={false}
              shadow={false}
              isLoading={broadcastList?.isLoading}
              disabled={false}
              type={'submit'}
              label={'Download Sample Excel'}
              onClick={() => {
                downloadFile({
                  url: SampleBroadcast,
                  name: 'sample-import-broadcast-user'
                });
              }}
            />
          </div>
          <div className='w-full tablet:w-fit'>
            <Button
              width={'w-full tablet:w-fit'}
              text={'text-xs'}
              bold={false}
              shadow={false}
              isLoading={broadcastList?.isLoading}
              disabled={false}
              type={'submit'}
              label={'Bulk Add Broadcast User +'}
              onClick={() => {}}
            />
          </div>
        </div>
        <DataTable
          isLoading={broadcastList?.isLoading}
          data={broadcastList?.data?.list}
          title={title}
          perPage={perPage}
          currentPage={currnetPage}
          showInfo={true}
          withNumber={true}
          withAction={true}
          showAddAction={true}
          addLabel={'Add Broadcast User +'}
          onAdd={() => {}}
          renderAction={(data) => (
            <div className="flex flex-row items-center justify-end gap-2 text-xs">
              {data?.whatsapp ? (
                <Tooltip
                  className="rounded px-2 py-1 bg-white text-sky-900 border border-sky-900 text-xs font-bold shadow-lg"
                  content={data?.status_whatsapp === 2 ? "Resend invitation to Whatsapp" : "Send invitation to Whatsapp"}
                  placement="top"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <span
                    className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-green-600 text-white border border-green-600"
                    onClick={() => {
                      let status = data?.status_whatsapp === 2 ? "resend" : "send"
                      setSelectedData(data);
                      setAlert({
                        show: true,
                        isLoading: false,
                        type: 'question',
                        title: `Whatsapp`,
                        message: `Will you ${status} the invitation via whatsapp to <b>${data?.name}</b>?`,
                        showCancel: true,
                        cancelLabel: 'Cancel',
                        onCancel: () => {
                          setAlert({
                            show: false,
                            isLoading: false,
                            type: '',
                            title: '',
                            message: '',
                            showCancel: false,
                            cancelLabel: '',
                            onCancel: () => {},
                            confirmLabel: '',
                            onConfirm: () => {}
                          });
                          setSelectedData({});
                        },
                        confirmLabel: 'Yes',
                        onConfirm: () => {
                          setAlert({
                            show: false,
                            isLoading: false,
                            type: '',
                            title: '',
                            message: '',
                            showCancel: false,
                            cancelLabel: '',
                            onCancel: () => {},
                            confirmLabel: '',
                            onConfirm: () => {}
                          });
                          dispatch(sendToWhatsapp(data?.id));
                        }
                      })
                    }}
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                  </span>
                </Tooltip>
              ) : null}

              {data?.email ? (
                <Tooltip
                  className="rounded px-2 py-1 bg-white text-sky-900 border border-sky-900 text-xs font-bold shadow-lg"
                  content={data?.status_email === 2 ? "Resend invitation to Email" : "Send invitation to Email"}
                  placement="top"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <span
                    className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-transparent text-sky-900 border border-sky-900"
                    onClick={() => {
                      let status = data?.status_email === 2 ? "resend" : "send"
                      setSelectedData(data);
                      setAlert({
                        show: true,
                        isLoading: false,
                        type: 'question',
                        title: `Email`,
                        message: `Will you ${status} the invitation via email to <b>${data?.name}</b>?`,
                        showCancel: true,
                        cancelLabel: 'Cancel',
                        onCancel: () => {
                          setAlert({
                            show: false,
                            isLoading: false,
                            type: '',
                            title: '',
                            message: '',
                            showCancel: false,
                            cancelLabel: '',
                            onCancel: () => {},
                            confirmLabel: '',
                            onConfirm: () => {}
                          });
                          setSelectedData({});
                        },
                        confirmLabel: 'Yes',
                        onConfirm: () => {
                          setAlert({
                            show: false,
                            isLoading: false,
                            type: '',
                            title: '',
                            message: '',
                            showCancel: false,
                            cancelLabel: '',
                            onCancel: () => {},
                            confirmLabel: '',
                            onConfirm: () => {}
                          });
                          dispatch(sendToEmail(data?.id));
                        }
                      })
                    }}
                  >
                    <i className="fa-regular fa-envelope"></i>
                  </span>
                </Tooltip>
              ) : null}

              <Tooltip
                className="rounded px-2 py-1 bg-white text-sky-900 border border-sky-900 text-xs font-bold shadow-lg"
                content={"Open Detail"}
                placement="top"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                <span
                  className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-blue-600 text-white border border-blue-600"
                  onClick={() => {}}
                >
                  <i className="fa-solid fa-eye"></i>
                </span>
              </Tooltip>

              <Tooltip
                className="rounded px-2 py-1 bg-white text-sky-900 border border-sky-900 text-xs font-bold shadow-lg"
                content={"Edit"}
                placement="top"
                animate={{
                  mount: { scale: 1, y: 0 },
                  unmount: { scale: 0, y: 25 },
                }}
              >
                <span
                  className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-orange-600 text-white border border-orange-600"
                  onClick={() => {}}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </span>
              </Tooltip>

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
                  className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-red-600 text-white border border-red-600"
                  onClick={() => {
                    setSelectedData(data);
                    setAlert({
                      show: true,
                      isLoading: false,
                      type: 'question',
                      title: `Delete`,
                      message: `Will you delete <b>${data?.name}</b> user broadcast?`,
                      showCancel: true,
                      cancelLabel: 'Cancel',
                      onCancel: () => {
                        setAlert({
                          show: false,
                          isLoading: false,
                          type: '',
                          title: '',
                          message: '',
                          showCancel: false,
                          cancelLabel: '',
                          onCancel: () => {},
                          confirmLabel: '',
                          onConfirm: () => {}
                        });
                        setSelectedData({});
                      },
                      confirmLabel: 'Yes',
                      onConfirm: () => {
                        setAlert({
                          show: false,
                          isLoading: false,
                          type: '',
                          title: '',
                          message: '',
                          showCancel: false,
                          cancelLabel: '',
                          onCancel: () => {},
                          confirmLabel: '',
                          onConfirm: () => {}
                        });
                        dispatch(setBroadcastRemove(data?.id));
                      }
                    })
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
                    placeholder="Search by name, whatsapp or email"
                    value={filter?.keyword}
                    onChange={(e) => setFilter({...filter, keyword: e?.currentTarget?.value})}
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-xs">Status Whatsapp</span>
                  <SelectOption
                    isLoading={false}
                    options={[{label: 'Not Sent Yet', value: '1'}, {label: 'Sent', value: '2'}, {label: '-', value: '3'}]}
                    objectLabel={'label'}
                    objectUniq={'value'}
                    value={filter?.status_whatsapp}
                    showClear={true}
                    onClear={(data) => setFilter({...filter, status_whatsapp: data})}
                    showSearch={false}
                    onChange={(data) => setFilter({...filter, status_whatsapp: data})}
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-xs">Status Email</span>
                  <SelectOption
                    isLoading={false}
                    options={[{label: 'Not Sent Yet', value: '1'}, {label: 'Sent', value: '2'}, {label: '-', value: '3'}]}
                    objectLabel={'label'}
                    objectUniq={'value'}
                    value={filter?.status_email}
                    showClear={true}
                    onClear={(data) => setFilter({...filter, status_email: data})}
                    showSearch={false}
                    onChange={(data) => setFilter({...filter, status_email: data})}
                  />
                </div>
                <div className="w-full tablet:w-fit flex flex-col gap-1">
                  <span className="text-xs hidden tablet:block">&nbsp;</span>
                  <div
                    className="cursor-pointer w-full tablet:w-fit h-full flex items-center justify-center text-white border border-sky-900 bg-sky-900 rounded px-4"
                    onClick={() => {
                      setCurrentPage('1');
                      getListData({
                        keyword: filter?.keyword !== '' ? filter?.keyword : '',
                        status_whatsapp: filter?.status_whatsapp?.value ? parseInt(filter?.status_whatsapp?.value) : '',
                        status_email: filter?.status_email?.value ? parseInt(filter?.status_email?.value) : '',
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
              keyword: filter?.keyword !== '' ? filter?.keyword : '',
              page: 1,
              perPage: parseInt(data),
            })
          }}
          onChangePage={(data) => {
            setCurrentPage(data);
            getListData({
              keyword: filter?.keyword !== '' ? filter?.keyword : '',
              page: parseInt(data),
              perPage: parseInt(perPage),
            })
          }}
          onPrevPage={(data) => {
            setCurrentPage(data);
            getListData({
              keyword: filter?.keyword !== '' ? filter?.keyword : '',
              page: parseInt(data),
              perPage: parseInt(perPage),
            })
          }}
          onNextPage={(data) => {
            setCurrentPage(data);
            getListData({
              keyword: filter?.keyword !== '' ? filter?.keyword : '',
              page: parseInt(data),
              perPage: parseInt(perPage),
            })
          }}
        />
      </div>

      <Alert
        show={alert?.show}
        isLoading={alert?.isLoading}
        type={alert?.type}
        title={alert?.title}
        message={alert?.message}
        showCancelButton={alert?.showCancel}
        cancelLabel={alert?.cancelLabel}
        onCancel={() => alert?.onCancel ? alert?.onCancel() : {}}
        confirmLabel={alert?.confirmLabel}
        onConfirm={() => alert?.onConfirm ? alert?.onConfirm() : {}}
      />

      <Modal
        show={showModalInfo}
        renderContent={() => {
          return (
            <div className="w-full h-full flex flex-col">
              <span className="text-center font-bold mb-5">Info</span>
              <span className="text-xs mb-2 font-bold">1. Send / Resend to Whatsapp</span>
              <div className='w-full flex flex-col border-l-2 border-l-sky-900 ml-4 pl-2 text-xs mb-3'>
                <span>• Need to login to whatsapp web first (<span className='cursor-pointer text-sky-400 font-bold' onClick={() => window.open('https://web.whatsapp.com', '_blank')}>https://web.whatsapp.com</span>).</span>
                <span>• More info to login web whatsapp <span className='cursor-pointer text-sky-400 font-bold' onClick={() => window.open('https://faq.whatsapp.com/1317564962315842/?cms_platform=web&lang=id', '_blank')}>here</span>.</span>
              </div>
            </div>
          )
        }}
        onClose={() => setShowModalInfo(false)}
        isLoading={false}
      />

      <Modal
        show={showModalRulesExcel}
        renderContent={() => {
          return (
            <div className="w-full h-full flex flex-col">
              <span className="text-center font-bold mb-5">Rules Field Excel</span>
              <span className="text-xs mb-2 font-bold">1. Name</span>
              <div className='w-full flex flex-col border-l-2 border-l-sky-900 ml-4 pl-2 text-xs mb-3'>
                <span>• Field is required</span>
                <span>• Only alphabet and space</span>
              </div>
              <span className="text-xs mb-2 font-bold">2. Whatsapp</span>
              <div className='w-full flex flex-col border-l-2 border-l-sky-900 ml-4 pl-2 text-xs mb-3'>
                <span>• Field is optional</span>
                <span>• If filled:</span>
                <span className='pl-2'>• must be containt country code, like +62</span>
                <span className='pl-2'>• valid format whatsahpp number</span>
                <span className='pl-2'>• min 6 digits</span>
                <span className='pl-2'>• max 15 digits</span>
                <span className='pl-2'>• unique whatsapp number (cannot input same number with other whatsapp)</span>
              </div>
              <span className="text-xs mb-2 font-bold">4. Email</span>
              <div className='w-full flex flex-col border-l-2 border-l-sky-900 ml-4 pl-2 text-xs mb-3'>
                <span>• Field is optional</span>
                <span>• If filled:</span>
                <span className='pl-2'>• must be valid format email</span>
                <span className='pl-2'>• max 50 digits</span>
                <span className='pl-2'>• unique email (cannot input same number with other email)</span>
              </div>
            </div>
          )
        }}
        onClose={() => setShowModalRulesExcel(false)}
        isLoading={false}
      />

      <Loader show={broadcastWhatsapp?.isLoading || broadcastEmail?.isLoading || broadcastRemove?.isLoading} />
    </div>
  )
}

export default Broadcast;
