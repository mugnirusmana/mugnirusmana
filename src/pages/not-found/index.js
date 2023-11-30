import React from "react";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';

const NotFound = () => {
  const auth = useSelector(({ auth }) => auth);

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
    <div className="w-full h-screen flex flex-col text-center items-center justify-center bg-light-pink text-dark-pink p-5">
      <span className="text-8xl font-bold mb-5">404</span>
      <span className="text-xl font-bold mb-10">We couldn't find the page...</span>
      <span className="text-md">Sorry, but the page are looking for was either not found or does not exist.</span>
      <span className="text-md mb-10">Try refreshing the page or clicking button bellow to go to Home{auth?.token ? ' or Dashboard' : ''}.</span>
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
