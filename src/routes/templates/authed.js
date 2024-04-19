import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { useOutsideClick } from "../../config/hook";

import { setSideMenu } from './../../redux/sideMenuSlice';
import { logOut } from './../../redux/authSlice';

import DefaultImage from './../../assets/images/defaul-img.png';

import Dash from './../../assets/svgs/icon-dash-admin.svg'

const AuthedTemplate = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sideMenu = useSelector(({ sideMenu }) => sideMenu);
  const auth = useSelector(({ auth }) => auth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const handleProfileRef = () => {
    setShowProfileMenu(false);
  }
  const profileRef = useOutsideClick(handleProfileRef);
  const menus = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: 'w-[20px] fa-solid fa-chart-line',
    },
    {
      title: 'User',
      path: '/user',
      icon: 'w-[20px] fa-solid fa-user',
      role: 'admin',
    },
    {
      title: 'Block Domain',
      path: '/block-domain',
      icon: 'w-[20px] fa-solid fa-globe',
      role: 'admin',
    },
    {
      title: 'Broadcast',
      path: '/broadcast',
      icon: 'w-[20px] fa-solid fa-tower-broadcast',
      role: 'admin',
    },
    {
      title: 'Attenders',
      path: '/attenders',
      icon: 'w-[20px] fa-solid fa-users',
    },
    {
      title: 'Scan Qr (Desktop)',
      path: '/scan-qr',
      icon: 'w-[20px] fa-solid fa-qrcode',
    },
    {
      title: 'Scan Qr (Mobile)',
      path: '/scan-qr-mobile',
      icon: 'w-[20px] fa-solid fa-qrcode',
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: 'w-[20px] fa-solid fa-gear',
      role: 'admin',
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
    if (path === currentUrl || currentUrl?.includes(path)) return 'bg-sky-400 text-sky-100';
    return '';
  }

  const renderListMenu = () => {
    return menus?.map((item, index) => {
      if (item?.role) {
        if (item?.role === auth?.data?.role) {
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
        } else {
          return null;
        }
      } else {
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
      }
    });
  }

  return (
    <div className="w-screen h-screen relative flex flex-col hide-scroll p-0 m-0"> 
      <div className={`${setSideMenuByStatus().width_top} h-[60px] bg-sky-400 flex flex-row ${showProfileMenu ? 'z-[60]' : 'z-[0]'}`}>
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
          <div className={`w-full ${setSideMenuByStatus().header_right_content} tablet:flex items-center justify-end pr-5 z-[1] relative`}>
            <div
              ref={profileRef}
              className="w-fit cursor-pointer text-white font-bold flex flex-row relative"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div className="w-[25px] h-[25px] rounded-full bg-red-500 mr-3 flex items-center justify-center">
                {auth?.data.profile?.image ? (
                  <img src={auth?.data.profile?.image} className="w-full h-full object-cover rounded-full" alt="profile"/>
                ) : (
                  <img src={DefaultImage} className="w-full h-full object-cover rounded-full" alt="profile"/>
                )}
              </div>
              {auth?.data?.profile?.name?.split(' ')[0]}
              <div className={`w-[250px] min-h-[50px] flex flex-col px-3 py-2 gap-2 font-bold text-xs text-sky-500 bg-white rounded shadow-lg absolute top-11 right-0 transition-all duration-300 ease-in-out border border-gray-300 ${showProfileMenu ? 'opacity-100 z-[60]' : 'opacity-0 z-[1]'}`}>
                <span
                  className="transition-all duration-500 ease-in-out hover:text-white hover:bg-sky-500 p-2 rounded cursor-pointer"
                  onClick={() => navigate('/profile')}
                ><i className="fa-solid fa-user w-[25px]"></i> Profile</span>
                <span
                  className="transition-all duration-500 ease-in-out hover:text-white hover:bg-sky-500 p-2 rounded cursor-pointer"
                  onClick={() => navigate('/profile/change-password')}
                ><i className="fa-solid fa-lock w-[25px]"></i> Change Password</span>
                <span
                  className="transition-all duration-500 ease-in-out hover:text-white hover:bg-sky-500 p-2 rounded cursor-pointer"
                  onClick={() => navigate('/profile/update-username')}
                ><i className="fa-solid fa-id-card w-[25px]"></i> Update Username</span>
                <span
                  className="transition-all duration-500 ease-in-out hover:text-white hover:bg-sky-500 p-2 rounded cursor-pointer"
                  onClick={() => {
                    onLogout()
                  }}
                ><i className="fa-solid fa-right-from-bracket w-[25px]"></i> Logout</span>
              </div>
            </div>
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
