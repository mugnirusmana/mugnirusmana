import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BreadCrumb from "../../components/breadcrumb";
import Alert from "../../components/alert";
import Loader from "../../components/loader";
import Button from "../../components/Button";

import { defaultChangePasswordd, submitChangePasswordd } from './../../redux/changePasswordSlice';

const ChangePassowrd = () => {
  const dispatch = useDispatch();
  const changePassowrd = useSelector(({ changePassowrd }) => changePassowrd )
  const [showAlert, setShowAlert] = useState({
    show: false,
    type: '',
    message: '',
    onConfirm: () => {}
  })
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [field, setField] = useState({
    current_password: {
      value: '',
      type: 'password',
      isError: false,
      errorMessage: '',
    },
    new_password: {
      value: '',
      type: 'password',
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
    } = changePassowrd;

    if(!isLoading && isSuccess) {
      setShowChangePassword(false);
      setShowAlert({
        show: true,
        type: 'success',
        message: 'Successfully change password',
        onConfirm: () => {
          setShowAlert({
            show: false,
            type: '',
            message: '',
            onConfirm: () => {}
          })
          setField({
            current_password: {
              value: '',
              type: 'password',
              isError: false,
              errorMessage: '',
            },
            new_password: {
              value: '',
              type: 'password',
              isError: false,
              errorMessage: '',
            }
          })
          dispatch(defaultChangePasswordd());
        }
      })
    }

    if(!isLoading && isError) {
      setShowChangePassword(false);
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
        type: 'danger',
        message: message,
        onConfirm: () => {
          setShowAlert({
            show: false,
            type: '',
            message: '',
            onConfirm: () => {}
          })
          dispatch(defaultChangePasswordd());
        }
      })
    }

  }, [changePassowrd])

  const validateCurrentPassword = (value) => {
    let result = {
      isError: false,
      errorMessage: '',
    }
    let name = 'Current Password';

    if(!value) {
      result.isError = true;
      result.errorMessage = `${name} is required`;
    }

    return result;
  }

  const validateNewPassword = (value) => {
    let result = {
      isError: false,
      errorMessage: '',
    }
    let name = 'New Password';
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
    }  else if (value === field?.current_password?.value) {
      result.isError = true;
      result.errorMessage = `${name} must be different with current password`;
    }

    return result;
  }

  const onSave = () => {
    let resultCurrentPass = validateCurrentPassword(field?.current_password?.value);
    let resultNewPass = validateNewPassword(field?.new_password?.value);

    if(!resultCurrentPass?.isError && !resultNewPass?.isError) {
      setShowChangePassword(true)
    } else {
      setField({
        current_password: {
          ...field.current_password,
          isError: resultCurrentPass?.isError,
          errorMessage: resultCurrentPass?.errorMessage
        },
        new_password: {
          ...field.new_password,
          isError: resultNewPass?.isError,
          errorMessage: resultNewPass?.errorMessage
        }
      })
    }
  }

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden hide-scroll">
      <BreadCrumb
        title={'Change Password'}
        list={[
          {title: 'Profile', path: '/profile', active: false},
          {title: '/', path: '', active: true},
          {title: `Change Password`, path: '', active: true},
        ]}
      />

      <div className="w-full h-fit flex flex-col bg-white shadow-lg rounded pb-16 p-5 desktop:pb-5">
        <div className='w-full tablet:w-1/2 flex flex-col gap-5'>
          <div className='w-full flex flex-col gap-2'>
            <label className='font-bold'>Current Password</label>
            <div className='w-full flex flex-row gap-2'>
              <input
                type={field?.current_password?.type}
                className="w-full bg-white outline-none border border-sky-900 rounded px-2"
                placeholder="Current Password"
                value={field?.current_password?.value}
                onChange={(e) => {
                  let { value } = e.target;
                  let result = validateCurrentPassword(value)
                  setField({
                    ...field,
                    current_password: {
                      ...field.current_password,
                      value: value,
                      isError: result?.isError,
                      errorMessage: result?.errorMessage
                    }
                  })
                }}
              />
              <div
                className='w-[50px] h-fit bg-sky-900 rounded text-white p-2 cursor-pointer flex items-center justify-center text-center'
                onClick={(() => {
                  setField({
                    ...field,
                    current_password: {
                      ...field.current_password,
                      type: field.current_password?.type === 'password' ? 'text' : 'password'
                    }
                  })
                })}
              >
                {field?.current_password?.type === 'password' ? <i className='fa-solid fa-lock'></i> : <i className='fa-solid fa-lock-open'></i>}
              </div>
            </div>
            <span className='text-red-500 text-xs'>{field?.current_password?.errorMessage}</span>
          </div>

          <div className='w-full flex flex-col gap-2'>
            <label className='font-bold'>New Password</label>
            <div className='w-full flex flex-row gap-2'>
              <input
                type={field?.new_password?.type}
                className="w-full bg-white outline-none border border-sky-900 rounded px-2"
                placeholder="New Password"
                value={field?.new_password?.value}
                onChange={(e) => {
                  let { value } = e.target;
                  let result = validateNewPassword(value)
                  setField({
                    ...field,
                    new_password: {
                      ...field.new_password,
                      value: value,
                      isError: result?.isError,
                      errorMessage: result?.errorMessage
                    }
                  })
                }}
              />
              <div
                className='w-[50px] h-fit bg-sky-900 rounded text-white p-2 cursor-pointer flex items-center justify-center text-center'
                onClick={(() => {
                  setField({
                    ...field,
                    new_password: {
                      ...field.new_password,
                      type: field.new_password?.type === 'password' ? 'text' : 'password'
                    }
                  })
                })}
              >
                {field?.new_password?.type === 'password' ? <i className='fa-solid fa-lock'></i> : <i className='fa-solid fa-lock-open'></i>}
              </div>
            </div>
            <span className='text-red-500 text-xs'>{field?.new_password?.errorMessage}</span>
          </div>

          <Button
            width={'w-full'}
            isLoading={changePassowrd?.isLoading}
            disabled={false}
            type={'submit'}
            label={'SAVE'}
            onClick={() => onSave()}
          />
        </div>
      </div>

      <Alert
        show={showAlert?.show}
        type={showAlert?.type}
        title={"Change Password"}
        message={showAlert?.message}
        onConfirm={() => showAlert?.onConfirm ? showAlert?.onConfirm() : {}}
      />

      <Alert
        show={showChangePassword}
        isLoading={changePassowrd?.isLoading}
        type="question"
        title="Change Password"
        message="Are you sure want to change your password?"
        showCancelButton={true}
        onCancel={() => setShowChangePassword(false)}
        onConfirm={() => dispatch(submitChangePasswordd({current_password: field?.current_password?.value, new_password: field?.new_password?.value}))}
      />

      <Loader show={false} />
    </div>
  )
}

export default ChangePassowrd;