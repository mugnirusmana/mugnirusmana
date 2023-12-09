import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import BreadCrumb from "../../components/breadcrumb";
import Button from "../../components/Button";
import Alert from "../../components/alert";
import Loader from "../../components/loader";

import DefaultImage from './../../assets/images/defaul-img.png';

import { defaultProfile, getProfile } from './../../redux/profileSlice';
import { defaultChangeProfilePicture, submitChangeProfilePicture } from './../../redux/changeProfilePictureSlice';
import { defaultUpdateProfile, submitUpdateProfile } from './../../redux/updateProfileSlice';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputImageRef = useRef();
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [image, setImage] = useState('');
  const [field, setField] = useState({
    name: {
      value: '',
      isError: false,
      errorMessage: '',
    },
    phone: {
      value: '',
      isError: false,
      errorMessage: '',
    }
  });
  const [alertError, setAlertError] = useState({
    show: false,
    title: '',
    message: '',
    onConfirm: () => {},
  })
  const [alertSuccess, setAlertSuccess] = useState({
    show: false,
    title: '',
    message: '',
    onConfirm: () => {},
  })
  const [alertConfirm, setAlertConfirm] = useState({
    show: false,
    title: '',
    message: '',
    onCancel: () => {},
    onConfirm: () => {},
  })
  const auth = useSelector(({ auth }) => auth);
  const profile = useSelector(({ profile }) => profile);
  const changeProfilePicture = useSelector(({ changeProfilePicture }) => changeProfilePicture);
  const updateProfile = useSelector(({ updateProfile }) => updateProfile);

  useState(() => {
    setFirstLoaded(true);
  }, []);

  useEffect(() => {
    if (firstLoaded) {
      setImage(auth?.data?.profile?.image);
      setField({
        name: {...field.name, value: auth?.data?.profile?.name, isError: false, errorMessage: ''},
        phone: {...field.phone, value: auth?.data?.profile?.phone, isError: false, errorMessage: ''}
      });
      dispatch(getProfile());
      setFirstLoaded(false);
    }
  }, [firstLoaded]);

  useEffect(() => {
    let {
      isLoading,
      isError,
      isSuccess,
      errorMessage,
    } = profile;

    if(!isLoading && isSuccess) {
      dispatch(defaultProfile());
      inputImageRef.current.value = "";
      setImage(auth?.data?.profile?.image);
      setField({
        name: {...field.name, value: auth?.data?.profile?.name, isError: false, errorMessage: ''},
        phone: {...field.phone, value: auth?.data?.profile?.phone, isError: false, errorMessage: ''}
      });
    }

    if(!isLoading && isError) {
      setAlertError({
        show: true,
        title: 'Get Profile',
        message: errorMessage,
        onConfirm: () => {
          setAlertError({
            show: false,
            title: '',
            message: '',
            onConfirm: () => {},
          })
          dispatch(defaultProfile());
        },
      })
    }
  }, [profile]);

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      errorMessage,
      isError,
      data
    } = changeProfilePicture;

    if(!isLoading && isSuccess) {
      setAlertSuccess({
        show: true,
        title: 'Change Picture',
        message: 'Profile picture successfully changed',
        onConfirm: () => {
          setAlertSuccess({
            show: false,
            title: '',
            message: '',
            onConfirm: () => {},
          })
          dispatch(defaultChangeProfilePicture());
          dispatch(getProfile());
        },
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
      setAlertError({
        show: true,
        title: 'Change Picture',
        message: message,
        onConfirm: () => {
          setAlertError({
            show: false,
            title: '',
            message: '',
            onConfirm: () => {},
          })
          dispatch(defaultChangeProfilePicture());
          dispatch(getProfile());
        },
      })
    }
  }, [changeProfilePicture]);

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      errorMessage,
      isError,
      data
    } = updateProfile;

    if(!isLoading && isSuccess) {
      setAlertSuccess({
        show: true,
        title: 'Update Profile',
        message: 'Profile successfully updated',
        onConfirm: () => {
          setAlertSuccess({
            show: false,
            title: '',
            message: '',
            onConfirm: () => {},
          })
          dispatch(defaultUpdateProfile());
          dispatch(getProfile());
          setEditMode(false);
        },
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
      setAlertError({
        show: true,
        title: 'Update Profile',
        message: message,
        onConfirm: () => {
          setAlertError({
            show: false,
            title: '',
            message: '',
            onConfirm: () => {},
          })
          dispatch(defaultUpdateProfile());
          dispatch(getProfile());
        },
      })
    }

  }, [updateProfile]);

  const validateName = (value) => {
    let result = {
      isError: false,
      errorMessage: '',
    }
    let name = 'Name';
    let regex = /^[a-zA-Z ]+$/;

    if(!value) {
      result.isError = true;
      result.errorMessage = `${name} is required`;
    } else if (value?.length > 50) {
      result.isError = true;
      result.errorMessage = `${name} max 50 character`;
    } else if (!regex.test(value)) {
      result.isError = true;
      result.errorMessage = `${name} format is invalid, only alphabet and space`;
    }

    return result;
  }

  const validatePhone = (value) => {
    let result = {
      isError: false,
      errorMessage: '',
    }
    let name = 'Phone';
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

  const onSavePersonalData = () => {
    let resultName = validateName(field?.name?.value);
    let resultPhone = validatePhone(field?.phone?.value);

    if(!resultName?.isError && !resultPhone?.isError) {
      setAlertConfirm({
        show: true,
        title: 'Update Personal Data',
        message: 'Will you update your personal data?',
        onCancel: () => {
          setAlertConfirm({
            show: false,
            title: '',
            message: '',
            onCancel: () => {},
            onConfirm: () => {},
          })
        },
        onConfirm: () => {
          setAlertConfirm({
            show: false,
            title: '',
            message: '',
            onCancel: () => {},
            onConfirm: () => {},
          })
          let params = {name: field?.name?.value, phone: field?.phone?.value};
          dispatch(submitUpdateProfile(params));
        },
      })
    } else {
      setField({
        ...field,
        name: {
          ...field.name,
          isError: resultName?.isError,
          errorMessage: resultName?.errorMessage
        },
        phone: {
          ...field.phone,
          isError: resultPhone?.isError,
          errorMessage: resultPhone?.errorMessage
        }
      })
    }
  }

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden hide-scroll">
      <BreadCrumb
        title={'Profile'}
        list={[
          {title: 'Profile', path: '/', active: true},
        ]}
      />

      <div className="w-full flex flex-col tablet:flex-row gap-5 pb-20 tablet:pb-0">
        <div className="w-full tablet:w-[300px] p-5 h-fit flex flex-col items-center justify-center bg-white rounded shadow-lg gap-5">
          <div className="w-[250px] h-[250px] rounded-full bg-gray-400 relative">
            {image ? (
              <img
                src={image}
                className="w-full h-full rounded-full object-cover border border-sky-900 cursor-pointer"
                alt="profile"
                onClick={() => inputImageRef?.current?.click()}
              />
            ) : (
              <img
                src={DefaultImage}
                className="w-full h-full rounded-full object-cover border border-sky-900 cursor-pointer"
                alt="profile"
                onClick={() => inputImageRef?.current?.click()}
              />
            )}
            <div
              className="w-[30px] h-[30px] bg-sky-900 text-white rounded-full absolute top-6 right-5 flex items-center justify-center border border-white cursor-pointer"
              onClick={() => inputImageRef?.current?.click()}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <input
              ref={inputImageRef}
              type="file"
              accept=".jpeg,.jpg,.png"
              className="hidden"
              onChange={(e) => {
                let file = new FileReader();
                if (e?.target?.files[0]) {
                  file.readAsDataURL(e.target.files[0]);
                  file.onload = (response) => {
                    if (response?.target?.result) {
                      setImage(response?.target?.result);
                      setAlertConfirm({
                        show: true,
                        title: 'Change Picture',
                        message: 'Will you change your profile picture?',
                        onCancel: () => {
                          setAlertConfirm({
                            show: false,
                            title: '',
                            message: '',
                            onCancel: () => {},
                            onConfirm: () => {},
                          });
                          setImage(auth?.data?.profile?.image);
                        },
                        onConfirm: () => {
                          setAlertConfirm({
                            show: false,
                            title: '',
                            message: '',
                            onCancel: () => {},
                            onConfirm: () => {},
                          })
                          dispatch(submitChangeProfilePicture({image: response?.target?.result}));
                        },
                      })
                    } else {
                      setImage(auth?.data?.profile?.image);
                    }
                  };
                } else {
                  setImage(auth?.data?.profile?.image);
                }
                file.onerror = () => setImage(auth?.data?.profile?.image);
              }}
            />
          </div>
          <hr className="border-[0.5px] border-sky-900 w-full" />
          <Button
            width={'w-full'}
            shadow={true}
            isLoading={false}
            disabled={false}
            type={'submit'}
            label={'Change Password'}
            onClick={() => navigate('/profile/change-password')}
          />

          <Button
            width={'w-full'}
            shadow={true}
            isLoading={false}
            disabled={false}
            type={'submit'}
            label={'Update Username'}
            onClick={() => navigate('/profile/update-username')}
          />
        </div>
        <div className="w-full h-fit flex flex-col bg-white rounded p-5 shadow-lg text-xs tablet:text-lg">
          <div className="w-fill flex flex-col mb-3">
            <span className="font-bold mb-3 text-lg">ACCOUNT</span>
            <div className="w-full flex flex-row gap-3">
              <span className="w-fit tablet:w-[80px]">Email</span>
              <span>:</span>
              <span>{auth?.data?.email}</span>
            </div>
            <div className="w-full flex flex-row gap-3">
              <span className="w-fit tablet:w-[80px]">Username</span>
              <span>:</span>
              <span>{auth?.data?.username??'-'}</span>
            </div>
          </div>
          <hr className="border-[0.5px] border-sky-900 w-full" />
          <div className="w-fill flex flex-col mt-3">
            <span className="font-bold mb-3 text-md">PERSONAL</span>
            <div className={`w-full flex ${editMode ? 'flex-col gap-0' : 'flex-row gap-3'}`}>
              <span className="w-fit tablet:w-[80px]">Name</span>
              {editMode ? (
                <input
                  type="text"
                  className="w-full p-1 rounded bg-white border border-sky-900 outline-none"
                  value={field?.name?.value}
                  onChange={(e) => {
                    let value = e?.currentTarget?.value;
                    let result = validateName(value);
                    setField({
                      ...field,
                      name: {
                        ...field.name,
                        value: value,
                        isError: result?.isError,
                        errorMessage: result?.errorMessage,
                      }
                    });
                  }}
                />
              ) : (
                <>
                <span>:</span>
                <span>{auth?.data?.profile?.name}</span>
                </>
              )}
            </div>
            {editMode? <span className="text-xs text-red-500 mb-3">{field?.name?.errorMessage}</span> : null}
            <div className={`w-full flex ${editMode ? 'flex-col gap-0' : 'flex-row gap-3'}`}>
              <span className="w-fit tablet:w-[80px]">Phone</span>
              {editMode ? (
                <input
                  type="text"
                  className="w-full p-1 rounded bg-white border border-sky-900 outline-none"
                  value={field?.phone?.value}
                  onChange={(e) => {
                    let value = e?.currentTarget?.value;
                    let result = validatePhone(value);
                    setField({
                      ...field,
                      phone: {
                        ...field.phone,
                        value: value,
                        isError: result?.isError,
                        errorMessage: result?.errorMessage,
                      }
                    })
                  }}
                />
              ) : (
                <>
                <span>:</span>
                <span>{auth?.data?.profile?.phone}</span>
                </>
              )}
            </div>
            {editMode? <span className="text-xs text-red-500 mb-3">{field?.phone?.errorMessage}</span> : null}
            {editMode ? (
              <div className="w-full flex flex-col tablet:flex-row gap-3 mt-3">
                <Button
                  width={'w-full tablet:w-fit'}
                  shadow={true}
                  isLoading={false}
                  disabled={false}
                  type={'reset'}
                  label={'Cancel Edit Mode'}
                  onClick={() => {
                    setEditMode(false);
                    setField({
                      name: {...field.name, value: auth?.data?.profile?.name, isError: false, errorMessage: ''},
                      phone: {...field.phone, value: auth?.data?.profile?.phone, isError: false, errorMessage: ''}
                    });
                  }}
                />
                <Button
                  width={'w-full tablet:w-fit'}
                  shadow={true}
                  isLoading={false}
                  disabled={false}
                  type={'reset'}
                  label={'Reset Form'}
                  onClick={() => {
                    setField({
                      name: {...field.name, value: auth?.data?.profile?.name, isError: false, errorMessage: ''},
                      phone: {...field.phone, value: auth?.data?.profile?.phone, isError: false, errorMessage: ''}
                    });
                  }}
                />
                <Button
                  width={'w-full tablet:w-fit'}
                  shadow={true}
                  isLoading={false}
                  disabled={false}
                  type={'submit'}
                  label={'Save'}
                  onClick={() => onSavePersonalData()}
                />
              </div>
            ) : (
              <div className="w-full flex mt-3">
                <Button
                  width={'w-fit'}
                  shadow={true}
                  isLoading={false}
                  disabled={false}
                  type={'submit'}
                  label={'Edit Mode'}
                  onClick={() => setEditMode(true)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Alert
        show={alertError?.show}
        type="warning"
        title={alertError?.title}
        message={alertError?.message}
        onConfirm={() => alertError?.onConfirm ? alertError.onConfirm() : {}}
      />

      <Alert
        show={alertSuccess?.show}
        type="success"
        title={alertSuccess?.title}
        message={alertSuccess?.message}
        onConfirm={() => alertSuccess?.onConfirm ? alertSuccess.onConfirm() : {}}
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

      <Loader show={profile?.isLoading || changeProfilePicture?.isLoading || updateProfile?.isLoading} />
    </div>
  )
}

export default Profile;