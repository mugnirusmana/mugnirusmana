import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { defaultResetPassword, submitResetPassword } from './../../redux/resetPasswordSlice';

import Alert from "../../components/alert";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [resetPasswordToken, setResetPasswordToken] = useState(location?.pathname?.replace('/reset-password/',''));
  const resetPasswordSlice = useSelector(({ resetPassword }) => resetPassword);
  const [showAlert, setShowAlert] = useState({
    show: false,
    type: '',
    title: '',
    message: '',
    confirmLabel: '',
    action: () => {}
  })
  const [field, setField] = useState({
    password: {
      value: '',
      type: 'password',
      isError: false,
      
      errorMessage: '',
    }
  });

  useEffect(() => {
    setResetPasswordToken(location?.pathname?.replace('/reset-password/',''));
  }, [])

  useEffect(() => {
    let {
      isLoading,
      isError,
      isSuccess,
      errorMessage,
      data
    } = resetPasswordSlice;
    console.log('resetPasswordSlice ', resetPasswordSlice);
    if (!isLoading && isSuccess) {
      setShowAlert({
        show: true,
        type: 'success',
        title: 'Reset Password',
        message: 'Successfully reset password',
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
          dispatch(defaultResetPassword());
          navigate('/login');
        }
      })
    }

    if (!isLoading && isError) {
      console.log('data ', data);
      let message = errorMessage
      if (data?.errors && data?.errors?.length > 0) {
        message = `<div>Someting wrong with your data<br /><span class="font-bold">${data?.error?.token}</span></div>`
        data?.errors?.map((item, index) => {
          if (index === data?.errors?.length-1) {
            message = `<br /><span class="font-bold">${data?.error?.message}</span></div>`;
          } else {
            message = `<br /><span class="font-bold">${data?.error?.message}</span>`;
          }
          return item;
        });
      }
      setShowAlert({
        show: true,
        type: 'warning',
        title: 'Reset Password',
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
          dispatch(defaultResetPassword());
        }
      })
    }
  }, [resetPasswordSlice]);

  const onSubmit = () => {
    let resultPassword = validatePassword(field?.password?.value);
    if (!resultPassword?.isError) {
      console.log('submit form ', field);
      let params = {
        token: resetPasswordToken,
        password: field?.password?.value
      }
      dispatch(submitResetPassword(params));
    } else {
      setField({
        password: {
          ...field?.password,
          isError: resultPassword?.isError,
          errorMessage: resultPassword?.errorMessage
        }
      })
    }
  }
  
  const validatePassword = (value) => {
    let result = {
      isError: false,
      errorMessage: '',
    }
    let name = 'Password';
    let passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]+$/;

    if(!value) {
      result.isError = true;
      result.errorMessage = `${name} is required`;
    } else if (value?.length < 5) {
      result.isError = true;
      result.errorMessage = `${name} min 5 character`;
    } else if (value?.length > 16) {
      result.isError = true;
      result.errorMessage = `${name} max 16 character`;
    } else if (!passwordRegex.test(value)) {
      result.isError = true;
      result.errorMessage = `${name} format is invalid (must be containt alphabet, numeric and special character)`;
    }

    return result;
  }

  return (
    <>
      <form className="w-full tablet:w-[400px] h-fit p-10 rounded-md bg-white shadow-md flex flex-col gap-5">
        <span className="text-center font-bold mb-5">Reset Password</span>
        <div className="w-full">
          <div className="w-full h-[40px] flex flex-row bg-[#E8F0FF] rounded">
            <input
              type={field?.password?.type}
              className={`h-full rounded w-full bg-[#E8F0FF] outline-none px-2 borde ${field?.password?.isError ? 'border-red-400' : 'border-transparent'}`}
              placeholder="Password"
              value={field?.password?.value}
              autoComplete="off"
              maxLength={16}
              onChange={(e) => {
                let resultValidate = validatePassword(e?.currentTarget?.value);
                setField({...field, password: {
                  ...field.password,
                  value: e?.currentTarget?.value,
                  isError: resultValidate?.isError,
                  errorMessage: resultValidate?.errorMessage,
                }})
              }}
            />
            <div
              className="w-[50px] h-full cursor-pointer rounded flex flex-row items-center justify-center"
              onClick={() => {
                setField({
                  ...field,
                  password: {
                    ...field?.password,
                    type: field?.password?.type === 'password' ? 'text' : 'password',
                  }
                })
              }}
            >
              {field?.password?.type === 'password' ? <i className="fa-solid fa-lock"></i> : <i className="fa-solid fa-lock-open"></i>}
            </div>
          </div>
          <span className="text-red-400 text-xs">{field?.password?.isError ? field?.password?.errorMessage : ''}</span>
        </div>
        <div
          className={`w-full h-[40px] rounded ${resetPasswordSlice?.isLoading? 'cursor-default text-gray-500 bg-gray-300' : 'text-white cursor-pointer bg-sky-600'} flex items-center justify-center text-center font-bold`}
          onClick={() => !resetPasswordSlice?.isLoading ? onSubmit() : {}}
        >{resetPasswordSlice?.isLoading ? 'Loading...' : 'Submit'}</div>
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

export default ResetPassword;
