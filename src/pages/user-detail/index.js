import { useLocation, useNavigate } from "react-router";
import _ from 'lodash';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import DefaultImage from './../../assets/images/defaul-img.png';

import BreadCrumb from "../../components/breadcrumb";
import Alert from "../../components/alert";
import Loader from "../../components/loader";

import { defaultUserDetail, getUserDetail } from './../../redux/userDetailSlice';

const UserDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = _.last(location?.pathname?.split('/'));
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [alertError, setAlertError] = useState({
    show: false,
    title: '',
    message: '',
    onConfirm: () => {}
  })
  const userDetail = useSelector(({ userDetail }) => userDetail);

  useEffect(() => {
    setFirstLoaded(true);
  }, []);

  useEffect(() => {
    if (firstLoaded) {
      dispatch(getUserDetail(id));
      setFirstLoaded(false);
    }
  }, [firstLoaded]);

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage
    } = userDetail;

    if (!isLoading && isSuccess) {
      dispatch(defaultUserDetail());
    }

    if (!isLoading && isError) {
      setAlertError({
        show: true,
        title: 'Get Detail',
        message: errorMessage,
        onConfirm: () => {
          setAlertError({
            show: false,
            title: '',
            message: '',
            onConfirm: () => {}
          })
          dispatch(defaultUserDetail());
          navigate('/user');
        }
      })
    }
  }, [userDetail]);

  const renderStatus = (status) => {
    if (parseInt(status) === 1) {
      return <div className="w-full flex"><span className="text-xs bg-blue-600 rounded p-1 text-white text-center whitespace-nowrap">Inactive</span></div>
    } else if (parseInt(status) === 2) {
      return <div className="w-full flex"><span className="text-xs bg-green-600 rounded p-1 text-white text-center whitespace-nowrap">Active</span></div>
    } else if (parseInt(status) === 3) {
      return <div className="w-full flex"><span className="text-xs bg-red-600 rounded p-1 text-white text-center whitespace-nowrap">Disabled</span></div>
    } else {
      return '-';
    }
  }

  const renderRole = (role) => {
    if (role === 'admin') {
      return <div className="w-full flex"><span className="text-xs bg-amber-600 rounded p-1 text-white text-center whitespace-nowrap">Admin</span></div>
    } else if (role === 'staff') {
      return <div className="w-full flex"><span className="text-xs bg-teal-600 rounded p-1 text-white text-center whitespace-nowrap">Staff</span></div>
    } else {
      return '-';
    }
  }

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden hide-scroll">
      <BreadCrumb
        title={'User Detail'}
        list={[
          {title: 'User', path: '/user', active: false},
          {title: '/', path: '', active: true},
          {title: `Detail (${id})`, path: '', active: true},
        ]}
      />

      <div className="w-full h-fit flex flex-col bg-white shadow-lg rounded pb-16 p-5 tablet:p-10 desktop:pb-5 text-xs tablet:text-md">
        <table className="w-full">
          <tbody>
            <tr className="border-b border-b-gray-400">
              <td width={'10%'} className="pr-5 py-5" colSpan={3}>
                <div className="w-full flex justify-center tablet:justify-start">
                  {userDetail?.data?.profile?.image ? (
                    <img src={userDetail?.data?.profile?.image} className="w-[200px] h-[200px] rounded-full border border-sky-900" alt="profile" />
                  ) : (
                    <img src={DefaultImage} className="w-[200px] h-[200px] rounded-full border border-sky-900" alt="profile" />
                  )}
                </div>
              </td>
            </tr>
            <tr className="border-b border-b-gray-400">
              <td width={'10%'} className="pr-5 py-5">Nama</td>
              <td width={'5%'} className="pr-5 py-5">:</td>
              <td className="pr-5 py-5">{userDetail?.data?.profile?.name??'-'}</td>
            </tr>
            <tr className="border-b border-b-gray-400">
              <td width={'10%'} className="pr-5 py-5">Email</td>
              <td width={'5%'} className="pr-5 py-5">:</td>
              <td className="pr-5 py-5">{userDetail?.data?.email??'-'}</td>
            </tr>
            <tr className="border-b border-b-gray-400">
              <td width={'10%'} className="pr-5 py-5">Username</td>
              <td width={'5%'} className="pr-5 py-5">:</td>
              <td className="pr-5 py-5">{userDetail?.data?.username??'-'}</td>
            </tr>
            <tr className="border-b border-b-gray-400">
              <td width={'10%'} className="pr-5 py-5">Phone</td>
              <td width={'5%'} className="pr-5 py-5">:</td>
              <td className="pr-5 py-5">{userDetail?.data?.profile?.phone??'-'}</td>
            </tr>
            <tr className="border-b border-b-gray-400">
              <td width={'10%'} className="pr-5 py-5">Status</td>
              <td width={'5%'} className="pr-5 py-5">:</td>
              <td className="pr-5 py-5">{renderStatus(userDetail?.data?.status)}</td>
            </tr>
            <tr className="border-b border-b-gray-400">
              <td width={'10%'} className="pr-5 py-5">Role</td>
              <td width={'5%'} className="pr-5 py-5">:</td>
              <td className="pr-5 py-5">{renderRole(userDetail?.data?.role)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Alert
        show={alertError?.show}
        type="warning"
        title={alertError?.title}
        message={alertError?.message}
        onConfirm={() => alertError?.onConfirm ? alertError.onConfirm() : {}}
      />

      <Loader show={userDetail?.isLoading} />
    </div>
  )
}

export default UserDetail;