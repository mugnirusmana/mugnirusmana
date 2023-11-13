import React, { useEffect, useState } from "react";
import Loader from './components/loader';
import Envelope from "./components/envelope";
import Menu from "./components/menu";
import { getWindowDimensions } from './../../helper';

const Home = () => {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  const [showLoader, setShowLoader] = useState(true);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [activeMenu, setActiveMenu] = useState('home');
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    const loaderTimeout = setTimeout(() => {
      setShowLoader(false);
      setShowEnvelope(true);
      clearTimeout(loaderTimeout);
    }, 5000);

    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(loaderTimeout);
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    if (windowDimensions.width <= 1023) {
      setShowMenu(false);
    }
  }, [windowDimensions]);

  return (
    <div className="w-full min-h-screen h-screen relative">
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
        onClickMenu={(menu) => setActiveMenu(menu)}
        onShowMenu={(status) => setShowMenu(status)}
      />
    </div>
  );
};

export default Home;
