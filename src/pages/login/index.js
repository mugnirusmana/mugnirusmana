import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  signIn,
  defaultSignIn
} from './../../redux/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth);

  const [field, setField] = useState({
    username: '',
    password: ''
  });

  const onSubmit = () => {
    let {
      username,
      password
    } = field;
    if (!username || !password) {
      alert('Please fill all the fields');
    } else {
      dispatch(signIn(field));
    }
  }

  useEffect(() => {
    dispatch(defaultSignIn());

    return () => {
      dispatch(defaultSignIn());
    }
  }, []);

  useEffect(() => {
    let {
      isLoading,
      isError,
      isSuccess,
      errorMessage
    } = auth;

    if (!isLoading && isError) {
      alert(errorMessage??'Something went wrong!');
      dispatch(defaultSignIn());
    }

    if (!isLoading && isSuccess) {
      dispatch(defaultSignIn());
      //automatic redirect to dashboard / next authed path
    }
  }, [auth]);

  return (
    <div className="gradient-form bg-gray-200 h-screen">
      <div className="container py-12 px-6 h-full">
        <div className="ml-40 flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
          <div className="xl:w-10/12">
            <div className="block bg-white shadow-lg rounded-lg">
              <div className="lg:flex lg:flex-wrap g-0">
                <div className="lg:w-full px-4 md:px-0 flex items-center justify-center">
                  <div className="w-6/12 md:p-12 md:mx-6">
                    <div className="text-center">
                      <Link to={'/'}>
                        <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">LOGIN FORM</h4>
                      </Link>
                    </div>
                    <div>
                      <p className="mb-4 text-center">Please login to your account</p>
                      <div className="mb-4">
                        <input
                          type="text"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Username"
                          disabled={auth?.isLoading}
                          value={field?.username}
                          onChange={(val) => {
                            setField({
                              ...field,
                              username: val.target.value
                            })
                          }}
                        />
                      </div>
                      <div className="mb-4">
                        <input
                          type="password"
                          className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                          placeholder="Password"
                          disabled={auth?.isLoading}
                          value={field?.password}
                          onChange={(val) => {
                            setField({
                              ...field,
                              password: val.target.value
                            })
                          }}
                        />
                      </div>
                      <div className="text-center pt-1 mb-12 pb-1">
                        <button
                          className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3 bg-gradient-to-r from-[#ee7724] to-[#b44593]"
                          type="button"
                          data-mdb-ripple="true"
                          data-mdb-ripple-color="light"
                          onClick={onSubmit}
                        >
                          {auth?.isLoading ? `Loading` : 'Log In'}
                        </button>
                        <Link className="text-gray-500" to="/forgot-password">Forgot password?</Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none bg-gradient-to-r from-[#ee7724] to-[#b44593]">
                  <div className="text-white px-4 py-6 md:p-12 md:mx-6">
                    <h4 className="text-xl font-semibold mb-6">We are more than just a company</h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                      consequat.
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
