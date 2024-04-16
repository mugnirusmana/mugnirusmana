import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import _ from 'lodash';

import { defaultBroadcastDetail, getBroadcastDetail } from './../../redux/broadcastDetailSlice';
import { defaultBroadcastEdit, submitBroadcastEdit } from './../../redux/broadcastEditSlice';

import BreadCrumb from "../../components/breadcrumb";
import Button from "../../components/Button";
import Alert from "../../components/alert";
import Loader from "../../components/loader";

const BroadcastEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = _.last(location?.pathname?.split('/'));
  const [firstLoaded, setFirstLoaded] = useState(false);
  const broadcastDetail = useSelector(({ broadcastDetail }) => broadcastDetail);
  const broadcastEdit = useSelector(({ broadcastEdit }) => broadcastEdit);
  const [alert, setAlert] = useState({
    show: false,
    type: '',
    title: '',
    message: '',
    showCancel: false,
    cancelLabel: null,
    onCancel: () => {},
    confirmLabel: null,
    onConfirm: () => {},
  })
  const [field, setField] = useState({
    name: {
      value: '',
      isError: false,
      errorMessage: '',
    },
    whatsapp: {
      value: '',
      isError: false,
      errorMessage: '',
    },
    email: {
      value: '',
      isError: false,
      errorMessage: '',
    },
  });

  useEffect(() => {
    setFirstLoaded(true);
  }, []);

  useEffect(() => {
    if (firstLoaded) {
      dispatch(getBroadcastDetail(id));
      setFirstLoaded(false);
    }
  }, [firstLoaded]);

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage,
      data
    } = broadcastDetail;

    if (!isLoading && isSuccess) {
      setField({
        ...field,
        name: {
          ...field.name,
          value: data?.name,
        },
        whatsapp: {
          ...field.whatsapp,
          value: data?.whatsapp,
        },
        email: {
          ...field.email,
          value: data?.email,
        }
      })
      dispatch(defaultBroadcastDetail());
    }

    if (!isLoading && isError) {
      setAlert({
        show: true,
        type: 'warning',
        title: 'Get Detail',
        message: errorMessage,
        showCancel: false,
        cancelLabel: null,
        onCancel: () => {},
        confirmLabel: null,
        onConfirm: () => {
          setAlert({
            show: false,
            type: '',
            title: '',
            message: '',
            showCancel: false,
            cancelLabel: null,
            onCancel: () => {},
            confirmLabel: null,
            onConfirm: () => {},
          });
          dispatch(defaultBroadcastDetail());
          navigate('/broadcast');
        },
      });
    }
  }, [broadcastDetail]);

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage,
      data
    } = broadcastEdit;

    if(!isLoading && isSuccess) {
      setAlert({
        show: true,
        type: 'success',
        title: 'Submit Form',
        message: 'Data successfully edited',
        showCancel: false,
        cancelLabel: null,
        onCancel: () => {},
        confirmLabel: null,
        onConfirm: () => {
          setAlert({
            show: false,
            type: '',
            title: '',
            message: '',
            showCancel: false,
            cancelLabel: null,
            onCancel: () => {},
            confirmLabel: null,
            onConfirm: () => {},
          });
          dispatch(defaultBroadcastEdit());
          navigate('/broadcast');
        },
      });
    }

    if(!isLoading && isError) {
      let message = errorMessage;
      if (data?.errors && data?.errors?.length > 0) {
        let sparator = data?.errors?.length > 1 ? '- ' : '';
        message = `<div class="font-bold text-xs">Someting wrong with your data:`;
        data?.errors?.map((item, index) => {
          if (index === data?.errors?.length-1) {
            message = message + `<br /><span class="font-normal">${sparator}${item?.message}</span></div>`;
          } else {
            message = message + `<br /><span class="font-normal">${sparator}${item?.message}</span>`;
          }
          return item;
        });
      }
      setAlert({
        show: true,
        type: 'warning',
        title: 'Submit Form',
        message: message,
        showCancel: false,
        cancelLabel: null,
        onCancel: () => {},
        confirmLabel: null,
        onConfirm: () => {
          setAlert({
            show: false,
            type: '',
            title: '',
            message: '',
            showCancel: false,
            cancelLabel: null,
            onCancel: () => {},
            confirmLabel: null,
            onConfirm: () => {},
          });
          dispatch(defaultBroadcastEdit());
        },
      });
    }
  }, [broadcastEdit]);

  const validateName = (value) => {
    let result = {
      isError: false,
      errorMessage: ''
    }
    let name = "Name";
    let regex = /^[A-Za-z\s]*$/;

    if (!value) {
      result.isError = true;
      result.errorMessage = `${name} is required`;
    } else if (value?.length > 50) {
      result.isError = true;
      result.errorMessage = `${name} max 50 character`;
    } else if (!regex?.test(value)) {
      result.isError = true;
      result.errorMessage = `${name} format is invalid, only aplhabet and space`;
    }

    return result;
  }

  const validateWhatsapp = (value) => {
    let result = {
      isError: false,
      errorMessage: '',
    }
    let name = 'Whatsapp';
    let regex = /^[+]{1}(?:[0-9]?){6,15}[0-9]{1}$/;

    if(value) {
      if (value?.length < 6) {
        result.isError = true;
        result.errorMessage = `${name} minimum 6 character`;
      } else if (value?.length > 15) {
        result.isError = true;
        result.errorMessage = `${name} maximum 15 character`;
      } else if (!regex.test(value)) {
        result.isError = true;
        result.errorMessage = `${name} format is invalid, make sure to use country code like +62, min 6 char and max 15 char`;
      }
    }

    return result;
  }

  const validateEmail = (value) => {
    let result = {
      isError: false,
      errorMessage: '',
    }
    let name = 'Email';
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(value) {
      if(value?.length > 50) {
        result.isError = true;
        result.errorMessage = `${name} max 50 character`;
      } else if (!emailRegex.test(value)) {
        result.isError = true;
        result.errorMessage = `${name} format is invalid`;
      }
    }

    return result;
  }

  const onReset = () => {
    setField({
      ...field,
      name: {
        ...field.name,
        value: broadcastDetail?.data?.name,
        isError: false,
        errorMessage: '',
      },
      whatsapp: {
        ...field.whatsapp,
        value: broadcastDetail?.data?.whatsapp,
        isError: false,
        errorMessage: '',
      },
      email: {
        ...field.email,
        value: broadcastDetail?.data?.email,
        isError: false,
        errorMessage: '',
      }
    })
  }

  const onSubmit = () => {
    let resultName = validateName(field?.name?.value);
    let resultWhatsapp = validateWhatsapp(field?.whatsapp?.value);
    let resultEmail = validateEmail(field?.email?.value);
    let errorContact = false;
    if(!field?.whatsapp?.value && !field?.email?.value) errorContact = true;

    if(!resultName?.isError && !resultWhatsapp?.isError && !resultEmail?.isError && !errorContact) {
      setAlert({
        show: true,
        type: 'question',
        title: 'Submit Form',
        message: 'Are you sure about the data you are going to submit?',
        showCancel: true,
        cancelLabel: null,
        onCancel: () => {
          setAlert({
            show: false,
            type: '',
            title: '',
            message: '',
            showCancel: false,
            cancelLabel: null,
            onCancel: () => {},
            confirmLabel: null,
            onConfirm: () => {},
          });
        },
        confirmLabel: null,
        onConfirm: () => {
          setAlert({
            show: false,
            type: '',
            title: '',
            message: '',
            showCancel: false,
            cancelLabel: null,
            onCancel: () => {},
            confirmLabel: null,
            onConfirm: () => {},
          });
          let params = {
            name: field?.name?.value,
            whatsapp: field?.whatsapp?.value,
            email: field?.email?.value,
          }
          dispatch(submitBroadcastEdit(id, params));
        },
      })
    } else {
      if (errorContact) {
        setField({
          ...field,
          name: {
            ...field.name,
            isError: resultName?.isError,
            errorMessage: resultName?.errorMessage,
          },
          whatsapp: {
            ...field.whatsapp,
            isError: true,
            errorMessage: 'Whatsapp and email cannot null at the sametime',
          },
          email: {
            ...field.email,
            isError: true,
            errorMessage: 'Whatsapp and email cannot null at the sametime',
          }
        });
      } else {
        setField({
          ...field,
          name: {
            ...field.name,
            isError: resultName?.isError,
            errorMessage: resultName?.errorMessage,
          },
          whatsapp: {
            ...field.whatsapp,
            isError: resultWhatsapp?.isError,
            errorMessage: resultWhatsapp?.errorMessage,
          },
          email: {
            ...field.email,
            isError: resultEmail?.isError,
            errorMessage: resultEmail?.errorMessage,
          }
        });
      }
    }
  }

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden hide-scroll">
      <BreadCrumb
        title={'Edit Broadcast'}
        list={[
          {title: 'Broadcast', path: '/broadcast', active: false},
          {title: '/', path: '', active: true},
          {title: `Edit (${id})`, path: '', active: true},
        ]}
      />

      <div className="w-full h-fit flex flex-col bg-white shadow-lg rounded pb-16 p-5 desktop:pb-5">
        <div className="w-full flex flex-col gap-5 mb-5">
          <div className="w-full flex flex-col">
            <span>Name</span>
            <input
              type={'text'}
              className="w-full bg-white outline-none border border-sky-900 rounded px-2"
              placeholder="Name"
              value={field?.name?.value}
              onChange={(e) => {
                let { value } = e.target;
                let result = validateName(value)
                setField({
                  ...field,
                  name: {
                    ...field.name,
                    value: value,
                    isError: result?.isError,
                    errorMessage: result?.errorMessage
                  }
                })
              }}
            />
            <span className="text-xs text-red-500">{field?.name?.errorMessage}</span>
          </div>

          <div className="w-full flex flex-col">
            <span>Whatsapp Number</span>
            <input
              type={'text'}
              className="w-full bg-white outline-none border border-sky-900 rounded px-2"
              placeholder="Name"
              value={field?.whatsapp?.value}
              onChange={(e) => {
                let { value } = e.target;
                let result = validateWhatsapp(value);
                let resultEmail = validateEmail(field?.email?.value);
                setField({
                  ...field,
                  whatsapp: {
                    ...field.whatsapp,
                    value: value,
                    isError: result?.isError,
                    errorMessage: result?.errorMessage
                  },
                  email: {
                    ...field.email,
                    isError: resultEmail?.isError,
                    errorMessage: resultEmail?.errorMessage
                  }
                })
              }}
            />
            <span className="text-xs text-red-500">{field?.whatsapp?.errorMessage}</span>
          </div>

          <div className="w-full flex flex-col">
            <span>Email</span>
            <input
              type={'text'}
              className="w-full bg-white outline-none border border-sky-900 rounded px-2"
              placeholder="Email"
              value={field?.email?.value}
              onChange={(e) => {
                let { value } = e.target;
                let resultWhatsapp = validateWhatsapp(field?.whatsapp?.value);
                let result = validateEmail(value);
                setField({
                  ...field,
                  whatsapp: {
                    ...field.whatsapp,
                    isError: resultWhatsapp?.isError,
                    errorMessage: resultWhatsapp?.errorMessage
                  },
                  email: {
                    ...field.email,
                    value: value,
                    isError: result?.isError,
                    errorMessage: result?.errorMessage
                  }
                })
              }}
            />
            <span className="text-xs text-red-500">{field?.email?.errorMessage}</span>
          </div>

          <div className="w-full flex flex-col tablet:flex-row gap-5">
            <Button
              width={'w-full'}
              shadow={false}
              isLoading={false}
              type={'reset'}
              label={'Reset'}
              onClick={() => onReset()}
            />

            <Button
              width={'w-full'}
              shadow={true}
              isLoading={false}
              type={'submit'}
              label={'Save'}
              onClick={() => onSubmit()}
            />
          </div>
        </div>

      </div>

      <Alert
        isLoading={false}
        show={alert?.show}
        type={alert?.type}
        title={alert?.title}
        message={alert?.message}
        showCancelButton={alert?.showCancel}
        cancelLabel={alert?.cancelLabel}
        onCancel={() => alert?.onCancel ? alert?.onCancel() : {}}
        confirmLabel={alert?.confirmLabel}
        onConfirm={() => alert?.onConfirm ? alert?.onConfirm() : {}}
      />

      <Loader show={broadcastDetail?.isLoading || broadcastEdit?.isLoading} />
    </div>
  )
}

export default BroadcastEdit;