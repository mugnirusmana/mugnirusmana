import { useLocation, useNavigate } from "react-router";
import _ from 'lodash';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { defaultAttenderDetail, getAttenderDetail } from '../../redux/attenderDetailSlice';
import { defaultAttenderRemove, removeAttender } from "../../redux/attenderRemoveSlice";

import BreadCrumb from "../../components/breadcrumb";
import Alert from "../../components/alert";
import Loader from "../../components/loader";

const AttenderDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = _.last(location?.pathname?.split('/'));
  const [showLoader, setShowLoader] = useState(true);
  const [alertDetail, setAlertDetail] = useState({show: false, type: '', title: '', message: '', action: () => {}});
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const auth = useSelector(({ auth }) => auth);
  const attenderDetail = useSelector(({ attenderDetail }) => attenderDetail);
  const attenderRemove = useSelector(({ attenderRemove }) => attenderRemove);

  useEffect(() => {
    if (id) {
      dispatch(getAttenderDetail(id));
    } else {
      setAlertDetail({show: true, title: 'Get Detail', type: 'danger', message: 'Data not found', action: () => {navigate('/attenders')}});
    }
  }, []);

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError,
      errorMessage,
    } = attenderDetail;

    if (isLoading) {
      setShowLoader(true);
    }

    if(!isLoading && isSuccess) {
      setShowLoader(false);
      dispatch(defaultAttenderDetail());
    }

    if(!isLoading && isError) {
      setShowLoader(false);
      setAlertDetail({show: true, type: 'danger', title: 'Get Detail', message: errorMessage, action: () => {
        dispatch(defaultAttenderDetail());
        navigate('/attenders');
      }});
    }

  }, [attenderDetail]);

  useEffect(() => {
    let {
      isLoading,
      isError,
      isSuccess,
      errorMessage,
    } = attenderRemove;

    if (!isLoading && isSuccess) {
      setShowLoader(false);
      setShowDeleteAlert(false);
      setAlertDetail({show: true, type: 'success', title: 'Delete', message: `<span class="font-bold">${attenderDetail?.data?.name}</span>&nbsp;<span>comment successfully</span>&nbsp;<span class="font-bold">Deleted</span>`, action: () => {
        dispatch(defaultAttenderRemove());
        navigate('/attenders');
      }});
    }

    if (!isLoading && isError) {
      setShowLoader(false);
      setShowDeleteAlert(false);
      setAlertDetail({show: true, type: 'danger', title: 'Delete', message: errorMessage, action: () => {dispatch(defaultAttenderRemove())}});
    }
  }, [attenderRemove]);

  const customRenderAttendance = () => {
    if (attenderDetail?.data?.attendance) {
      if (parseInt(attenderDetail?.data?.attendance) === 1) {
        return <div className="w-fit flex items-center justify-center"><span className="text-xs bg-green-600 rounded p-1 text-white text-center whitespace-nowrap">Will Attend</span></div>
      } else {
        return <div className="w-fit flex items-center justify-center"><span className="text-xs bg-red-600 rounded p-1 text-white text-center whitespace-nowrap">Will Not Attend</span></div>
      }
    } else {
      return '-';
    }
  }

  const customRenderStatus = () => {
    if (attenderDetail?.data?.attendance) {
      if (parseInt(attenderDetail?.data?.status) === 2) {
        return <div className="w-fit flex items-center justify-center"><span className="text-xs bg-green-600 rounded p-1 text-white text-center whitespace-nowrap">Displayed</span></div>
      } else {
        return <div className="w-fit flex items-center justify-center"><span className="text-xs bg-red-600 rounded p-1 text-white text-center whitespace-nowrap">Not Displayed</span></div>
      }
    } else {
      return '-';
    }
  }

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden hide-scroll">
      <BreadCrumb
        title={'Attender Detail'}
        list={[
          {title: 'Attenders', path: '/attenders', active: false},
          {title: '/', path: '', active: true},
          {title: `Detail (${id})`, path: '', active: true},
        ]}
      />

      <div className="w-full h-fit tablet-md:h-full flex flex-col bg-white shadow-lg rounded pb-16 p-5 tablet:p-10 desktop:pb-5">
        <table className="w-full">
          <tbody>
            <tr className="border-b border-b-gray-400">
              <td width={'10%'} className="pb-5">Nama</td>
              <td width={'5%'} className="pb-5">:</td>
              <td className="pb-5">{attenderDetail?.data?.name??'-'}</td>
            </tr>
            <tr className="border-b border-b-gray-400">
              <td className="py-5">Email</td>
              <td className="py-5">:</td>
              <td className="py-5">{attenderDetail?.data?.email??'-'}</td>
            </tr>
            <tr className="border-b border-b-gray-400">
              <td className="py-5">Attendance</td>
              <td className="py-5">:</td>
              <td className="py-5">{customRenderAttendance()}</td>
            </tr>
            <tr className="border-b border-b-gray-400">
              <td className="py-5">Status</td>
              <td className="py-5">:</td>
              <td className="py-5">{customRenderStatus()}</td>
            </tr>
            <tr className="border-b border-b-gray-400">
              <td className="py-5">Comment</td>
              <td className="py-5">:</td>
              <td className="py-5">{attenderDetail?.data?.comment??'-'}</td>
            </tr>
            {auth?.data?.role === 'admin' ? (
              <tr className="border-b border-b-gray-400">
                <td className="py-5">Actions</td>
                <td className="py-5">:</td>
                <td className="py-5">
                  <div className="w-full flex flex-row gap-2">
                    {parseInt(attenderDetail?.data?.status) === 1 ? (
                      <span
                        className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-orange-400 text-white"
                        onClick={() => {}}
                      >
                        <i className="fa-solid fa-toggle-on"></i>
                      </span>
                    ): null}

                    {parseInt(attenderDetail?.data?.status) === 2 ? (
                      <span
                        className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-green-600 text-white"
                        onClick={() => {}}
                      >
                        <i className="fa-solid fa-toggle-off"></i>
                      </span>
                    ): null}

                    {parseInt(attenderDetail?.data?.status) === 1 ? (
                      <span
                        className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-red-600 text-white"
                        onClick={() => setShowDeleteAlert(true)}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </span>
                    ) : null}
                  </div>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>

      <Alert
        show={alertDetail?.show}
        type="danger"
        title="Get Detail"
        message={alertDetail?.message}
        showCancelButton={false}
        onConfirm={() => {
          setAlertDetail({
            ...alertDetail,
            show: false,
            type: '',
            title: '',
            message: ''
          });
          if (alertDetail?.action) {
            return alertDetail.action();
          } else {
            return {}
          }
        }}
      />

      <Alert
        show={showDeleteAlert}
        isLoading={attenderRemove?.isLoading}
        type="delete"
        title="Delete"
        message={`<span>Will you delete</span>&nbsp;<span class="font-bold">${attenderDetail?.data?.name}</span>&nbsp;<span>comment</span>?`}
        showCancelButton={true}
        onCancel={() => setShowDeleteAlert(false)}
        onConfirm={() => dispatch(removeAttender(id))}
      />

      <Loader show={showLoader} />
    </div>
  )
}

export default AttenderDetail;
