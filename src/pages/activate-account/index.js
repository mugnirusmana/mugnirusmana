import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { defaultActivateAccount, submitActivateAccount } from './../../redux/activateAccountSlice';

import Alert from "../../components/alert";

const ActivateAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activateAccountSlice = useSelector(({ activateAccount }) => activateAccount);
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
    }
  });

  useEffect(() => {
    let {
      isLoading,
      isError,
      isSuccess,
      errorMessage,
      data
    } = activateAccountSlice;

    if (!isLoading && isSuccess) {
      setShowAlert({
        show: true,
        type: 'success',
        title: 'Activate Account',
        message: 'We have send you an email for activating your account',
        buttonLabel: 'Back to Login',
        action: () => {
          setShowAlert({
            show: false,
            type: '',
            title: '',
            message: '',
            buttonLabel: '',
            action: () => {}
          })
          dispatch(defaultActivateAccount());
          navigate('/login');
        }
      })
    }

    if (!isLoading && isError) {
      let message = errorMessage
      if (data?.error?.email) message = `<div>Someting wrong with your data<br /><span class="font-bold">${data?.error?.email}</span></div>`;
      setShowAlert({
        show: true,
        type: 'warning',
        title: 'Activate Account',
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
          dispatch(defaultActivateAccount());
        }
      })
    }

  }, [activateAccountSlice])

  const onSubmit = () => {
    let resultEmail = validateEmail(field?.email?.value);

    if (!resultEmail?.isError) {
      dispatch(submitActivateAccount({email: field?.email?.value}))
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

  return (
    <>
      <form className="w-full tablet:w-[400px] h-fit p-10 rounded-md bg-white shadow-md flex flex-col gap-5">
        <span className="text-center font-bold mb-5">Activate Account</span>
        <div className="w-full">
          <input
            type={field?.email?.type}
            className={`h-[40px] rounded w-full outline-none bg-[#E8F0FF] px-2 borde ${field?.email?.isError ? 'border-red-400' : 'border-transparent'}`}
            placeholder="Email"
            value={field?.email?.value}
            onChange={(e) => {
              let resultValidate = validateEmail(e?.currentTarget?.value);
              setField({...field, email: {
                ...field.email,
                value: e?.currentTarget?.value,
                isError: resultValidate?.isError,
                errorMessage: resultValidate?.errorMessage,
              }})
            }}
          />
          <span className="text-red-400 text-xs">{field?.email?.isError ? field?.email?.errorMessage : ''}</span>
        </div>
        <div
          className={`w-full h-[40px] rounded ${activateAccountSlice?.isLoading? 'cursor-default text-gray-500 bg-gray-300' : 'text-white cursor-pointer bg-sky-600'} flex items-center justify-center text-center font-bold`}
          onClick={() => !activateAccountSlice?.isLoading ? onSubmit() : {}}
        >{activateAccountSlice?.isLoading ? 'Loading...' : 'Submit'}</div>
        <div className='w-full flex flex-row items-center justify-center text-center text-gray-400 text-xs'>Back to&nbsp;<span className='cursor-pointer text-sky-600 font-bold' onClick={() => navigate('/login')}>Login</span></div>
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

export default ActivateAccount;
