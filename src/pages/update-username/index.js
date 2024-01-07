import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import BreadCrumb from "../../components/breadcrumb";
import Alert from "../../components/alert";
import Loader from "../../components/loader";
import Button from "../../components/Button";

import { defaultUpdateUsername, submitUpdateUsername } from './../../redux/updateUsernameSlice';
import { defaultCheckUsername, submitCheckUsername } from './../../redux/checkUsernameSlice';
import { defaultProfile, getProfile } from './../../redux/profileSlice';

const UpdateUsername = () => {
  const dispatch = useDispatch();
  const updateUsername = useSelector(({ updateUsername }) => updateUsername )
  const checkUsername = useSelector(({ checkUsername }) => checkUsername )
  const profile = useSelector(({ profile }) => profile )
  const auth = useSelector(({ auth }) => auth )
  const [showAlert, setShowAlert] = useState({
    show: false,
    title: '',
    type: '',
    message: '',
    onConfirm: () => {}
  })
  const [showUsername, setShowUsername] = useState(false);
  const [field, setField] = useState({
    username: {
      value: auth?.data?.username && auth?.data?.username !== "" ? auth?.data?.username : '',
      type: 'text',
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
    } = checkUsername;

    if(!isLoading && isSuccess) {
      setShowAlert({
        show: true,
        title: 'Check Username',
        type: 'success',
        message: 'Username is available',
        onConfirm: () => {
          setShowAlert({
            show: false,
            title: '',
            type: '',
            message: '',
            onConfirm: () => {}
          })
          dispatch(defaultCheckUsername());
        }
      })
    }

    if(!isLoading && isError) {
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
      setShowAlert({
        show: true,
        title: 'Check Username',
        type: 'warning',
        message: message,
        onConfirm: () => {
          setShowAlert({
            show: false,
            title: '',
            type: '',
            message: '',
            onConfirm: () => {}
          })
          dispatch(defaultCheckUsername());
        }
      })
    }

  }, [checkUsername])

  useEffect(() => {
    let {
      isLoading,
      isError,
      isSuccess,
      errorMessage,
      data
    } = updateUsername;

    if(!isLoading && isSuccess) {
      setShowUsername(false);
      setShowAlert({
        show: true,
        title: 'Update Username',
        type: 'success',
        message: 'Successfully udpate username',
        onConfirm: () => {
          setShowAlert({
            show: false,
            title: '',
            type: '',
            message: '',
            onConfirm: () => {}
          })
          dispatch(defaultUpdateUsername());
          dispatch(getProfile());
        }
      })
    }

    if(!isLoading && isError) {
      setShowUsername(false);
      let message = errorMessage
      if (data?.errors && data?.errors?.length > 0) {
        message = `<div>Someting wrong with your data:`;
        data?.errors?.map((item, index) => {
          if (index === data?.errors?.length-1) {
            message = message + `<br /><span class="font-bold">${item?.message}</span></div>`;
          } else {
            message = message + `<br /><span class="font-bold">${item?.message}</span>`;
          }
          return item;
        });
      }
      setShowAlert({
        show: true,
        title: 'Update Username',
        type: 'danger',
        message: message,
        onConfirm: () => {
          setShowAlert({
            show: false,
            title: '',
            type: '',
            message: '',
            onConfirm: () => {}
          })
          dispatch(defaultUpdateUsername());
        }
      })
    }

  }, [updateUsername]);

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage
    } = profile;

    if (!isLoading && isSuccess) {
      dispatch(defaultProfile());
    }

    if (!isLoading && isError) {
      setShowAlert({
        show: true,
        title: 'Get Profile',
        type: 'danger',
        message: errorMessage,
        onConfirm: () => {
          setShowAlert({
            show: false,
            title: '',
            type: '',
            message: '',
            onConfirm: () => {}
          })
          dispatch(defaultProfile());
        }
      })
    }

  }, [profile])

  const validateUsername = (value) => {
    let result = {
      isError: false,
      errorMessage: '',
    }
    let name = 'Username';

    if(!value) {
      result.isError = true;
      result.errorMessage = `${name} is required`;
    }

    return result;
  }

  const onCheckusername = () => {
    let result = validateUsername(field?.username?.value);
    if(!result?.isError) {
      dispatch(submitCheckUsername({username: field?.username?.value}))
    } else {
      setField({
        username: {
          ...field.username,
          isError: result?.isError,
          errorMessage: result?.errorMessage
        }
      })
    }
  }

  const onReset = () => {
    setField({
      username: {
        value: auth?.data?.username && auth?.data?.username !== "" ? auth?.data?.username : '',
        type: 'text',
        isError: false,
        errorMessage: '',
      }
    })
  }

  const onSave = () => {
    let result = validateUsername(field?.username?.value);
    if(!result?.isError) {
      setShowUsername(true)
    } else {
      setField({
        username: {
          ...field.username,
          isError: result?.isError,
          errorMessage: result?.errorMessage
        }
      })
    }
  }

  const renderInfo = () => {
    if (auth?.data?.username) {
      return (
        <div className='w-fit whitespace-nowrap flex flex-col text-sky-900'>
          <span className='font-bold'>INFO:</span>
          <span className='text-xs'>You has been set uername before, cannot set current username.</span>
        </div>
      )
    }
  }

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden hide-scroll">
      <BreadCrumb
        title={'Update Username'}
        list={[
          {title: 'Profile', path: '/profile', active: false},
          {title: '/', path: '', active: true},
          {title: `Update Username`, path: '', active: true},
        ]}
      />

      <div className="w-full h-fit flex flex-col bg-white shadow-lg rounded pb-16 p-5 desktop:pb-5">
        <div className='w-full tablet:w-1/2 flex flex-col gap-5'>
          {renderInfo()}
          <div className='w-full flex flex-col gap-2'>
            <label className='font-bold'>Username</label>
            <div className='w-full flex flex-row gap-2'>
              <input
                type={field?.username?.type}
                className="w-full bg-white outline-none border border-sky-900 rounded px-2"
                placeholder="Username"
                value={field?.username?.value}
                onChange={(e) => {
                  if(!auth?.data?.username) {
                    let { value } = e.target;
                    let result = validateUsername(value)
                    setField({
                      ...field,
                      username: {
                        ...field.username,
                        value: value,
                        isError: result?.isError,
                        errorMessage: result?.errorMessage
                      }
                    })
                  }
                }}
              />
              <Button
                width={'w-[50px]'}
                isLoading={updateUsername?.isLoading || checkUsername?.isLoading}
                disabled={auth?.data?.username}
                type={'submit'}
                label={<i className='fa-solid fa-share'></i>}
                onClick={() => onCheckusername()}
              />
            </div>
            <span className='text-red-500 text-xs'>{field?.username?.errorMessage}</span>
          </div>

          <div className='w-full flex flex-col tablet:flex-row gap-5'>
            <Button
              width={'w-full'}
              isLoading={updateUsername?.isLoading || checkUsername?.isLoading}
              disabled={auth?.data?.username}
              type={'reset'}
              label={'RESET'}
              onClick={() => onReset()}
            />
            <Button
              width={'w-full'}
              isLoading={updateUsername?.isLoading || checkUsername?.isLoading}
              disabled={auth?.data?.username}
              type={'submit'}
              label={'SAVE'}
              shadow={true}
              onClick={() => onSave()}
            />
          </div>
        </div>
      </div>

      <Alert
        show={showAlert?.show}
        type={showAlert?.type}
        title={showAlert?.title}
        message={showAlert?.message}
        onConfirm={() => showAlert?.onConfirm ? showAlert?.onConfirm() : {}}
      />

      <Alert
        show={showUsername}
        isLoading={updateUsername?.isLoading}
        type="question"
        title="Update Username"
        message="<div>Are you sure want to udpate your username?<br /><span class='font-bold text-xs'>Username can only be changed once</span><br /><span class='font-bold text-xs'>After confirm your can't go back</span></div>"
        showCancelButton={true}
        onCancel={() => setShowUsername(false)}
        onConfirm={() => dispatch(submitUpdateUsername({username: field?.username?.value}))}
      />

      <Loader show={profile?.isLoading} />
    </div>
  )
}

export default UpdateUsername;
