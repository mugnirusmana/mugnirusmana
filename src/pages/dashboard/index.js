import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { getDashboard, defaultDashboard } from './../../redux/dashboardSlice';

import BreadCrumb from "../../components/breadcrumb";
import Alert from "../../components/alert";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dashboard = useSelector(({ dashboard }) => dashboard);
  const [alertError, setAlertError] = useState({show: false, message: ''});

  useEffect(() => {
    dispatch(getDashboard());
  }, []);

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage,
    } = dashboard;

    if(!isLoading && isSuccess) {
      dispatch(defaultDashboard());
    }

    if(!isLoading && isError) {
      setAlertError({show: true, message: errorMessage});
    }
  }, [dashboard]);

  return (
    <div className="w-full h-full flex flex-col">
      <BreadCrumb
        title={'Dashboard'}
        list={[
          {title: 'Dashboard', path: '', active: true},
        ]}
      />

      <div className="w-full h-full flex flex-col tablet:flex-row gap-5 pb-14 desktop:pb-0 text-xs tablet:text-md desktop:text-xl text-sky-900">
        <div className="w-full h-full flex flex-col gap-5 desktop:pb-0">
          <div className="w-full h-full bg-white rounded flex flex-col justify-center items-center tablet:gap-10 gap-5 shadow-md">
            <span className="font-bold">Total Participant</span>
            <div className="w-fit h-fit flex flex-row items-center gap-5 font-bold tablet:text-4xl desktop:text-6xl">
              <span>{dashboard?.isLoading ? '...' : dashboard?.data?.total_participants === 1 || dashboard?.data?.total_participants === 0 ? dashboard?.data?.total_participants : dashboard?.data?.total_participants > 1 ? `${dashboard?.data?.total_participants}+` : 0}</span>
              <i className="fa-solid fa-users"></i>
            </div>
          </div>
          <div
            className="w-full h-full bg-white rounded flex flex-col justify-center items-center tablet:gap-10 gap-5 shadow-md cursor-pointer"
            onClick={() => navigate('/attenders?attendance=will_not_attend')}
          >
            <span className="font-bold" >Total Will Not Attend</span>
            <div className="w-fit h-fit flex flex-row items-center gap-5 font-bold tablet:text-4xl desktop:text-6xl">
              <span>{dashboard?.isLoading ? '...' : dashboard?.data?.total_will_not_attend??0}</span>
              <i className="fa-solid fa-user-xmark"></i>
            </div>
          </div>
        </div>
        
        <div className="w-full h-full flex flex-col gap-5 desktop:pb-0">
          <div
            className="w-full h-full bg-white rounded flex flex-col justify-center items-center tablet:gap-10 gap-5 shadow-md cursor-pointer"
            onClick={() => navigate('/attenders?attendance=will_attend')}
          >
            <span
              className="font-bold"
            >Total Will Attend</span>
            <div className="w-fit h-fit flex flex-row items-center gap-5 font-bold tablet:text-4xl desktop:text-6xl">
              <span>{dashboard?.isLoading ? '...' : dashboard?.data?.total_will_attend??0}</span>
              <i className="fa-solid fa-user-check"></i>
            </div>
          </div>

          <div
            className="w-full h-full bg-white rounded flex flex-col justify-center items-center tablet:gap-10 gap-5 shadow-md cursor-pointer"
            onClick={() => navigate('/attenders?status=displayed')}
          >
            <span className="font-bold" >Total Displayed Comments</span>
            <div className="w-fit h-fit flex flex-row items-center gap-5 font-bold tablet:text-4xl desktop:text-6xl">
              <span>{dashboard?.isLoading ? '...' : dashboard?.data?.total_post_comments??0}</span>
              <i className="fa-solid fa-comment"></i>
            </div>
          </div>
        </div>

        <div className="w-full h-full flex flex-col gap-5 desktop:pb-0">
          <div
            className="w-full h-full bg-white rounded flex flex-col justify-center items-center tablet:gap-10 gap-5 shadow-md cursor-pointer"
            onClick={() => navigate('/attenders?scan=yes')}
          >
            <span
              className="font-bold"
            >Total Attender Has Scan</span>
            <div className="w-fit h-fit flex flex-row items-center gap-5 font-bold tablet:text-4xl desktop:text-6xl">
              <span>{dashboard?.isLoading ? '...' : dashboard?.data?.total_attender_scan??0}</span>
              <i className="fa-solid fa-qrcode"></i>
            </div>
          </div>

          <div
            className="w-full h-full bg-white rounded flex flex-col justify-center items-center tablet:gap-10 gap-5 shadow-md cursor-pointer"
            onClick={() => navigate('/attenders?scan=no')}
          >
            <span className="font-bold" >Total Attender Not Scan Yet</span>
            <div className="w-fit h-fit flex flex-row items-center gap-5 font-bold tablet:text-4xl desktop:text-6xl">
              <span>{dashboard?.isLoading ? '...' : dashboard?.data?.total_attender_not_scan??0}</span>
              <i className="fa-solid fa-qrcode"></i>
            </div>
          </div>
        </div>
      </div>

      <Alert
        show={alertError?.show}
        type="danger"
        title="Dashboard"
        message={alertError?.message}
        showCancelButton={false}
        onConfirm={() => {
          setAlertError({show: false, message: ''});
          dispatch(defaultDashboard());
        }}
      />
    </div>
  );
};

export default Dashboard;
