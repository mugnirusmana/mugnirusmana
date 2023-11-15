import React, { useEffect, useRef, useState } from "react";
import _ from 'lodash';

import Loader from './components/loader';
import Envelope from "./components/envelope";
import Menu from "./components/menu";
import HomeSection from './components/home-section';
import AboutUsSection from './components/about-us-section';

import { getWindowDimensions } from './../../helper';
import ScrollToTop from "./components/scrollToTop";

const Home = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [showLoader, setShowLoader] = useState(true);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [activeMenu, setActiveMenu] = useState('home');
  const [showMenu, setShowMenu] = useState(true);
  const [showToTop, setShowToTop] = useState(false);
  const [homeRef, setHomeRef] = useState(null);
  const [aboutUsRef, setAboutUsRef] = useState(null);

  const offSetHideMenuDesktopSize = 300;
  const scrollRef = useRef();

  const listMenu = [
    {
      label: 'Home',
      slug: 'home',
      ref: homeRef,
      nextRef: aboutUsRef,
    },
    {
      label: 'About Us',
      slug: 'about_us',
      ref: aboutUsRef,
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

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
      setShowEnvelope(true);
      clearTimeout(loaderTimeout);
    }, 5000);

    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(loaderTimeout);
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (windowDimensions.width <= 1024) {
      setShowMenu(false); //for tablet & mobile size
    } else {
      if (windowDimensions.position >= offSetHideMenuDesktopSize) {
        setShowMenu(false); //for desktop size
      } else {
        setShowMenu(true);
      }
    }

    if (windowDimensions.position > offSetHideMenuDesktopSize) {
      setShowToTop(true);
    } else {
      setShowToTop(false);
    }

    updateActiveMenu();
  }, [windowDimensions]);

  const updateActiveMenu = () => {
    let { position } = windowDimensions;
    
    if (homeRef?.current) {
      listMenu?.map((item, index) => {
        let currentRef = item?.ref
        let nextRef = item?.nextRef;
        if (nextRef) {
          if (position >= currentRef?.current?.offsetTop && position < nextRef?.current?.offsetTop) {
            setActiveMenu(item?.slug);
          }
        } else {
          if (position === currentRef?.current?.offsetTop) {
            setActiveMenu(item?.slug);
          }
        }
        return item;
      })
    }
  }

  return (
    <div
      ref={scrollRef}
      className="w-full min-h-screen h-screen relative scroll-smooth overflow-x-hidden hide-scroll"
      onScroll={_.debounce(() => {
        setWindowDimensions({
          ...windowDimensions,
          position: scrollRef?.current?.scrollTop,
        });
      }, 300)}
    >
      <Loader
        show={showLoader}
        windowDimensions={windowDimensions}
      />

      <Envelope
        show={showEnvelope}
        windowDimensions={windowDimensions}
      />

      <Menu
        active={activeMenu}
        show={showMenu}
        windowDimensions={windowDimensions}
        listMenu={listMenu}
        offSetHideMenuDesktopSize={offSetHideMenuDesktopSize}
        onClickMenu={(menu) => setActiveMenu(menu)}
        onShowMenu={(status) => setShowMenu(status)}
      />

      <ScrollToTop
        show={showToTop}
        onScrollToTop={() => homeRef?.current?.scrollIntoView({ behavior: 'smooth' })}
      />

      <HomeSection
        onClickDown={() => aboutUsRef?.current?.scrollIntoView({ behavior: 'smooth' })}
        getRef={(ref) => setHomeRef(ref)}
      />

      <AboutUsSection
        getRef={(ref) => setAboutUsRef(ref)}
      />

    </div>
  );
};

export default Home;
