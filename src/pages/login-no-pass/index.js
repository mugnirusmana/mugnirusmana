import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { defaultLoginNoPass, submitLoginNoPass } from '../../redux/loginNoPassSlice';
import { defaultLoginNoPassValidate, submitLoginNoPassValidate } from '../../redux/loginNoPassValidateSlice';

import { getWindowDimensions } from './../../helper';

import Alert from "../../components/alert";

const LoginEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const desktopSize = 1025;
  const loginNoPassSlice = useSelector(({ loginNoPass }) => loginNoPass);
  const loginNoPassValidateSlice = useSelector(({ loginNoPassValidate }) => loginNoPassValidate);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [disabledEmail, setDisabledEmail] = useState(false);
  const [showAlert, setShowAlert] = useState({
    show: false,
    type: '',
    title: '',
    message: '',
    buttonLabel: '',
    action: () => {}
  })
  const [field, setField] = useState({
    email: {
      value: '',
      type: 'email',
      isError: false,
      errorMessage: '',
    },
    code: {
      value: '',
      type: 'text',
      isError: false,
      errorMessage: '',
    }
  });

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions())
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    let {
      isLoading,
      isError,
      isSuccess,
      errorMessage,
      data
    } = loginNoPassSlice;

    if (!isLoading && isSuccess) {
      setDisabledEmail(true);
      setShowAlert({
        show: true,
        type: 'success',
        title: 'Send Code',
        message: 'We have send you an email for code login',
        buttonLabel: 'Confirm',
        action: () => {
          setShowAlert({
            show: false,
            type: '',
            title: '',
            message: '',
            buttonLabel: '',
            action: () => {}
          })
          dispatch(defaultLoginNoPass());
        }
      })
    }

    if (!isLoading && isError) {
      let message = errorMessage
      if (data?.error?.email) message = `<div>Someting wrong with your data<br /><span class="font-bold">${data?.error?.email}</span></div>`;
      setShowAlert({
        show: true,
        type: 'warning',
        title: 'Send Code',
        message: message,
        buttonLabel: 'Confirm',
        action: () => {
          setShowAlert({
            show: false,
            type: '',
            title: '',
            message: '',
            buttonLabel: '',
            action: () => {}
          })
          dispatch(defaultLoginNoPass());
        }
      })
    }

  }, [loginNoPassSlice])

  useEffect(() => {
    let {
      isLoading,
      isError,
      isSuccess,
      errorMessage,
      data
    } = loginNoPassValidateSlice;

    if (!isLoading && isSuccess) {
      dispatch(defaultLoginNoPassValidate());      
    }

    if (!isLoading && isError) {
      let message = errorMessage
      if (data?.error?.email) message = `<div>Someting wrong with your data<br /><span class="font-bold">${data?.error?.email}</span></div>`;
      setShowAlert({
        show: true,
        type: 'warning',
        title: 'Login',
        message: message,
        buttonLabel: 'Confirm',
        action: () => {
          setShowAlert({
            show: false,
            type: '',
            title: '',
            message: '',
            buttonLabel: '',
            action: () => {}
          })
          dispatch(defaultLoginNoPassValidate());
        }
      })
    }

  }, [loginNoPassValidateSlice])

  const requestGetCode = () => {
    let resultEmail = validateEmail(field?.email?.value);

    if (!resultEmail?.isError) {
      dispatch(submitLoginNoPass({email: field?.email?.value}))
    } else {
      setField({
        email: {
          ...field?.email,
          isError: resultEmail?.isError,
          errorMessage: resultEmail?.errorMessage
        }
      })
    }
  }

  const onSubmit = () => {
    let resultCode = validateCode(field?.code?.value);
    if (!resultCode?.isError) {
      let params = {
        email: field?.email?.value,
        code: field?.code?.value
      }
      dispatch(submitLoginNoPassValidate(params, windowDimensions?.width, desktopSize));
    } else {
      setField({
        ...field,
        code: {
          ...field?.code,
          isError: resultCode?.isError,
          errorMessage: resultCode?.errorMessage
        }
      })
    }
  }

  const validateEmail = (value) => {
    let result = {
      isError: false,
      errorMessage: '',
    }
    let name = 'Email';
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!value) {
      result.isError = true;
      result.errorMessage = `${name} is required`;
    } else if (!emailRegex.test(value)) {
      result.isError = true;
      result.errorMessage = `${name} format is invalid`;
    }

    return result;
  }

  const validateCode = (value) => {
    let result = {
      isError: false,
      errorMessage: '',
    }
    let name = 'Code';

    if(!value) {
      result.isError = true;
      result.errorMessage = `${name} is required`;
    }

    return result;
  }

  return (
    <>
      <form className="w-full tablet:w-[400px] h-fit p-10 rounded-md bg-white shadow-md flex flex-col gap-5">
        <span className="text-center font-bold mb-5">Login To Your Account</span>
        <div className="w-full flex flex-col gap-5 mb-5">
          <div className="w-full flex flex-col">
            <div className='w-full flex flex-row gap-5'>
              <input
                type={field?.email?.type}
                className={`h-[40px] rounded w-full outline-none bg-[#E8F0FF] px-2 borde ${field?.email?.isError ? 'border-red-400' : 'border-transparent'}`}
                placeholder="Email"
                value={field?.email?.value}
                onChange={(e) => {
                  if (!disabledEmail) {
                    let resultValidate = validateEmail(e?.currentTarget?.value);
                    setField({...field, email: {
                      ...field.email,
                      value: e?.currentTarget?.value,
                      isError: resultValidate?.isError,
                      errorMessage: resultValidate?.errorMessage,
                    }})
                  }
                }}
              />
              <div
                className={`w-fit h-[40px] rounded flex items-center justify-center px-2 ${loginNoPassSlice?.isLoading || disabledEmail ? 'text-gray-500 bg-gray-300 cursor-default' : 'bg-sky-600 text-white cursor-pointer'}`}
                onClick={() => {
                  if(!loginNoPassSlice?.isLoading && !disabledEmail) {
                    requestGetCode();
                  }
                }}
              >
                <i className="fa-solid fa-share"></i>
              </div>
            </div>
            <span className="text-red-400 text-xs">{field?.email?.isError ? field?.email?.errorMessage : ''}</span>
          </div>

          <div className="w-full flex flex-col">
            <div className='w-full flex flex-row gap-5'>
              <input
                type={field?.code?.type}
                className={`h-[40px] rounded w-full outline-none bg-[#E8F0FF] px-2 borde ${field?.code?.isError ? 'border-red-400' : 'border-transparent'}`}
                placeholder="Code"
                value={field?.code?.value}
                onChange={(e) => {
                  if (disabledEmail) {
                    let resultValidate = validateCode(e?.currentTarget?.value);
                    setField({...field, code: {
                      ...field.code,
                      value: e?.currentTarget?.value,
                      isError: resultValidate?.isError,
                      errorMessage: resultValidate?.errorMessage,
                    }})
                  }
                }}
              />
            </div>
            <span className="text-red-400 text-xs">{field?.code?.isError ? field?.code?.errorMessage : ''}</span>
          </div>
        </div>
        <div
          className={`w-full h-[40px] rounded ${loginNoPassValidateSlice?.isLoading || !disabledEmail ? 'cursor-default text-gray-500 bg-gray-300' : 'text-white cursor-pointer bg-sky-600'} flex items-center justify-center text-center font-bold`}
          onClick={() => !loginNoPassValidateSlice?.isLoading && disabledEmail ? onSubmit() : {}}
        >{loginNoPassValidateSlice?.isLoading ? 'Loading...' : 'Submit'}</div>
        <div className='w-full text-center text-gray-400 text-xs'>Login <span className='cursor-pointer text-sky-600 font-bold' onClick={() => navigate('/login')}>with password</span></div>
      </form>

      <Alert
        show={showAlert?.show}
        type={showAlert?.type}
        title={showAlert?.title}
        message={showAlert?.message}
        showCancelButton={false}
        confirmLabel={showAlert?.buttonLabel}
        onConfirm={() => showAlert?.action ? showAlert.action() : {}}
      />
    </>
  )
}

export default LoginEmail;
