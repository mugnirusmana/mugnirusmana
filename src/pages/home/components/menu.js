import { useEffect, useState } from "react";

import IconDash from './../../../assets/svgs/icon-dash.svg';

const Menu = (props) => {
  let {
    active,
    show,
    onClickMenu,
    onShowMenu,
  } = props;
  const menus = [
    {
      label: 'Home',
      slug: 'home'
    },
    {
      label: 'About Us',
      slug: 'about_us'
    },
    {
      label: 'Our Story',
      slug: 'our_story'
    },
    {
      label: 'Events',
      slug: 'events'
    },
    {
      label: 'Bridesmaids & Groomsman',
      slug: 'bridesmaids_groomsman'
    },
    {
      label: 'Gallery',
      slug: 'gallery'
    },
    {
      label: 'Reservation',
      slug: 'reservation'
    }
  ];
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
      return 'text-medium-pink border-b-transparent';
    }
  }

  const setShowMenu = () => {
    if (!show) {
      return {
        header: 'left-[-220px] tablet:left-[-420px] laptop:left-[0px] top-[0px] laptop:top-[-140px]',
        breadcumTop: 'top-[1rem] left-[0.2rem] rotate-[45deg]',
        breadcumBottom: 'bottom-[1.05rem] left-[0.2rem] rotate-[-45deg]',
      }
    } else {
      return {
        header: 'left-[0px] tablet:left-[0px] laptop:left-[0px] top-[0px] laptop:top-[0px]',
        breadcumTop: 'top-2 left-1 rotate-[0deg]',
        breadcumBottom: 'bottom-2 left-1 rotate-[0deg]',
      }
    }
  }

  const renderListMenu = () => {
    return menus?.map((item, index) => {
      return (
        <span
          key={index}
          className={`w-fit h-fit cursor-pointer font-bold transition-all duration-200 ease-in-out whitespace-nowrap border-b-2 ${setActiveMenu(item?.slug)} hover:text-dark-pink hover:border-b-dark-pink`}
          onClick={() => {
            if (onClickMenu) {
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
      className={`w-[220px] transition-all duration-300 ease-in-out tablet:w-[420px] laptop:w-screen h-full laptop:h-[150px] flex flex-col laptop:flex-row items-start justify-start laptop:items-center laptop:justify-center backdrop-blur-lg gap-5 laptop:gap-10 text-sm tablet:text-lg px-4 py-6 fixed drop-shadow-md bg-white laptop:bg-transparent border-r border-r-dark-pink laptop:border-r-transparent ${setShowMenu().header}`}
      onMouseEnter={() => {
        if (onShowMenu && triggerShowMenu && !show) {
          setTriggerShowMenu(false);
          return onShowMenu(!show);
        } else {
          return {}
        }
      }}
      onMouseLeave={() => {
        if (onShowMenu) {
          if(triggerShowMenu) {
            setTriggerShowMenu(false);
            return onShowMenu(!show);
          } else {
            return {}
          }
        } else {
          return {}
        }
      }}
    >
      <div
        className={`laptop:hidden absolute transition-all duration-300 ease-in-out top-5 -right-[40px] w-[40px] h-[40px] rounded-tr-sm rounded-br-sm bg-white border-t border-r border-b border-t-dark-pink border-r-dark-pink border-b-dark-pink flex items-center justify-center cursor-pointer`}
        onClick={() => {
          if (onShowMenu) {
            return onShowMenu(!show);
          } else {
            return {}
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