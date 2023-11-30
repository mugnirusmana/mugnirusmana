import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';

import { defaultReservation, submitReservation } from './../../redux/reservationSlice';

import ImageModal from "./components/image-modal";
import Loader from './components/loader';
import Envelope from "./components/envelope";
import Alert from "./components/alert";
import Menu from "./components/menu";
import ScrollToTop from "./components/scrollToTop";
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

const Home = () => {
  const dispatch = useDispatch();
  const reservationSlice = useSelector(({ reservation }) => reservation);
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [showLoader, setShowLoader] = useState(true);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [activeMenu, setActiveMenu] = useState('home');
  const [showMenu, setShowMenu] = useState(true);
  const [showToTop, setShowToTop] = useState(false);
  const [imageModal, setImageModal] = useState({
    show: false,
    data: null,
  });
  const [showCopyText, setShowCopyText] = useState(false);
  const [showNotifReservation, setShowNotifReservation] = useState({
    show: false,
    title: '',
    type: '',
    message: '',
    confirmButtonText: '',
    action: () => {}
  })
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [dataForm, setDataForm] = useState(null);
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

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage,
      errorCode,
      data,
    } = reservationSlice;

    if (!isLoading && isSuccess) {
      setShowSubmitForm(false);
      setShowNotifReservation({
        show: true,
        title: 'Submit Form',
        type: 'success',
        message: '<div class="w-full text-center flex flex-col items-center justify-center"><span class="text-md font-bold">Thanks for submitting the form</span><br class="hidden" /><span class="text-xs">We have send you a QR Code URL to your email</span><br class="hidden" /><span class="text-xs">and copy this QR Code URL</span><br class="hidden" /><span class="text-xs">You can use it for your attendance</span><br class="hidden" /><span class="text-xs">or you can manual sign by sign a signature book</span></div>',
        confirmButtonText: 'Copy QR Url & Close',
        action: () => {
          navigator.clipboard.writeText(data?.link_qr);
          setShowNotifReservation({
            ...showNotifReservation,
            show: false,
          });
          setTimeout(() => {
            setShowNotifReservation({
              show: false,
              title: '',
              type: '',
              message: '',
              confirmButtonText: '',
              action: () => {}
            });
            dispatch(defaultReservation());
            setShowCopyText(true);
          }, 500);
        }
      })
    }

    if (!isLoading && isError) {
      setShowSubmitForm(false);
      
      if (errorCode === 400) {
        let resultErrorList = renderListError();
        setShowNotifReservation({
          show: true,
          title: 'Submit Form',
          type: 'warning',
          message: `<span class="text-center flex flex-col w-full items-center justify-center"><span class="text-md font-bold">Something went wrong with the data you send${resultErrorList?':':''}</span>${resultErrorList ? `<br class="hidden" />${resultErrorList}` : ''}</span>`,
          confirmButtonText: 'Confirm',
          action: () => {
            setShowNotifReservation({
              ...showNotifReservation,
              show: false,
            });
            setTimeout(() => {
              setShowNotifReservation({
                show: false,
                title: '',
                type: '',
                message: '',
                confirmButtonText: '',
                action: () => {}
              });
              dispatch(defaultReservation());
            }, 1000)
          }
        })
      } else {
        setShowNotifReservation({
          show: true,
          title: 'Submit Form',
          type: 'warning',
          message: `<span class="text-center">${errorMessage}</span>`,
          confirmButtonText: 'Confirm',
          action: () => {
            setShowNotifReservation({
              ...showNotifReservation,
              show: false,
            });
            setTimeout(() => {
              setShowNotifReservation({
                show: false,
                title: '',
                type: '',
                message: '',
                confirmButtonText: '',
                action: () => {}
              });
              dispatch(defaultReservation());
            }, 1000)
          }
        })
      }

    }
  
  }, [reservationSlice]);

  const renderListError = () => {
    let errorField = '';
    let { data } = reservationSlice;
    if (data?.errors && data?.errors?.length > 0) {
      let totalError = data?.errors?.length;
      data?.errors?.map((item, index) => {
        if ((index+1) >= totalError) {
          errorField = `${errorField}<span class="text-xs">${item?.message}</span>`;
        } else {
          errorField = `${errorField}<span class="text-xs">${item?.message}</span><br class="hidden" />`;
        }
        return item;
      });
    }
    return errorField;
  }

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

  const submitReservationForm = () => {
    if (!reservationSlice?.isLoading) {
      dispatch(submitReservation(dataForm));
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
      <ImageModal
        show={imageModal?.show}
        data={imageModal?.data}
        onClose={() => setImageModal({show: false, data: null})}
        windowDimensions={windowDimensions}
      />

      <Loader
        show={showLoader}
        windowDimensions={windowDimensions}
      />

      <Envelope
        show={showEnvelope}
        windowDimensions={windowDimensions}
      />

      <Alert
        show={showSubmitForm}
        isLoading={reservationSlice?.isLoading}
        title={'Submit Form'}
        message={'<span className="w-full text-center">Are you sure about the data you are going to submit?</span>'}
        type={'question'}
        showCancelButton={true}
        cancelButtonText={"No, I'll check again"}
        cancelButtonAction={() => {
          setDataForm(null);
          setShowSubmitForm(false);
        }}
        confirmButtonText={'Yes, I am'}
        confirmButtonAction={submitReservationForm}
        windowDimensions={windowDimensions}
      />

      <Alert
        show={showNotifReservation?.show}
        title={showNotifReservation?.title}
        message={showNotifReservation?.message}
        type={showNotifReservation?.type}
        showCancelButton={false}
        confirmButtonText={showNotifReservation?.confirmButtonText}
        confirmButtonAction={() => showNotifReservation?.action ? showNotifReservation?.action() : {}}
        windowDimensions={windowDimensions}
      />

      <Alert
        show={showCopyText}
        title={'Copy QR URL'}
        message={'<div className="w-full flex items-center justify-center text-center">Successfully copy QR Code URL</div>'}
        type={'success'}
        showCancelButton={false}
        confirmButtonAction={() => setShowCopyText(false)}
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
        onShowModalImage={(data) => setImageModal({show: true, data: data})}
      />

      <AboutUsSection ref={aboutUsRef} onShowModalImage={(data) => setImageModal({show: true, data: data})} />

      <OurStorySection ref={ourStoryRef} onShowModalImage={(data) => setImageModal({show: true, data: data})} />

      <EventsSection ref={eventsRef} />

      <BridesmaidsGroomsmanSection ref={bridesmaidsGroomsmanRef} onShowModalImage={(data) => setImageModal({show: true, data: data})} />

      <GallerySection ref={galleryRef} onShowModalImage={(data) => setImageModal({show: true, data: data})} />

      <ReservationSection ref={reservationRef} onSubmit={(data) => {
        if (!data?.isError) {
          setDataForm(data?.data);
          setShowSubmitForm(true);
        }
      }} />

      <CommentSection />

      <EndSection ref={endRef} />

      <Footer />

    </div>
  );
};

export default Home;
