import { useEffect, useState } from "react";

import IconDash from './../../../assets/svgs/icon-dash.svg';

const Menu = (props) => {
  let {
    active,
    show,
    windowDimensions,
    offSetHideMenuDesktopSize,
    desktopSize,
    onClickMenu,
    onShowMenu,
    listMenu
  } = props;
  let intervalMenu = null;
  const [triggerShowMenu, setTriggerShowMenu] = useState(true);

  useEffect(() => {
    if (!triggerShowMenu) {
      intervalMenu = setTimeout(() => {
        setTriggerShowMenu(true);
        clearInterval(intervalMenu);
      }, 300);
    } else {
      clearInterval(intervalMenu);
    }
  }, [show]);

  const setActiveMenu = (selected) => {
    if (active === selected) {
      return 'text-dark-pink border-b-dark-pink';
    } else {
      return 'text-medium-pink desktop:text-[#E9A3D4] border-b-transparent';
    }
  }

  const setShowMenu = () => {
    if (!show) {
      return {
        header: 'left-[-220px] tablet:left-[-420px] desktop:left-[0px] top-[0px] desktop:top-[-120px]',
        breadcumTop: 'top-[1rem] left-[0.3rem] rotate-[45deg]',
        breadcumBottom: 'bottom-[1.05rem] left-[0.3rem] rotate-[-45deg]',
      }
    } else {
      return {
        header: 'left-[0px] tablet:left-[0px] desktop:left-[0px] top-[0px] desktop:top-[0px]',
        breadcumTop: 'top-2 left-1 rotate-[0deg]',
        breadcumBottom: 'bottom-2 left-1 rotate-[0deg]',
      }
    }
  }

  const renderListMenu = () => {
    return listMenu?.map((item, index) => {
      return (
        <span
          key={index}
          className={`w-fit h-fit cursor-pointer font-bold transition-all duration-500 ease-in-out whitespace-nowrap border-b-2 ${setActiveMenu(item?.slug)} hover:text-dark-pink hover:border-b-dark-pink`}
          onClick={() => {
            if (onClickMenu) {
              if(item?.ref?.current) item?.ref?.current?.scrollIntoView({ behavior: 'smooth' })
              return onClickMenu(item?.slug);
            } else {
              return {};
            }
          }}
        >{item?.label}</span>
      )
    });
  }

  return (
    <div
      className={`w-[220px] transition-all duration-300 ease-in-out tablet:w-[420px] desktop:w-screen h-full desktop:h-[150px] flex flex-col desktop:flex-row items-start justify-start desktop:items-center desktop:justify-center backdrop-blur-lg gap-5 desktop:gap-10 text-sm tablet:text-lg px-4 py-6 fixed shadow-md bg-white desktop:bg-transparent border-r border-r-dark-pink desktop:border-r-transparent z-[70] ${setShowMenu().header}`}
      onMouseEnter={() => {
        if (onShowMenu && triggerShowMenu && !show) {
          let isShow = windowDimensions?.width >= desktopSize ? !show : true;
          setTriggerShowMenu(false);
          return onShowMenu(isShow);
        } else {
          return {};
        }
      }}
      onMouseLeave={() => {
        if (onShowMenu && triggerShowMenu && windowDimensions?.position >= offSetHideMenuDesktopSize) {
          setTriggerShowMenu(false);
          let isShow = windowDimensions?.width >= desktopSize ? !show : false;
          return onShowMenu(isShow);
        } else {
          return {};
        }
      }}
    >
      <div
        className={`desktop:hidden absolute transition-all duration-300 ease-in-out top-5 -right-[40px] w-[40px] h-[40px] rounded-tr-sm rounded-br-sm bg-white border-t border-r border-b border-t-dark-pink border-r-dark-pink border-b-dark-pink flex items-center justify-center cursor-pointer`}
        onClick={() => {
          if (onShowMenu) {
            return onShowMenu(!show);
          } else {
            return {};
          }
        }}
      >
        <div className="w-full h-full flex flex-col gap-2 p-2 relative">
          <img src={IconDash} className={`absolute w-[75%] transition-all duration-300 ease-in-out ${setShowMenu().breadcumTop}`} alt="icon-dash"/>
          <img src={IconDash} className={`absolute w-[75%] transition-all duration-300 ease-in-out ${setShowMenu().breadcumBottom}`} alt="icon-dash"/>
        </div>
      </div>
      {renderListMenu()}
    </div>
  )
}

export default Menu;