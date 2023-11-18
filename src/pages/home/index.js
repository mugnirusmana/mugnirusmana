import React, { useEffect, useRef, useState } from "react";
import _ from 'lodash';

import Loader from './components/loader';
import Envelope from "./components/envelope";
import Menu from "./components/menu";
import HomeSection from './components/home-section';
import AboutUsSection from './components/about-us-section';
import OurStorySection from './components/our-story-section';
import EventsSection from "./components/events-section";
import BridesmaidsGroomsmanSection from "./components/bridesmaids-groomsman-section";
import GallerySection from "./components/gallery-section";
import ReservationSection from "./components/reservation-section";
import CommentSection from './components/comment-section';
import EndSection from "./components/end-section";
import Footer from "./components/footer";

import { getWindowDimensions } from './../../helper';
import ScrollToTop from "./components/scrollToTop";

const Home = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [showLoader, setShowLoader] = useState(true);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [activeMenu, setActiveMenu] = useState('home');
  const [showMenu, setShowMenu] = useState(true);
  const [showToTop, setShowToTop] = useState(false);
  const homeRef = useRef();
  const aboutUsRef = useRef();
  const ourStoryRef = useRef();
  const eventsRef = useRef();
  const bridesmaidsGroomsmanRef = useRef();
  const galleryRef = useRef();
  const reservationRef = useRef();
  const endRef = useRef();

  const offSetHideMenuDesktopSize = 300;
  const desktopSize = 1025;
  const scrollRef = useRef();

  const listMenu = [
    {
      label: 'Home',
      slug: 'home',
      show: true,
      ref: homeRef,
      nextRef: aboutUsRef,
    },
    {
      label: 'About Us',
      slug: 'about_us',
      show: true,
      ref: aboutUsRef,
      nextRef: ourStoryRef,
    },
    {
      label: 'Our Story',
      slug: 'our_story',
      show: true,
      ref: ourStoryRef,
      nextRef: eventsRef,
    },
    {
      label: 'Events',
      slug: 'events',
      show: true,
      ref: eventsRef,
      nextRef: bridesmaidsGroomsmanRef,
    },
    {
      label: 'Bridesmaids & Groomsman',
      slug: 'bridesmaids_groomsman',
      show: true,
      ref: bridesmaidsGroomsmanRef,
      nextRef: galleryRef,
    },
    {
      label: 'Gallery',
      slug: 'gallery',
      show: true,
      ref: galleryRef,
      nextRef: reservationRef,
    },
    {
      label: 'Reservation',
      slug: 'reservation',
      show: true,
      ref: reservationRef,
      nextRef: endRef,
    },
    {
      label: 'End Section',
      slug: 'endsection',
      show: false,
      ref: endRef,
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
    if (windowDimensions.width <= (desktopSize-1)) {
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
      listMenu?.map((item) => {
        let currentRef = item?.ref
        let nextRef = item?.nextRef;
        if (nextRef) {
          if (position >= currentRef?.current?.offsetTop-0.5 && position < nextRef?.current?.offsetTop) {
            setActiveMenu(item?.slug);
          }
        } else {
          if (position >= currentRef?.current?.offsetTop-0.5) {
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
        if (windowDimensions.width <= 1024) setShowMenu(false);
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
        desktopSize={desktopSize}
        onClickMenu={(menu) => {
          setActiveMenu(menu);
        }}
        onShowMenu={(status) => setShowMenu(status)}
      />

      <ScrollToTop
        show={showToTop}
        onScrollToTop={() => {
          homeRef?.current?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      <HomeSection
        onClickDown={() => aboutUsRef?.current?.scrollIntoView({ behavior: 'smooth' })}
        ref={homeRef}
      />

      <AboutUsSection ref={aboutUsRef} />

      <OurStorySection ref={ourStoryRef} />

      <EventsSection ref={eventsRef} />

      <BridesmaidsGroomsmanSection ref={bridesmaidsGroomsmanRef} />

      <GallerySection ref={galleryRef} />

      <ReservationSection ref={reservationRef} onSubmit={(data) => {console.log('data ', data)}} />

      <CommentSection />

      <EndSection ref={endRef} />

      <Footer />

    </div>
  );
};

export default Home;
