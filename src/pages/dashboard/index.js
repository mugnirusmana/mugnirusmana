import React from "react";
import { useNavigate } from "react-router";

import BreadCrumb from "../../components/breadcrumb";

const Dashboard = () => {
  const navigate = useNavigate();

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
          <div className="w-full h-full bg-white rounded flex flex-col justify-center items-center tablet:gap-10 gap-5 shadow-md drop-shadow-md">
            <span className="font-bold">Total Participant</span>
            <div className="w-fit h-fit flex flex-row items-center gap-5 font-bold tablet:text-4xl desktop:text-6xl">
              <span>100</span>
              <i class="fa-solid fa-users"></i>
            </div>
          </div>
          <div className="w-full h-full bg-white rounded flex flex-col justify-center items-center tablet:gap-10 gap-5 shadow-md drop-shadow-md">
            <span className="font-bold">Total Will Not Attend</span>
            <div className="w-fit h-fit flex flex-row items-center gap-5 font-bold tablet:text-4xl desktop:text-6xl">
              <span>100</span>
              <i class="fa-solid fa-user-xmark"></i>
            </div>
          </div>
          
        </div>
        <div className="w-full h-full flex flex-col gap-5 desktop:pb-0">
          <div className="w-full h-full bg-white rounded flex flex-col justify-center items-center tablet:gap-10 gap-5 shadow-md drop-shadow-md">
            <span className="font-bold">Total Will Attend</span>
            <div className="w-fit h-fit flex flex-row items-center gap-5 font-bold tablet:text-4xl desktop:text-6xl">
              <span>100</span>
              <i class="fa-solid fa-user"></i>
            </div>
          </div>
          <div className="w-full h-full bg-white rounded flex flex-col justify-center items-center tablet:gap-10 gap-5 shadow-md drop-shadow-md">
            <span
              className="font-bold cursor-pointer"
              onClick={() => navigate('/comments')}
            >Total Comments</span>
            <div className="w-fit h-fit flex flex-row items-center gap-5 font-bold tablet:text-4xl desktop:text-6xl">
              <span>100</span>
              <i class="fa-solid fa-comment"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
