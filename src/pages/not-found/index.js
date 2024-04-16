import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const NotFound = () => {
  const auth = useSelector(({ auth }) => auth);
  const [opacity, setOpacity] = useState('opacity-0');

  useEffect(() => {
    const timeoutOpacity = setTimeout(() => {
      setOpacity('opacity-100');
    }, 1500);

    return () => {
      clearTimeout(timeoutOpacity);
    }
  }, [])

  const renderDashboardButton = () => {
    if (auth?.token) {
      return (
        <Link
          to="/dashboard"
          className="w-fit h-fit px-4 py-2 border border-dark-pink rounded-md hover:bg-dark-pink hover:text-light-pink font-bold"
        >DASHBOARD</Link>
      )
    } else {
      return null;
    }
  }

  return (
    <div className="w-full h-screen flex flex-col text-center items-center justify-center bg-light-pink text-dark-pink p-5 font-anek-telugu">
      <div className={`text-8xl transition-all duration-500 ease-in-out font-bold mb-5 flex flex-row ${opacity}`}><span className="animate-[bounce_1500ms_ease-in-out_infinite_500ms]">4</span><span className="animate-[bounce_1500ms_ease-in-out_infinite_1000ms]">0</span><span className="animate-[bounce_1500ms_ease-in-out_infinite_1500ms]">4</span></div>
      <span className="text-xl font-bold mb-10">We couldn't find the page...</span>
      <span className="text-base">Sorry, but the page is looking for was either not found or does not exist.</span>
      <span className="text-base mb-10">Try refreshing the page or clicking button bellow to go to Home{auth?.token ? ' or Dashboard' : ''}.</span>
      <div className="w-fit h-fit flex flex-row gap-5">
        <Link
          to="/"
          className="w-fit h-fit px-4 py-2 border border-dark-pink rounded-md hover:bg-dark-pink hover:text-light-pink font-bold"
        >HOME</Link>
        {renderDashboardButton()}
      </div>
    </div>
  );
};

export default NotFound;
