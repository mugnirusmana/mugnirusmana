import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import { setSideMenu } from './../../redux/sideMenuSlice';
import { logOut } from './../../redux/authSlice';

import Dash from './../../assets/svgs/icon-dash-admin.svg'
import { useNavigate } from "react-router";

const AuthedTemplate = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sideMenu = useSelector(({ sideMenu }) => sideMenu);
  const menus = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'fa-solid fa-chart-line',
    },
    {
      title: 'Attenders',
      path: '/attenders',
      icon: 'fa-solid fa-users',
    },
    {
      title: 'Scan Qr',
      path: '/scan-qr',
      icon: 'fa-solid fa-qrcode',
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: 'fa-solid fa-gear',
    }
  ];

  const onLogout = () => {
    dispatch(logOut());
    //automatic redirect to login / next unauthed path
  }

  const setSideMenuByStatus = () => {
    let status = sideMenu?.show;
    let result = {
      width_top: '',
      width_bot: '',
      header_left: '',
      header_right: '',
      header_right_content: '',
      sidemenu_left: '',
      content: '',
    }
    if (!status) {
      result.width_top = 'w-[calc(100%_-_0px)]';
      result.width_bot = 'w-full';
      result.header_left = 'left-[-250px]';
      result.header_right = 'w-full left-[0]';
      result.header_right_content = 'flex';
      result.sidemenu_left = 'left-[-250px]';
      result.content = 'left-[0]';
    } else {
      result.width_top = 'w-full';
      result.width_bot = 'w-[calc(100%_-_250px)]';
      result.header_left = 'left-[0]';
      result.header_right = 'w-[calc(100%_-_250px)] left-[250px]';
      result.header_right_content = 'hidden';
      result.sidemenu_left = 'left-[0]';
      result.content = 'left-[250px]';
    }
    return result;
  }

  const setActiveMenu = (path) => {
    let currentUrl = window.location.pathname;
    if (path === currentUrl) return 'bg-sky-400 text-sky-100';
    return '';
  }

  const renderListMenu = () => {
    return menus?.map((item, index) => {
      return (
        <div
          key={index}
          className={`w-full cursor-pointer flex flex-row items-center gap-2 transition-all duration-300 ease-in-out ${setActiveMenu(item?.path)} text-sky-900 hover:bg-sky-400 hover:text-white p-2 rounded`}
          onClick={() => navigate(item?.path)}
        >
          <i className={item?.icon}></i>
          <span>{item?.title}</span>
        </div>
      )
    });
  }

  return (
    <div className="w-screen h-screen relative flex flex-col hide-scroll p-0 m-0"> 
      <div className={`${setSideMenuByStatus().width_top} h-[60px] bg-sky-400 flex flex-row`}>
        <div className={`w-[250px] h-[56px] fixed desktop:absolute ${setSideMenuByStatus().header_left} top-0 transition-all duration-300 ease-in-out flex flex-row items-center justify-center text-white font-bold text-xl`}>SaveMe</div>
        <div className={`h-[56px] fixed desktop:absolute ${setSideMenuByStatus().header_right} top-0 transition-all duration-300 ease-in-out flex flex-row`}>
          <div
            className="w-[50px] h-full flex flex-col items-center justify-center ml-5 gap-1 cursor-pointer z-[10]"
            onClick={() => dispatch(setSideMenu(!sideMenu?.show))}
          >
            <img src={Dash} className="w-full" alt="dash"/>
            <img src={Dash} className="w-full" alt="dash"/>
            <img src={Dash} className="w-full" alt="dash"/>
          </div>
          <div className={`w-full ${setSideMenuByStatus().header_right_content} tablet:flex items-center justify-end pr-5 z-[1]`}>
            <span
              className="cursor-pointer text-white font-bold"
              onClick={onLogout}
            >Logout</span>
          </div>
        </div>
      </div>
      <div className={`${setSideMenuByStatus().width_bot} h-full flex flex-row relative`}>
        <div className={`w-[250px] h-full transition-all duration-300 ease-in-out fixed desktop:absolute ${setSideMenuByStatus().sidemenu_left} bg-white flex flex-col px-2 py-5 gap-3`}>
          {renderListMenu()}
        </div>
        <div className={`w-full h-full transition-all duration-300 ease-in-out fixed desktop:absolute ${setSideMenuByStatus().content} bg-sky-100 p-5`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthedTemplate;
