import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Tooltip } from "@material-tailwind/react";
import _ from 'lodash';

import { defaultBroadcastDetail, getBroadcastDetail } from './../../redux/broadcastDetailSlice';

import BreadCrumb from "../../components/breadcrumb";
import Alert from "../../components/alert";
import Loader from "../../components/loader";

const BroadcastDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const id = _.last(location?.pathname?.split('/'));
  const broadcastDetail = useSelector(({ broadcastDetail }) => broadcastDetail);
  const [firstLoaded, setFirstLoaded] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    setFirstLoaded(true);
  }, []);

  useEffect(() => {
    if (firstLoaded) {
      getData();
      setFirstLoaded(false);
    }
  }, [firstLoaded]);

  useEffect(() => {
    let {
      isLoading,
      isSuccess,
      isError
    } = broadcastDetail;

    if (!isLoading && isSuccess) {
      dispatch(defaultBroadcastDetail());
    }

    if (!isLoading && isError) {
      setShowError(true);
    }
  }, [broadcastDetail]);

  const getData = () => {
    dispatch(getBroadcastDetail(id))
  }

  const renderWhatsappStatus = () => {
    if(broadcastDetail?.data?.whatsapp) {
      if (parseInt(broadcastDetail?.data?.status_whatsapp) === 2) {
        return <div className="w-fit flex items-center justify-center"><span className="text-xs bg-green-600 rounded p-1 text-white text-center whitespace-nowrap">Sent</span></div>
      } else {
        return <div className="w-fit flex items-center justify-center"><span className="text-xs bg-red-600 rounded p-1 text-white text-center whitespace-nowrap">Not Sent Yet</span></div>
      }
    } else {
      return <div className="w-fit flex items-center justify-center"><span className="text-xs rounded text-center whitespace-nowrap">-</span></div>;
    }
  }

  const renderEmailStatus = () => {
    if(broadcastDetail?.data?.email) {
      if (parseInt(broadcastDetail?.data?.status_email) === 2) {
        return <div className="w-fit flex items-center justify-center"><span className="text-xs bg-green-600 rounded p-1 text-white text-center whitespace-nowrap">Sent</span></div>
      } else {
        return <div className="w-fit flex items-center justify-center"><span className="text-xs bg-red-600 rounded p-1 text-white text-center whitespace-nowrap">Not Sent Yet</span></div>
      }
    } else {
      return <div className="w-fit flex items-center justify-center"><span className="text-xs rounded text-center whitespace-nowrap">-</span></div>;
    }
  }

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden hide-scroll">
      <BreadCrumb
        title={'Broadcast Detail'}
        list={[
          {title: 'Broadcast', path: '/broadcast', active: false},
          {title: '/', path: '', active: true},
          {title: `Detail (${id})`, path: '', active: true},
        ]}
      />

      <div className="w-full h-fit flex flex-col bg-white shadow-lg rounded pb-16 p-5 tablet:p-10 desktop:pb-5 text-xs tablet:text-base">
        <table className="w-full">
          <tbody>
            <tr className="border-b border-b-gray-400">
              <td width={'10%'} className="pr-5 py-5">Nama</td>
              <td width={'5%'} className="pr-5 py-5">:</td>
              <td className="pr-5 py-5">{broadcastDetail?.data?.name??'-'}</td>
            </tr>
            <tr className="border-b border-b-gray-400">
              <td width={'10%'} className="pr-5 py-5">Whatsapp</td>
              <td width={'5%'} className="pr-5 py-5">:</td>
              <td className="pr-5 py-5">{broadcastDetail?.data?.whatsapp??'-'}</td>
            </tr>
            <tr className="border-b border-b-gray-400">
              <td width={'10%'} className="pr-5 py-5">Email</td>
              <td width={'5%'} className="pr-5 py-5">:</td>
              <td className="pr-5 py-5">{broadcastDetail?.data?.email??'-'}</td>
            </tr>
            <tr className="border-b border-b-gray-400">
              <td width={'10%'} className="pr-5 py-5">Whatsapp Status</td>
              <td width={'5%'} className="pr-5 py-5">:</td>
              <td className="pr-5 py-5">{renderWhatsappStatus()}</td>
            </tr>
            <tr className="border-b border-b-gray-400">
              <td width={'10%'} className="pr-5 py-5">Email Status</td>
              <td width={'5%'} className="pr-5 py-5">:</td>
              <td className="pr-5 py-5">{renderEmailStatus()}</td>
            </tr>
            <tr>
              <td className="pr-5 py-5" colSpan={3}>
                <Tooltip
                  className="rounded px-2 py-1 bg-white text-sky-900 border border-sky-900 text-xs font-bold shadow-lg"
                  content={"Edit"}
                  placement="top"
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                >
                  <span
                    className="w-fit h-fit px-2 py-1 rounded cursor-pointer bg-orange-600 text-white border border-orange-600 font-bold text-base"
                    onClick={() => navigate(`/broadcast/edit/${id}`)}
                  >
                    <span>Edit</span>
                    <i className="fa-solid fa-pen-to-square ml-2"></i>
                  </span>
                </Tooltip>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Alert
        isLoading={false}
        show={showError}
        type={'warning'}
        title={'Get Detail'}
        message={broadcastDetail?.errorMessage}
        showCancelButton={false}
        onConfirm={() => {
          setShowError(false);
          dispatch(defaultBroadcastDetail());
        }}
      />

      <Loader show={broadcastDetail?.isLoading} />
    </div>
  )
}

export default BroadcastDetail;