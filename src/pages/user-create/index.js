import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BreadCrumb from "../../components/breadcrumb";
import Button from "../../components/Button";
import Alert from "../../components/alert";
import Loader from "../../components/loader";

import { defaultUserCreate, submitUserCreate } from './../../redux/userCreateSlice';

const UserCreate = () => {
  const dispatch = useDispatch();
  const userCreate = useSelector(({ userCreate }) => userCreate)
  const [alertError, setAlertError] = useState({
    show: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });
  const [alertSuccess, setAlertSuccess] = useState({
    show: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });
  const [alertConfirm, setAlertConfirm] = useState({
    show: false,
    title: '',
    message: '',
    onCancel: () => {},
    onConfirm: () => {}
  });
  const [field, setField] = useState({
    name: {
      value: '',
      isError: false,
      errorMessage: '',
    },
    email: {
      value: '',
      isError: false,
      errorMessage: '',
    },
    phone: {
      value: '',
      isError: false,
      errorMessage: '',
    },
  });

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage,
      data,
    } = userCreate;

    if (!isLoading && isSuccess) {
      setAlertSuccess({
        show: true,
        title: 'Save Data',
        message: 'Successfully save the data',
        onConfirm: () => {
          setAlertSuccess({
            show: false,
            title: '',
            message: '',
            onConfirm: () => {}
          })
          dispatch(defaultUserCreate());
          onReset();
        }
      })
    }

    if (!isLoading && isError) {
      let message = errorMessage;
      if (data?.errors && data?.errors?.length > 0) {
        message = `<div>Someting wrong with your data:`;
        data?.errors?.map((item, index) => {
          if (index === data?.errors?.length-1) {
            message = message + `<br /><span class="font-bold text-xs">${item?.message}</span></div>`;
          } else {
            message = message + `<br /><span class="font-bold text-xs">${item?.message}</span>`;
          }
          return item;
        });
      }
      setAlertError({
        show: true,
        title: 'Save Data',
        message: message,
        onConfirm: () => {
          setAlertError({
            show: false,
            title: '',
            message: '',
            onConfirm: () => {}
          })
          dispatch(defaultUserCreate());
        }
      })
    }
  }, [userCreate]);

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

  const validateEmail = (value) => {
    let result = {
      isError: false,
      errorMessage: ''
    }
    let name = "Email";
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!value) {
      result.isError = true;
      result.errorMessage = `${name} is required`;
    } else if (value?.length > 50) {
      result.isError = true;
      result.errorMessage = `${name} max 50 character`;
    } else if (!regex?.test(value)) {
      result.isError = true;
      result.errorMessage = `${name} format is invalid`;
    }

    return result
  }

  const validatePhone = (value) => {
    let result = {
      isError: false,
      errorMessage: ''
    }
    let name = "Phone";
    let regex = /^[+]{1}(?:[0-9]\s?){6,15}[0-9]{1}$/;

    if(!value) {
      result.isError = true;
      result.errorMessage = `${name} is required`;
    } else if (value?.length < 6) {
      result.isError = true;
      result.errorMessage = `${name} minimum 6 character`;
    } else if (value?.length > 15) {
      result.isError = true;
      result.errorMessage = `${name} maximum 15 character`;
    } else if (!regex.test(value)) {
      result.isError = true;
      result.errorMessage = `${name} format is invalid, make sure to use country code like +62, min 6 char and max 15 char`;
    }

    return result;
  }

  const onSubmit = () => {
    let resultName = validateName(field?.name?.value);
    let resultEmail = validateEmail(field?.email?.value);
    let resultPhone = validatePhone(field?.phone?.value);

    if(!resultName?.isError && !resultEmail?.isError && !resultPhone?.isError) {
      setAlertConfirm({
        show: true,
        title: 'Save Data',
        message: 'Are you sure about the data you are going to save?',
        onCancel: () => {
          setAlertConfirm({
            show: false,
            title: '',
            message: '',
            onConfirm: () => {}
          })
        },
        onConfirm: () => {
          setAlertConfirm({
            show: false,
            title: '',
            message: '',
            onConfirm: () => {}
          })
          dispatch(submitUserCreate({name: field?.name?.value, email: field?.email?.value, phone: field?.phone?.value}));
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
        email: {
          ...field.email,
          isError: resultEmail?.isError,
          errorMessage: resultEmail?.errorMessage,
        },
        phone: {
          ...field.phone,
          isError: resultPhone?.isError,
          errorMessage: resultPhone?.errorMessage,
        },
      });
    }
  }

  const onReset = () => {
    setField({
      name: {
        value: '',
        isError: false,
        errorMessage: '',
      },
      email: {
        value: '',
        isError: false,
        errorMessage: '',
      },
      phone: {
        value: '',
        isError: false,
        errorMessage: '',
      },
    });
  }

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden hide-scroll">
      <BreadCrumb
        title={'Add User'}
        list={[
          {title: 'User', path: '/user', active: false},
          {title: '/', path: '', active: true},
          {title: `Add`, path: '', active: true},
        ]}
      />

      <div className="w-full h-fit flex flex-col bg-white shadow-lg rounded pb-16 p-5 desktop:pb-5">
        <div className="w-full flex flex-col gap-5 mb-5">
          <div className="w-full flex flex-col">
            <span>Name</span>
            <input
              type={'text'}
              className="w-full bg-white outline-none border border-sky-900 rounded px-2"
              placeholder="Full name"
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
            <span>Email</span>
            <input
              type={'email'}
              className="w-full bg-white outline-none border border-sky-900 rounded px-2"
              placeholder="Email"
              value={field?.email?.value}
              onChange={(e) => {
                let { value } = e.target;
                let result = validateEmail(value)
                setField({
                  ...field,
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
          <div className="w-full flex flex-col">
            <span>Phone</span>
            <input
              type={'text'}
              className="w-full bg-white outline-none border border-sky-900 rounded px-2"
              placeholder="Phone"
              value={field?.phone?.value}
              onChange={(e) => {
                let { value } = e.target;
                let result = validatePhone(value)
                setField({
                  ...field,
                  phone: {
                    ...field.phone,
                    value: value,
                    isError: result?.isError,
                    errorMessage: result?.errorMessage
                  }
                })
              }}
            />
            <span className="text-xs text-red-500">{field?.phone?.errorMessage}</span>
          </div>
        </div>
        <div className="w-full flex flex-col tablet:flex-row gap-5">
          <Button
            width={'w-full'}
            shadow={true}
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

      <Alert
        show={alertError?.show}
        type="warning"
        title={alertError?.title}
        message={alertError?.message}
        onConfirm={() => alertError?.onConfirm ? alertError?.onConfirm() : {}}
      />

      <Alert
        show={alertSuccess?.show}
        type="success"
        title={alertSuccess?.title}
        message={alertSuccess?.message}
        onConfirm={() => alertSuccess?.onConfirm ? alertSuccess?.onConfirm() : {}}
      />

      <Alert
        show={alertConfirm?.show}
        type="question"
        title={alertConfirm?.title}
        message={alertConfirm?.message}
        showCancelButton={true}
        onCancel={() => alertConfirm?.onCancel ? alertConfirm.onCancel() : {}}
        onConfirm={() => alertConfirm?.onConfirm ? alertConfirm.onConfirm() : {}}
      />

      <Loader show={userCreate?.isLoading} />
    </div>
  )
}

export default UserCreate;