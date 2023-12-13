import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip } from "@material-tailwind/react";

import { defaultBroadcastList, getBroadcastList } from './../../redux/broadcastListSlice';

import { downloadFile } from './../../helper';

import SampleBroadcast from './../../assets/sample-file/sample-import-broadcast-user.xlsx';

import BreadCrumb from "../../components/breadcrumb";
import Button from "../../components/Button";
import DataTable from '../../components/data-table';
import SelectOption from "../../components/select-option";
import Alert from "../../components/alert";
import Modal from "../../components/modal";

const Broadcast = () => {
  const dispatch = useDispatch();
  const broadcastList = useSelector(({ broadcastList }) => broadcastList);
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState({
    keyword: '',
    status_whatsapp: {value: '', label: ''},
    status_telegram: {value: '', label: ''},
    status_email: {value: '', label: ''},
  });
  const [showModal, setShowModal] = useState(false);
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
          <span className='whitespace-nowrap'>Telegram: <b className='text-xs'>{data?.telegram??'-'}</b></span>
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
      label: 'Status Telegram',
      customRender: (data) => {
        if(data?.telegram) {
          if (parseInt(data?.status_telegram) === 2) {
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
        keyword: filter?.keyword !== '' ? filter?.keyword : null,
        status_whatsapp: filter?.status_whatsapp?.value ? parseInt(filter?.status_whatsapp?.value) : null,
        status_telegram: filter?.status_telegram?.value ? parseInt(filter?.status_telegram?.value) : null,
        status_email: filter?.status_email?.value ? parseInt(filter?.status_email?.value) : null,
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
  }, [broadcastList])

  const getListData = (params) => {
    if (!broadcastList?.isLoading) {
      let result = {
        keyword: params?.keyword ?? '',
        status_whatsapp: params?.status_whatsapp ?? null,
        status_telegram: params?.status_telegram ?? null,
        status_email: params?.status_email ?? null,
        page: params?.page ?? 1,
        limit: params?.perPage ?? 10,
      }
      dispatch(getBroadcastList(result));
    }
  }

  const onReset = () => {
    let resetParams = {
      keyword: null,
      status_whatsapp: {value: '', label: ''},
      status_telegram: {value: '', label: ''},
      status_email: {value: '', label: ''},
    }
    setCurrentPage('1');
    setFilter({...resetParams, keyword: ''});
    getListData({
      keyword: null,
      status_whatsapp: null,
      status_telegram: null,
      status_email: null,
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
              label={'Rules Field Excel'}
              onClick={() => setShowModal(true)}
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
                  onClick={() => {}}
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
                    placeholder="Search by name, whatsapp, telegram or email"
                    value={filter?.keyword}
                    onChange={(e) => setFilter({...filter, keyword: e?.currentTarget?.value})}
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-xs">Status Whatsapp</span>
                  <SelectOption
                    isLoading={false}
                    options={[{label: 'Not Sent Yet', value: '1'}, {label: 'Sent', value: '2'}]}
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
                  <span className="text-xs">Status Telegram</span>
                  <SelectOption
                    isLoading={false}
                    options={[{label: 'Not Sent Yet', value: '1'}, {label: 'Sent', value: '2'}]}
                    objectLabel={'label'}
                    objectUniq={'value'}
                    value={filter?.status_telegram}
                    showClear={true}
                    onClear={(data) => setFilter({...filter, status_telegram: data})}
                    showSearch={false}
                    onChange={(data) => setFilter({...filter, status_telegram: data})}
                  />
                </div>
                <div className="w-full flex flex-col gap-1">
                  <span className="text-xs">Status Email</span>
                  <SelectOption
                    isLoading={false}
                    options={[{label: 'Not Sent Yet', value: '1'}, {label: 'Sent', value: '2'}]}
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
                        keyword: filter?.keyword !== '' ? filter?.keyword : null,
                        status_whatsapp: filter?.status_whatsapp?.value ? parseInt(filter?.status_whatsapp?.value) : null,
                        status_telegram: filter?.status_telegram?.value ? parseInt(filter?.status_telegram?.value) : null,
                        status_email: filter?.status_email?.value ? parseInt(filter?.status_email?.value) : null,
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
        show={alert?.show}
        isLoading={alert?.isLoading}
        type={alert?.type}
        title={alert?.title}
        message={alert?.message}
        showCancelButton={alert?.showCancel}
        cancelLabel={alert?.cancelLabel}
        onCancel={() => alert?.onCancel ? alert?.onCancel() : {}}
        confirmLabel={alert?.confirmLabel}
        onConfirm={() => alert?.onConfirm ? alert?.onConfirm : {}}
      />

      <Modal
        show={showModal}
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
              <span className="text-xs mb-2 font-bold">3. Telegram</span>
              <div className='w-full flex flex-col border-l-2 border-l-sky-900 ml-4 pl-2 text-xs mb-3'>
                <span>• Field is optional</span>
                <span>• If filled:</span>
                <span className='pl-2'>• must be containt country code, like +62</span>
                <span className='pl-2'>• must be valid format telegram number</span>
                <span className='pl-2'>• min 6 digits</span>
                <span className='pl-2'>• max 15 digits</span>
                <span className='pl-2'>• unique telegram number (cannot input same number with other telegram)</span>
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
        onClose={() => setShowModal(false)}
        isLoading={false}
      />
    </div>
  )
}

export default Broadcast;
