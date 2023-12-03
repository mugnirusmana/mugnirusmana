import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { defaultActivateAccountValidate, submitActivateAccountValidate } from './../../redux/activateAccountValidateSlice';

import Alert from "../../components/alert";

const ActivateAccountValidate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const activateAccountValidateSlice = useSelector(({ activateAccountValidate }) => activateAccountValidate);
  const [showLoader, setShowLoader] = useState(true);
  const [firstLoad, setFirstLoad] = useState(false);
  const [activateAccountToken, setActivateAccountToken] = useState(location?.pathname?.replace('/activate-account/',''));
  const [showAlert, setShowAlert] = useState({
    show: false,
    type: '',
    title: '',
    message: '',
    buttonLabel: '',
    action: () => {}
  })

  useEffect(() => {
    setFirstLoad(true);
    setActivateAccountToken(location?.pathname?.replace('/activate-account/',''));
  }, []);

  useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
      onSubmit();
    }
  }, [firstLoad])

  useEffect(() => {
    let {
      isLoading,
      isError,
      isSuccess,
      errorMessage,
      data
    } = activateAccountValidateSlice;

    if (!isLoading && isSuccess) {
      setShowLoader(false);
      setShowAlert({
        show: true,
        type: 'success',
        title: 'Activate Account',
        message: 'Your account successfully activated',
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
          dispatch(defaultActivateAccountValidate());
          navigate('/login');
        }
      })
    }

    if (!isLoading && isError) {
      setShowLoader(false);
      let message = errorMessage
      if (data?.error?.token) message = `<div>Someting wrong with your data<br /><span class="font-bold">${data?.error?.token}</span></div>`;
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
          dispatch(defaultActivateAccountValidate());
        }
      })
    }

  }, [activateAccountValidateSlice])

  const onSubmit = () => {
    if (!activateAccountValidateSlice?.isLoading) {
      dispatch(submitActivateAccountValidate({token: activateAccountToken}));
    }
  }

  return (
    <>
      <form className="w-full tablet:w-[400px] h-fit p-10 rounded-md bg-white shadow-md flex flex-col gap-5">
        <span className="text-center font-bold mb-5">Activate Account</span>
        
        <div className={`w-full flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${showLoader ? 'opacity-100' : 'opacity-0'}`}>
          <span>Activation your account...</span>
          <span><i className="fa-solid fa-spinner animate-spin"></i></span>
        </div>
        
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

export default ActivateAccountValidate;
