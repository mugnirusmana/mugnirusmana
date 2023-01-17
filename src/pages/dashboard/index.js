import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';

import {
  logOut
} from './../../redux/authSlice';

const Dashboard = () => {
  const disaptch = useDispatch();
  const auth = useSelector(({ auth }) => auth);

  const onLogout = () => {
    disaptch(logOut());
    //automatic redirect to login / next unauthed path
  }

  return (
    <div className="w-full h-screen flex flex-col text-center items-center justify-center">
      Dashboard
      <Link 
        to="/profile"
        className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mb-2"
      >Profile</Link>
      <button
        type="button"
        className="inline-block px-6 py-2 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        onClick={onLogout}
      >{auth.isLoading ? 'Loading' : 'Logout'}</button>
    </div>
  );
};

export default Dashboard;
