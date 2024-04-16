import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import BreadCrumb from "../../components/breadcrumb";
import DefaultImg from './../../assets/images/defaul-img.png';

import CheckBox from './../../components/checkbox';
import SelectOption from './../../components/select-option';
import Alert from "./../../components/alert";

import { defaultSettingDetail, getDetail } from "../../redux/settingDetailSlice";
import { defaultSettingSave, submitSetting } from "../../redux/settingSaveSlice";

const Settings = () => {
  const dispatch = useDispatch();
  let timeoutDetail = null;
  let timeoutSave = null;
  const settingDetail = useSelector(({ settingDetail }) => settingDetail);
  const settingSave = useSelector(({ settingSave }) => settingSave);
  const [notifConfirm, setNotifConfirm] = useState(false);
  const [showNotif, setShowNotif] = useState({
    show: false,
    type: "",
    title: "",
    message: "",
    action: () => {},
  })
  const [data, setData] = useState({
    status: 1,
    groom_fullname: '',
    groom_nickname: '',
    groom_about: '',
    groom_tiktok: '',
    groom_facebook: '',
    groom_instagram: '',
    groom_picture: '',
    bride_fullname: '',
    bride_nickname: '',
    bride_about: '',
    bride_tiktok: '',
    bride_facebook: '',
    bride_instagram: '',
    bride_picture: '',
    home_couple_picture: '',
    about_us_bg: '',
    first_meet_date: '',
    first_meet_picture: '',
    first_meet_about: '',
    first_date_date: '',
    first_date_picture: '',
    first_date_about: '',
    engagement_date: '',
    engagement_picture: '',
    engagement_about: '',
    event_bg: '',
    event_ceremonial_date: '',
    event_ceremonial_start_time: '',
    event_ceremonial_end_time: '',
    event_ceremonial_address: '',
    event_ceremonial_link: '',
    event_party_date: '',
    event_party_start_time: '',
    event_party_end_time: '',
    event_party_address: '',
    event_party_link: '',
    event_traditional_date: '',
    event_traditional_start_time: '',
    event_traditional_end_time: '',
    event_traditional_address: '',
    event_traditional_link: '',
    accompanist_fullname_1: '',
    accompanist_type_1: '',
    accompanist_status_1: '',
    accompanist_tiktok_1: '',
    accompanist_facebook_1: '',
    accompanist_instagram_1: '',
    accompanist_picture_1: '',
    accompanist_fullname_2: '',
    accompanist_type_2: '',
    accompanist_status_2: '',
    accompanist_tiktok_2: '',
    accompanist_facebook_2: '',
    accompanist_instagram_2: '',
    accompanist_picture_2: '',
    accompanist_fullname_3: '',
    accompanist_type_3: '',
    accompanist_status_3: '',
    accompanist_tiktok_3: '',
    accompanist_facebook_3: '',
    accompanist_instagram_3: '',
    accompanist_picture_3: '',
    accompanist_fullname_4: '',
    accompanist_type_4: '',
    accompanist_status_4: '',
    accompanist_tiktok_4: '',
    accompanist_facebook_4: '',
    accompanist_instagram_4: '',
    accompanist_fullname_5: '',
    accompanist_type_5: '',
    accompanist_status_5: '',
    accompanist_tiktok_5: '',
    accompanist_facebook_5: '',
    accompanist_instagram_5: '',
    accompanist_picture_5: '',
    accompanist_fullname_6: '',
    accompanist_type_6: '',
    accompanist_status_6: '',
    accompanist_tiktok_6: '',
    accompanist_facebook_6: '',
    accompanist_instagram_6: '',
    accompanist_picture_6: '',
    gallery_1: '',
    gallery_2: '',
    gallery_3: '',
    gallery_4: '',
    gallery_5: '',
    reservation_bg: '',
  });
  const listStatus = [
   'Bridesmaids',
   'Bridesmen',
   'Groomsmen',
   'Groomsmaids',
  ];
  const listType = [
    'Brother',
    'Sister',
    'Bestfriend',
    'Friend',
    'Nephew',
    'Cousin',
   ];

  useEffect(() => {
    dispatch(getDetail());
  }, []);

  useEffect(() => {
    let {
      isLoading,
      isError,
      isSuccess,
      errorMessage,
      data
    } = settingDetail;

    if (!isLoading && isSuccess) {
      setData(data);
      dispatch(defaultSettingDetail());
    }

    if (!isLoading && isError) {
      setShowNotif({
        show: true,
        type: "danger",
        title: "Get Detail",
        message: errorMessage,
        action: () => {
          setShowNotif({
            ...showNotif,
            show: false,
          });
          timeoutDetail = setTimeout(() => {
            dispatch(defaultSettingDetail());
            setShowNotif({
              show: false,
              type: "",
              title: "",
              message: "",
              action: () => {},
            })
          }, 500)
        },
      });
    }

    return () => {
      clearTimeout(timeoutDetail);
    }
  }, [settingDetail]);

  useEffect(() => {
    let {
      isLoading,
      isError,
      isSuccess,
      errorMessage,
    } = settingSave;
    
    if (!isLoading && isSuccess) {
      setShowNotif({
        show: true,
        type: "success",
        title: "success",
        message: "Successfully save setting data",
        action: () => {
          setShowNotif({
            ...showNotif,
            show: false,
          });
          timeoutSave = setTimeout(() => {
            dispatch(getDetail());
            dispatch(defaultSettingSave());
            setShowNotif({
              show: false,
              type: "",
              title: "",
              message: "",
              action: () => {},
            })
          }, 500)
        },
      });
    }

    if (!isLoading && isError) {
      setShowNotif({
        show: true,
        type: "danger",
        title: "Get Detail",
        message: errorMessage,
        action: () => {
          setShowNotif({
            ...showNotif,
            show: false,
          });
          timeoutSave = setTimeout(() => {
            dispatch(defaultSettingSave());
            setShowNotif({
              show: false,
              type: "",
              title: "",
              message: "",
              action: () => {},
            })
          }, 500)
        },
      });
    }

    return () => {
      clearTimeout(timeoutSave);
    }
  }, [settingSave]);

  const submitForm = () => {
    setNotifConfirm(false);
    if (!settingDetail?.isLoading && !settingSave?.isLoading) {
      dispatch(submitSetting(data));
    }
  }

  return (
    <div className="w-full h-full flex flex-col overflow-x-hidden hide-scroll">
      <BreadCrumb
        title={'Settings'}
        list={[
          {title: 'Settings', path: '', active: true},
        ]}
      />

      <div className="w-full h-full flex">
        <form className="w-full h-full rounded flex flex-col gap-5">
          <div className="w-full flex bg-white rounded shadow-lg p-5 flex-col">
            <span className="font-bold mb-3">Active Page</span>
            <CheckBox isChecked={data?.status === 1 ? false : true} onChange={(res) => setData({...data, status: res?.isChecked === false ? 1 : 2})} />
          </div>
          
          <div className="w-full flex flex-col desktop:flex-row gap-5">
            <div className="w-full flex flex-col gap-3 shadow-lg bg-white rounded p-5">
              <span className="font-bold">Groom Section -</span>
              <div className="w-full flex flex-col desktop:flex-row gap-3">
                <div className="w-full flex flex-col gap-1">
                  <span>Full Name</span>
                  <input type="text" name="groom_full_name" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Groom Full Name" value={data?.groom_fullname} onChange={(e) => setData({...data, groom_fullname: e.target.value})} />
                </div>

                <div className="w-full flex flex-col gap-1">
                  <span>Nick Name</span>
                  <input type="text" name="groom_nick_name" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Groom Nick Name" value={data?.groom_nickname} onChange={(e) => setData({...data, groom_nickname: e.target.value})} />
                </div>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span>About</span>
                <textarea maxLength={235} type="text" name="about_groom" className="w-full bg-white outline-none border min-h-[70px] max-h-[70px] border-sky-900 rounded px-2" placeholder="About Groom" value={data?.groom_about} onChange={(e) => setData({...data, groom_about: e.target.value})} />
              </div>

              <div className="w-full flex flex-col gap-1">
                <span>Sosmed Link</span>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                  <input type="text" name="groom_link_tiktok" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Groom Link Tiktok" value={data?.groom_tiktok} onChange={(e) => setData({...data, groom_tiktok: e.target.value})} />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <input type="text" name="groom_link_facebook" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Groom Link Facebook" value={data?.groom_facebook} onChange={(e) => setData({...data, groom_facebook: e.target.value})} />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <input type="text" name="groom_link_instagram" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Groom Link Instagram" value={data?.groom_instagram} onChange={(e) => setData({...data, groom_instagram: e.target.value})} />
                </div>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span>Picture</span>
                <input type="file" accept=".jpeg,.jpg,.png" name="groom_picture" className="w-fit bg-white outline-none" onChange={(e) => {
                    let file = new FileReader();
                    if (e?.target?.files[0]) {
                      file.readAsDataURL(e.target.files[0]);
                      file.onload = (response) => response?.target?.result ? setData({...data, groom_picture: response?.target?.result}) : {};
                    } else {
                      setData({...data, groom_picture: data?.groom_picture});
                    }
                    file.onerror = () => setData({...data, groom_picture: data?.groom_picture});
                  }} />
                <div className="w-[120px] h-[100px] mt-2 rounded">
                  {data?.groom_picture ?  <img src={data?.groom_picture} className="w-full h-full object-cover" alt="groom" /> : <img src={DefaultImg} className="w-full h-full object-cover" alt="groom" />}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-3 shadow-lg bg-white rounded p-5">
              <span className="font-bold">Brides Section -</span>
              <div className="w-full flex flex-col desktop:flex-row gap-3">
                <div className="w-full flex flex-col gap-1">
                  <span>Full Name</span>
                  <input type="text" name="brides_full_name" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Brides Full Name" value={data?.bride_fullname} onChange={(e) => setData({...data, bride_fullname: e.target.value})} />
                </div>

                <div className="w-full flex flex-col gap-1">
                  <span>Nick Name</span>
                  <input type="text" name="brides_nick_name" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Brides Nick Name" value={data?.bride_nickname} onChange={(e) => setData({...data, bride_nickname: e.target.value})} />
                </div>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span>About</span>
                <textarea maxLength={235} type="text" name="about_brides" className="w-full bg-white outline-none border min-h-[70px] max-h-[70px] border-sky-900 rounded px-2" placeholder="About Brides" value={data?.bride_about} onChange={(e) => setData({...data, bride_about: e.target.value})} />
              </div>

              <div className="w-full flex flex-col gap-1">
                <span>Sosmed Link</span>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                  <input type="text" name="brides_link_tiktok" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Brides Link Tiktok" value={data?.bride_tiktok} onChange={(e) => setData({...data, bride_tiktok: e.target.value})} />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <input type="text" name="brides_link_facebook" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Brides Link Facebook" value={data?.bride_facebook} onChange={(e) => setData({...data, bride_facebook: e.target.value})} />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <input type="text" name="brides_link_instagram" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Brides Link Instagram" value={data?.bride_instagram} onChange={(e) => setData({...data, bride_instagram: e.target.value})} />
                </div>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span>Picture</span>
                <input type="file" accept=".jpeg,.jpg,.png" name="brides_picture" className="w-fit bg-white outline-none" onChange={(e) => {
                    let file = new FileReader();
                    if (e?.target?.files[0]) {
                      file.readAsDataURL(e.target.files[0]);
                      file.onload = (response) => response?.target?.result ? setData({...data, bride_picture: response?.target?.result}) : {};
                    } else {
                      setData({...data, bride_picture: data?.bride_picture});
                    }
                    file.onerror = () => setData({...data, bride_picture: data?.bride_picture});
                  }} />
                <div className="w-[120px] h-[100px] mt-2 rounded">
                  {data?.bride_picture ?  <img src={data?.bride_picture} className="w-full h-full object-cover" alt="groom" /> : <img src={DefaultImg} className="w-full h-full object-cover" alt="bride"/>}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-5 tablet:flex-row">
            <div className="w-full h-full flex flex-col rounded gap-3 bg-white shadow-lg p-5">
              <span className="font-bold">Home Section -</span>
              <div className="w-full h-full flex flex-col gap-3">
                <span>Couple Picture</span>
                <div className="w-full h-full flex flex-col gap-3">
                  <input type="file" accept=".jpeg,.jpg,.png" name="bg_about_us" className="w-fit bg-white outline-none" onChange={(e) => {
                    let file = new FileReader();
                    if (e?.target?.files[0]) {
                      file.readAsDataURL(e.target.files[0]);
                      file.onload = (response) => response?.target?.result ? setData({...data, home_couple_picture: response?.target?.result}) : {};
                    } else {
                      setData({...data, home_couple_picture: data?.home_couple_picture});
                    }
                    file.onerror = () => setData({...data, home_couple_picture: data?.home_couple_picture});
                  }} />
                  <div className="w-[120px] h-[100px] rounded">
                    {data?.home_couple_picture ?  <img src={data?.home_couple_picture} className="w-full h-full object-cover rounded" alt="first-date"/> : <img src={DefaultImg} className="w-full h-full object-cover rounded" alt="about-us-bg"/>}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-full flex flex-col rounded gap-3 bg-white shadow-lg p-5">
              <span className="font-bold">About Us Section -</span>
              <div className="w-full h-full flex flex-col gap-3">
                <span>Background</span>
                <div className="w-full h-full flex flex-col gap-3">
                  <input type="file" accept=".jpeg,.jpg,.png" name="bg_about_us" className="w-fit bg-white outline-none" onChange={(e) => {
                    let file = new FileReader();
                    if (e?.target?.files[0]) {
                      file.readAsDataURL(e.target.files[0]);
                      file.onload = (response) => response?.target?.result ? setData({...data, about_us_bg: response?.target?.result}) : {};
                    } else {
                      setData({...data, about_us_bg: data?.about_us_bg});
                    }
                    file.onerror = () => setData({...data, about_us_bg: data?.about_us_bg});
                  }} />
                  <div className="w-[120px] h-[100px] rounded">
                    {data?.about_us_bg ?  <img src={data?.about_us_bg} className="w-full h-full object-cover rounded" alt="first-date"/> : <img src={DefaultImg} className="w-full h-full object-cover rounded" alt="about-us-bg"/>}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-full flex flex-col rounded gap-3 bg-white shadow-lg p-5">
              <span className="font-bold">Reservation Section -</span>
              <div className="w-full h-full flex flex-col gap-3">
                <span>Background</span>
                <div className="w-full h-full flex flex-col gap-3">
                  <input type="file" accept=".jpeg,.jpg,.png" name="bg_reservation" className="w-fit bg-white outline-none" onChange={(e) => {
                    let file = new FileReader();
                    if (e?.target?.files[0]) {
                      file.readAsDataURL(e.target.files[0]);
                      file.onload = (response) => response?.target?.result ? setData({...data, reservation_bg: response?.target?.result}) : {};
                    } else {
                      setData({...data, reservation_bg: data?.reservation_bg});
                    }
                    file.onerror = () => setData({...data, reservation_bg: data?.reservation_bg});
                  }} />
                  <div className="w-[120px] h-[100px] rounded">
                    {data?.reservation_bg ?  <img src={data?.reservation_bg} className="w-full h-full object-cover rounded" alt="first-date"/> : <img src={DefaultImg} className="w-full h-full object-cover rounded" alt="about-us-bg"/>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full min-h-[1350px] desktop:min-h-[unset] desktop:h-full flex flex-col rounded gap-3 bg-white shadow-lg p-5">
            <span className="font-bold">Our Story Section -</span>
            <div className="w-full h-full flex flex-col gap-3">
              <span>First Meet</span>
              <div className="w-full h-full flex flex-col desktop:flex-row gap-3">
                <div className="w-[250px] h-full gap-3 flex flex-col">
                  <input type="date" name="date_first_meet" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Date First Meet" value={data?.first_meet_date} onChange={(e) => setData({...data, first_meet_date: e.target.value})} />
                  <input type="file" accept=".jpeg,.jpg,.png" name="first_meet_picutre" className="w-fit bg-white outline-none" onChange={(e) => {
                    let file = new FileReader();
                    if (e?.target?.files[0]) {
                      file.readAsDataURL(e.target.files[0]);
                      file.onload = (response) => response?.target?.result ? setData({...data, first_meet_picture: response?.target?.result}) : {};
                    } else {
                      setData({...data, first_meet_picture: data?.first_meet_picture});
                    }
                    file.onerror = () => setData({...data, first_meet_picture: data?.first_meet_picture});
                  }} />
                  <div className="w-[200px] h-[100px]">
                    {data?.first_meet_picture ?  <img src={data?.first_meet_picture} className="w-full h-full object-cover" alt="first-meet"/> : <img src={DefaultImg} className="w-full h-full object-cover" alt="first-meet"/>}
                  </div>
                </div>
                <textarea maxLength={235} type="text" name="first_meet" className="w-full bg-white outline-none border min-h-[180px] max-h-[180px] border-sky-900 rounded px-2" placeholder="First Meet" value={data?.first_meet_about} onChange={(e) => setData({...data, first_meet_about: e.target.value})} />
              </div>
            </div>

            <div className="w-full h-full flex flex-col gap-3">
              <span>First Date</span>
              <div className="w-full h-full flex flex-col desktop:flex-row gap-3">
                <div className="w-[250px] h-full gap-3 flex flex-col">
                  <input type="date" name="date_first_date" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Date First Date" value={data?.first_date_date} onChange={(e) => setData({...data, first_date_date: e.target.value})} />
                  <input type="file" accept=".jpeg,.jpg,.png" name="first_date_picutre" className="w-fit bg-white outline-none" onChange={(e) => {
                    let file = new FileReader();
                    if (e?.target?.files[0]) {
                      file.readAsDataURL(e.target.files[0]);
                      file.onload = (response) => response?.target?.result ? setData({...data, first_date_picture: response?.target?.result}) : {};
                    } else {
                      setData({...data, first_date_picture: data?.first_date_picture});
                    }
                    file.onerror = () => setData({...data, first_date_picture: data?.first_date_picture});
                  }} />
                  <div className="w-[200px] h-[100px]">
                    {data?.first_date_picture ?  <img src={data?.first_date_picture} className="w-full h-full object-cover" alt="first-meet"/> : <img src={DefaultImg} className="w-full h-full object-cover" alt="first-date"/>}
                  </div>
                </div>
                <textarea maxLength={235} type="text" name="first_date" className="w-full bg-white outline-none border min-h-[180px] max-h-[180px] border-sky-900 rounded px-2" placeholder="First Date" value={data?.first_date_about} onChange={(e) => setData({...data, first_date_about: e.target.value})} />
              </div>
            </div>

            <div className="w-full h-full flex flex-col gap-3">
              <span>Engagement</span>
              <div className="w-full h-full flex flex-col desktop:flex-row gap-3">
                <div className="w-[250px] h-full gap-3 flex flex-col">
                  <input type="date" name="date_engagement" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Engagement" value={data?.engagement_date} onChange={(e) => setData({...data, engagement_date: e.target.value})} />
                  <input type="file" accept=".jpeg,.jpg,.png" name="engagement_picutre" className="w-fit bg-white outline-none" onChange={(e) => {
                    let file = new FileReader();
                    if (e?.target?.files[0]) {
                      file.readAsDataURL(e.target.files[0]);
                      file.onload = (response) => response?.target?.result ? setData({...data, engagement_picture: response?.target?.result}) : {};
                    } else {
                      setData({...data, engagement_picture: data?.engagement_picture});
                    }
                    file.onerror = () => setData({...data, engagement_picture: data?.engagement_picture});
                  }} />
                  <div className="w-[200px] h-[100px]">
                    {data?.engagement_picture ?  <img src={data?.engagement_picture} className="w-full h-full object-cover" alt="first-meet"/> : <img src={DefaultImg} className="w-full h-full object-cover" alt="engagement"/>}
                  </div>
                </div>
                <textarea maxLength={235} type="text" name="engagement" className="w-full bg-white outline-none border min-h-[180px] max-h-[180px] border-sky-900 rounded px-2" placeholder="Engagement" value={data?.engagement_about} onChange={(e) => setData({...data, engagement_about: e.target.value})} />
              </div>
            </div>
          </div>

          <div className="w-full min-h-[900px] desktop:min-h-[unset] desktop:h-full flex flex-col rounded gap-3 bg-white shadow-lg  p-5">
            <span className="font-bold">Events Section -</span>
            <div className="w-full flex flex-col desktop:flex-row gap-3">
              <div className="w-full h-full flex flex-col gap-3">
                <span>Background</span>
                <div className="w-full h-full flex flex-col gap-3">
                  <input type="file" accept=".jpeg,.jpg,.png" name="bg_events" className="w-fit bg-white outline-none" onChange={(e) => {
                    let file = new FileReader();
                    if (e?.target?.files[0]) {
                      file.readAsDataURL(e.target.files[0]);
                      file.onload = (response) => response?.target?.result ? setData({...data, event_bg: response?.target?.result}) : {};
                    } else {
                      setData({...data, event_bg: data?.event_bg});
                    }
                    file.onerror = () => setData({...data, event_bg: data?.event_bg});
                  }} />
                  <div className="w-[200px] h-[140px]">
                    {data?.event_bg ?  <img src={data?.event_bg} className="w-full h-full object-cover" alt="first-meet"/> : <img src={DefaultImg} className="w-full h-full object-cover" alt="engagement"/>}
                  </div>
                </div>
              </div>

              <div className="w-full h-full flex flex-col gap-3">
                <span>Ceremonial</span>
                <div className="w-full h-full flex flex-col gap-3">
                  <input type="date" name="ceremonial_date" className="w-full bg-white outline-none border border-sky-900 rounded px-2" value={data?.event_ceremonial_date} onChange={(e) => setData({...data, event_ceremonial_date: e.target.value})} />
                  <div className="w-full flex flex-row gap-3">
                    <label>Start</label>
                    <input type="time" name="ceremonial_start_time" className="w-full bg-white outline-none border border-sky-900 rounded px-2" value={data?.event_ceremonial_start_time} onChange={(e) => setData({...data, event_ceremonial_start_time: e.target.value})} />
                  </div>
                  <div className="w-full flex flex-row gap-3">
                    <label>End</label>
                    <input type="time" name="ceremonial_end_time" className="w-full bg-white outline-none border border-sky-900 rounded px-2" value={data?.event_ceremonial_end_time} onChange={(e) => setData({...data, event_ceremonial_end_time: e.target.value})} />
                  </div>
                  <input type="text" name="ceremonial_location" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Ceremonial Address" value={data?.event_ceremonial_address} onChange={(e) => setData({...data, event_ceremonial_address: e.target.value})} />
                  <input type="text" name="ceremonial_link" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Ceremonial Link Address" value={data?.event_ceremonial_link} onChange={(e) => setData({...data, event_ceremonial_link: e.target.value})} />
                </div>
              </div>

              <div className="w-full h-full flex flex-col gap-3">
                <span>Party</span>
                <div className="w-full h-full flex flex-col gap-3">
                  <input type="date" name="party_date" className="w-full bg-white outline-none border border-sky-900 rounded px-2" value={data?.event_party_date} onChange={(e) => setData({...data, event_party_date: e.target.value})} />
                  <div className="w-full flex flex-row gap-3">
                    <label>Start</label>
                    <input type="time" name="party_start_time" className="w-full bg-white outline-none border border-sky-900 rounded px-2" value={data?.event_party_start_time} onChange={(e) => setData({...data, event_party_start_time: e.target.value})} />
                  </div>
                  <div className="w-full flex flex-row gap-3">
                    <label>End</label>
                    <input type="time" name="party_end_time" className="w-full bg-white outline-none border border-sky-900 rounded px-2" value={data?.event_party_end_time} onChange={(e) => setData({...data, event_party_end_time: e.target.value})} />
                  </div>
                  <input type="text" name="party_location" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Party Address" value={data?.event_party_address} onChange={(e) => setData({...data, event_party_address: e.target.value})} />
                  <input type="text" name="party_link" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Party Link Address" value={data?.event_party_link} onChange={(e) => setData({...data, event_party_link: e.target.value})} />
                </div>
              </div>

              <div className="w-full h-full flex flex-col gap-3">
                <span>Traditional Events</span>
                <div className="w-full h-full flex flex-col gap-3">
                  <input type="date" name="traditional_date" className="w-full bg-white outline-none border border-sky-900 rounded px-2" value={data?.event_traditional_date} onChange={(e) => setData({...data, event_traditional_date: e.target.value})} />
                  <div className="w-full flex flex-row gap-3">
                    <label>Start</label>
                    <input type="time" name="traditional_start_time" className="w-full bg-white outline-none border border-sky-900 rounded px-2" value={data?.event_traditional_start_time} onChange={(e) => setData({...data, event_traditional_start_time: e.target.value})} />
                  </div>
                  <div className="w-full flex flex-row gap-3">
                    <label>End</label>
                    <input type="time" name="traditional_end_time" className="w-full bg-white outline-none border border-sky-900 rounded px-2" value={data?.event_traditional_end_time} onChange={(e) => setData({...data, event_traditional_end_time: e.target.value})} />
                  </div>
                  <input type="text" name="traditional_location" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Traditional Events Address" value={data?.event_traditional_address} onChange={(e) => setData({...data, event_traditional_address: e.target.value})} />
                  <input type="text" name="traditional_link" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Traditional Events Link Address" value={data?.event_traditional_link} onChange={(e) => setData({...data, event_traditional_link: e.target.value})} />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-fit flex flex-col rounded gap-5 bg-white shadow-lg p-5">
            <span className="font-bold">Bridesmaids & Groomsman Section -</span>
            <div className="w-full h-full flex flex-col desktop:flex-row gap-3">
              <div className="w-full h-full flex flex-col gap-3">
                <input type="text" name="brides_groom_name_1" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Full Name 1" value={data?.accompanist_fullname_1} onChange={(e) => setData({...data, accompanist_fullname_1: e.target.value})} />
                <SelectOption
                  height={'h-[60px]'}
                  isLoading={false}
                  options={listStatus}
                  value={data?.accompanist_status_1}
                  showClear={true}
                  onClear={() => setData({...data, accompanist_status_1: ''})}
                  showSearch={false}
                  optionPosition={'bottom'}
                  onChange={(res) => setData({...data, accompanist_status_1: res})}
                />
                <SelectOption
                  height={'h-[60px]'}
                  isLoading={false}
                  options={listType}
                  value={data?.accompanist_type_1}
                  showClear={true}
                  onClear={() => setData({...data, accompanist_type_1: ''})}
                  showSearch={false}
                  optionPosition={'bottom'}
                  onChange={(res) => setData({...data, accompanist_type_1: res})}
                />
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                  <input type="text" name="brides_groom_tiktok_1" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Tiktok" value={data?.accompanist_tiktok_1} onChange={(e) => setData({...data, accompanist_tiktok_1: e.target.value})} />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <input type="text" name="brides_groom_facebook_1" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Facebook" value={data?.accompanist_facebook_1} onChange={(e) => setData({...data, accompanist_facebook_1: e.target.value})} />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <input type="text" name="brides_groom_instagram_1" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Instagram" value={data?.accompanist_instagram_1} onChange={(e) => setData({...data, accompanist_instagram_1: e.target.value})} />
                </div>
                <div className="w-full h-full flex flex-col gap-3">
                  <div className="w-full h-full flex flex-col gap-3">
                    <input type="file" accept=".jpeg,.jpg,.png" name="brides_groom_picture_1" className="w-fit bg-white outline-none" onChange={(e) => {
                      let file = new FileReader();
                      if (e?.target?.files[0]) {
                        file.readAsDataURL(e.target.files[0]);
                        file.onload = (response) => response?.target?.result ? setData({...data, accompanist_picture_1: response?.target?.result}) : {};
                      } else {
                        setData({...data, accompanist_picture_1: data?.accompanist_picture_1});
                      }
                      file.onerror = () => setData({...data, accompanist_picture_1: data?.accompanist_picture_1});
                    }} />
                    <div className="w-[120px] h-[100px] rounded">
                      {data?.accompanist_picture_1 ?  <img src={data?.accompanist_picture_1} className="w-full h-full object-cover" alt="img"/> : <img src={DefaultImg} className="w-full h-full object-cover" alt="img"/>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full flex flex-col gap-3">
                <input type="text" name="brides_groom_name_2" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Full Name 2" value={data?.accompanist_fullname_2} onChange={(e) => setData({...data, accompanist_fullname_2: e.target.value})} />
                <SelectOption
                  height={'h-[60px]'}
                  isLoading={false}
                  options={listStatus}
                  value={data?.accompanist_status_2}
                  showClear={true}
                  onClear={() => setData({...data, accompanist_status_2: ''})}
                  showSearch={false}
                  optionPosition={'bottom'}
                  onChange={(res) => setData({...data, accompanist_status_2: res})}
                />
                <SelectOption
                  height={'h-[60px]'}
                  isLoading={false}
                  options={listType}
                  value={data?.accompanist_type_2}
                  showClear={true}
                  onClear={() => setData({...data, accompanist_type_2: ''})}
                  showSearch={false}
                  optionPosition={'bottom'}
                  onChange={(res) => setData({...data, accompanist_type_2: res})}
                />
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                  <input type="text" name="brides_groom_tiktok_2" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Tiktok" value={data?.accompanist_tiktok_2} onChange={(e) => setData({...data, accompanist_tiktok_2: e.target.value})} />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <input type="text" name="brides_groom_facebook_2" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Facebook" value={data?.accompanist_facebook_2} onChange={(e) => setData({...data, accompanist_facebook_2: e.target.value})} />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <input type="text" name="brides_groom_instagram_2" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Instagram" value={data?.accompanist_instagram_2} onChange={(e) => setData({...data, accompanist_instagram_2: e.target.value})} />
                </div>
                <div className="w-full h-full flex flex-col gap-3">
                  <div className="w-full h-full flex flex-col gap-3">
                    <input type="file" accept=".jpeg,.jpg,.png" name="brides_groom_picture_2" className="w-fit bg-white outline-none" onChange={(e) => {
                      let file = new FileReader();
                      if (e?.target?.files[0]) {
                        file.readAsDataURL(e.target.files[0]);
                        file.onload = (response) => response?.target?.result ? setData({...data, accompanist_picture_2: response?.target?.result}) : {};
                      } else {
                        setData({...data, accompanist_picture_2: data?.accompanist_picture_2});
                      }
                      file.onerror = () => setData({...data, accompanist_picture_2: data?.accompanist_picture_2});
                    }} />
                    <div className="w-[120px] h-[100px] rounded">
                      {data?.accompanist_picture_2 ?  <img src={data?.accompanist_picture_2} className="w-full h-full object-cover" alt="img"/> : <img src={DefaultImg} className="w-full h-full object-cover" alt="img"/>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full flex flex-col gap-3">
                <input type="text" name="brides_groom_name_3" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Full Name 3" value={data?.accompanist_fullname_3} onChange={(e) => setData({...data, accompanist_fullname_3: e.target.value})} />
                <SelectOption
                  height={'h-[60px]'}
                  isLoading={false}
                  options={listStatus}
                  value={data?.accompanist_status_3}
                  showClear={true}
                  onClear={() => setData({...data, accompanist_status_3: ''})}
                  showSearch={false}
                  optionPosition={'bottom'}
                  onChange={(res) => setData({...data, accompanist_status_3: res})}
                />
                <SelectOption
                  height={'h-[60px]'}
                  isLoading={false}
                  options={listType}
                  value={data?.accompanist_type_3}
                  showClear={true}
                  onClear={() => setData({...data, accompanist_type_3: ''})}
                  showSearch={false}
                  optionPosition={'bottom'}
                  onChange={(res) => setData({...data, accompanist_type_3: res})}
                />
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                  <input type="text" name="brides_groom_tiktok_3" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Tiktok" value={data?.accompanist_tiktok_3} onChange={(e) => setData({...data, accompanist_tiktok_3: e.target.value})} />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <input type="text" name="brides_groom_facebook_3" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Facebook" value={data?.accompanist_facebook_3} onChange={(e) => setData({...data, accompanist_facebook_3: e.target.value})} />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <input type="text" name="brides_groom_instagram_3" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Instagram" value={data?.accompanist_instagram_3} onChange={(e) => setData({...data, accompanist_instagram_3: e.target.value})} />
                </div>
                <div className="w-full h-full flex flex-col gap-3">
                  <div className="w-full h-full flex flex-col gap-3">
                    <input type="file" accept=".jpeg,.jpg,.png" name="brides_groom_picture_3" className="w-fit bg-white outline-none" onChange={(e) => {
                      let file = new FileReader();
                      if (e?.target?.files[0]) {
                        file.readAsDataURL(e.target.files[0]);
                        file.onload = (response) => response?.target?.result ? setData({...data, accompanist_picture_3: response?.target?.result}) : {};
                      } else {
                        setData({...data, accompanist_picture_3: data?.accompanist_picture_3});
                      }
                      file.onerror = () => setData({...data, accompanist_picture_3: data?.accompanist_picture_3});
                    }} />
                    <div className="w-[120px] h-[100px] rounded">
                      {data?.accompanist_picture_3 ?  <img src={data?.accompanist_picture_3} className="w-full h-full object-cover" alt="img"/> : <img src={DefaultImg} className="w-full h-full object-cover" alt="img"/>}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-full flex flex-col desktop:flex-row gap-3">
              <div className="w-full h-full flex flex-col gap-3">
                <input type="text" name="brides_groom_name_4" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Full Name 4" value={data?.accompanist_fullname_4} onChange={(e) => setData({...data, accompanist_fullname_4: e.target.value})} />
                <SelectOption
                  height={'h-[60px]'}
                  isLoading={false}
                  options={listStatus}
                  value={data?.accompanist_status_4}
                  showClear={true}
                  onClear={() => setData({...data, accompanist_status_4: ''})}
                  showSearch={false}
                  optionPosition={'bottom'}
                  onChange={(res) => setData({...data, accompanist_status_4: res})}
                />
                <SelectOption
                  height={'h-[60px]'}
                  isLoading={false}
                  options={listType}
                  value={data?.accompanist_type_4}
                  showClear={true}
                  onClear={() => setData({...data, accompanist_type_4: ''})}
                  showSearch={false}
                  optionPosition={'bottom'}
                  onChange={(res) => setData({...data, accompanist_type_4: res})}
                />
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                  <input type="text" name="brides_groom_tiktok_4" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Tiktok" value={data?.accompanist_tiktok_4} onChange={(e) => setData({...data, accompanist_tiktok_4: e.target.value})} />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <input type="text" name="brides_groom_facebook_4" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Facebook" value={data?.accompanist_facebook_4} onChange={(e) => setData({...data, accompanist_facebook_4: e.target.value})} />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <input type="text" name="brides_groom_instagram_4" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Instagram" value={data?.accompanist_instagram_4} onChange={(e) => setData({...data, accompanist_instagram_4: e.target.value})} />
                </div>
                <div className="w-full h-full flex flex-col gap-3">
                  <div className="w-full h-full flex flex-col gap-3">
                    <input type="file" accept=".jpeg,.jpg,.png" name="brides_groom_picture_4" className="w-fit bg-white outline-none" onChange={(e) => {
                      let file = new FileReader();
                      if (e?.target?.files[0]) {
                        file.readAsDataURL(e.target.files[0]);
                        file.onload = (response) => response?.target?.result ? setData({...data, accompanist_picture_4: response?.target?.result}) : {};
                      } else {
                        setData({...data, accompanist_picture_4: data?.accompanist_picture_4});
                      }
                      file.onerror = () => setData({...data, accompanist_picture_4: data?.accompanist_picture_4});
                    }} />
                    <div className="w-[120px] h-[100px] rounded">
                      {data?.accompanist_picture_4 ?  <img src={data?.accompanist_picture_4} className="w-full h-full object-cover" alt="img"/> : <img src={DefaultImg} className="w-full h-full object-cover" alt="img"/>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full flex flex-col gap-3">
                <input type="text" name="brides_groom_name_5" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Full Name 5" value={data?.accompanist_fullname_5} onChange={(e) => setData({...data, accompanist_fullname_5: e.target.value})} />
                <SelectOption
                  height={'h-[60px]'}
                  isLoading={false}
                  options={listStatus}
                  value={data?.accompanist_status_5}
                  showClear={true}
                  onClear={() => setData({...data, accompanist_status_5: ''})}
                  showSearch={false}
                  optionPosition={'bottom'}
                  onChange={(res) => setData({...data, accompanist_status_5: res})}
                />
                <SelectOption
                  height={'h-[60px]'}
                  isLoading={false}
                  options={listType}
                  value={data?.accompanist_type_5}
                  showClear={true}
                  onClear={() => setData({...data, accompanist_type_5: ''})}
                  showSearch={false}
                  optionPosition={'bottom'}
                  onChange={(res) => setData({...data, accompanist_type_5: res})}
                />
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                  <input type="text" name="brides_groom_tiktok_5" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Tiktok" value={data?.accompanist_tiktok_5} onChange={(e) => setData({...data, accompanist_tiktok_5: e.target.value})} />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <input type="text" name="brides_groom_facebook_5" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Facebook" value={data?.accompanist_facebook_5} onChange={(e) => setData({...data, accompanist_facebook_5: e.target.value})} />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <input type="text" name="brides_groom_instagram_5" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Instagram" value={data?.accompanist_instagram_5} onChange={(e) => setData({...data, accompanist_instagram_5: e.target.value})} />
                </div>
                <div className="w-full h-full flex flex-col gap-3">
                  <div className="w-full h-full flex flex-col gap-3">
                    <input type="file" accept=".jpeg,.jpg,.png" name="brides_groom_picture_5" className="w-fit bg-white outline-none" onChange={(e) => {
                      let file = new FileReader();
                      if (e?.target?.files[0]) {
                        file.readAsDataURL(e.target.files[0]);
                        file.onload = (response) => response?.target?.result ? setData({...data, accompanist_picture_5: response?.target?.result}) : {};
                      } else {
                        setData({...data, accompanist_picture_5: data?.accompanist_picture_5});
                      }
                      file.onerror = () => setData({...data, accompanist_picture_5: data?.accompanist_picture_5});
                    }} />
                    <div className="w-[120px] h-[100px] rounded">
                      {data?.accompanist_picture_5 ?  <img src={data?.accompanist_picture_5} className="w-full h-full object-cover" alt="img"/> : <img src={DefaultImg} className="w-full h-full object-cover" alt="img"/>}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full flex flex-col gap-3">
                <input type="text" name="brides_groom_name_6" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Full Name 6" value={data?.accompanist_fullname_6} onChange={(e) => setData({...data, accompanist_fullname_6: e.target.value})} />
                <SelectOption
                  height={'h-[60px]'}
                  isLoading={false}
                  options={listStatus}
                  value={data?.accompanist_status_6}
                  showClear={true}
                  onClear={() => setData({...data, accompanist_status_6: ''})}
                  showSearch={false}
                  optionPosition={'bottom'}
                  onChange={(res) => setData({...data, accompanist_status_6: res})}
                />
                <SelectOption
                  height={'h-[60px]'}
                  isLoading={false}
                  options={listType}
                  value={data?.accompanist_type_6}
                  showClear={true}
                  onClear={() => setData({...data, accompanist_type_6: ''})}
                  showSearch={false}
                  optionPosition={'bottom'}
                  onChange={(res) => setData({...data, accompanist_type_6: res})}
                />
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                  <input type="text" name="brides_groom_tiktok_6" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Tiktok" value={data?.accompanist_tiktok_6} onChange={(e) => setData({...data, accompanist_tiktok_6: e.target.value})} />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <input type="text" name="brides_groom_facebook_6" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Facebook" value={data?.accompanist_facebook_6} onChange={(e) => setData({...data, accompanist_facebook_6: e.target.value})} />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <input type="text" name="brides_groom_instagram_6" className="w-full bg-white outline-none border border-sky-900 rounded px-2" placeholder="Link Instagram" value={data?.accompanist_instagram_6} onChange={(e) => setData({...data, accompanist_instagram_6: e.target.value})} />
                </div>
                <div className="w-full h-full flex flex-col gap-3">
                  <div className="w-full h-full flex flex-col gap-3">
                    <input type="file" accept=".jpeg,.jpg,.png" name="brides_groom_picture_6" className="w-fit bg-white outline-none" onChange={(e) => {
                      let file = new FileReader();
                      if (e?.target?.files[0]) {
                        file.readAsDataURL(e.target.files[0]);
                        file.onload = (response) => response?.target?.result ? setData({...data, accompanist_picture_6: response?.target?.result}) : {};
                      } else {
                        setData({...data, accompanist_picture_6: data?.accompanist_picture_6});
                      }
                      file.onerror = () => setData({...data, accompanist_picture_6: data?.accompanist_picture_6});
                    }} />
                    <div className="w-[120px] h-[100px] rounded">
                      {data?.accompanist_picture_6 ?  <img src={data?.accompanist_picture_6} className="w-full h-full object-cover" alt="img"/> : <img src={DefaultImg} className="w-full h-full object-cover" alt="img"/>}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="w-full min-h-[1050px] desktop:min-h-[unset] desktop:h-full flex flex-col rounded gap-3 bg-white shadow-lg p-5">
            <span className="font-bold">Gallery Section -</span>
            <div className="flex flex-col desktop:flex-row gap-3">
              <div className="w-full h-full flex flex-col gap-3">
                <span>Gallery 1</span>
                <input type="file" accept=".jpeg,.jpg,.png" name="gallery_1" className="w-fit bg-white outline-none" onChange={(e) => {
                  let file = new FileReader();
                  if (e?.target?.files[0]) {
                    file.readAsDataURL(e.target.files[0]);
                    file.onload = (response) => response?.target?.result ? setData({...data, gallery_1: response?.target?.result}) : {};
                  } else {
                    setData({...data, gallery_1: data?.gallery_1});
                  }
                  file.onerror = () => setData({...data, gallery_1: data?.gallery_1});
                }} />
                <div className="w-[120px] h-[100px] rounded">
                  {data?.gallery_1 ?  <img src={data?.gallery_1} className="w-full h-full object-cover" alt="img"/> : <img src={DefaultImg} className="w-full h-full object-cover" alt="img"/>}
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-3">
                <span>Gallery 2</span>
                <input type="file" accept=".jpeg,.jpg,.png" name="gallery_2" className="w-fit bg-white outline-none"onChange={(e) => {
                  let file = new FileReader();
                  if (e?.target?.files[0]) {
                    file.readAsDataURL(e.target.files[0]);
                    file.onload = (response) => response?.target?.result ? setData({...data, gallery_2: response?.target?.result}) : {};
                  } else {
                    setData({...data, gallery_2: data?.gallery_2});
                  }
                  file.onerror = () => setData({...data, gallery_2: data?.gallery_2});
                }} />
                <div className="w-[120px] h-[100px] rounded">
                  {data?.gallery_2 ?  <img src={data?.gallery_2} className="w-full h-full object-cover" alt="img"/> : <img src={DefaultImg} className="w-full h-full object-cover" alt="img"/>}
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-3">
                <span>Gallery 3</span>
                <input type="file" accept=".jpeg,.jpg,.png" name="gallery_3" className="w-fit bg-white outline-none"onChange={(e) => {
                  let file = new FileReader();
                  if (e?.target?.files[0]) {
                    file.readAsDataURL(e.target.files[0]);
                    file.onload = (response) => response?.target?.result ? setData({...data, gallery_3: response?.target?.result}) : {};
                  } else {
                    setData({...data, gallery_3: data?.gallery_3});
                  }
                  file.onerror = () => setData({...data, gallery_3: data?.gallery_3});
                }} />
                <div className="w-[120px] h-[100px] rounded">
                  {data?.gallery_3 ?  <img src={data?.gallery_3} className="w-full h-full object-cover" alt="img"/> : <img src={DefaultImg} className="w-full h-full object-cover" alt="img"/>}
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col desktop:flex-row gap-3">
              <div className="w-full h-full flex flex-col gap-3">
                <span>Gallery 4</span>
                <input type="file" accept=".jpeg,.jpg,.png" name="gallery_4" className="w-fit bg-white outline-none"onChange={(e) => {
                  let file = new FileReader();
                  if (e?.target?.files[0]) {
                    file.readAsDataURL(e.target.files[0]);
                    file.onload = (response) => response?.target?.result ? setData({...data, gallery_4: response?.target?.result}) : {};
                  } else {
                    setData({...data, gallery_4: data?.gallery_4});
                  }
                  file.onerror = () => setData({...data, gallery_4: data?.gallery_4});
                }} />
                <div className="w-[120px] h-[100px] rounded">
                  {data?.gallery_4 ?  <img src={data?.gallery_4} className="w-full h-full object-cover" alt="img"/> : <img src={DefaultImg} className="w-full h-full object-cover" alt="img"/>}
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-3">
                <span>Gallery 5</span>
                <input type="file" accept=".jpeg,.jpg,.png" name="gallery_5" className="w-fit bg-white outline-none"onChange={(e) => {
                  let file = new FileReader();
                  if (e?.target?.files[0]) {
                    file.readAsDataURL(e.target.files[0]);
                    file.onload = (response) => response?.target?.result ? setData({...data, gallery_5: response?.target?.result}) : {};
                  } else {
                    setData({...data, gallery_5: data?.gallery_5});
                  }
                  file.onerror = () => setData({...data, gallery_5: data?.gallery_5});
                }} />
                <div className="w-[120px] h-[100px] rounded">
                  {data?.gallery_5 ?  <img src={data?.gallery_5} className="w-full h-full object-cover" alt="img"/> : <img src={DefaultImg} className="w-full h-full object-cover" alt="img"/>}
                </div>
              </div>
              <div className="w-full"></div>
            </div>
          </div>

          <div className="w-full min-h-[200px] desktop:min-h-[unset] desktop:h-full flex flex-col desktop:flex-row gap-3 desktop:gap-5">
            <div
              className={`w-full transition-all duration-300 ease-in-out flex flex-col desktop:flex-row items-center justify-center py-2 rounded ${!settingDetail?.isLoading && !settingSave?.isLoading ? 'bg-sky-900 text-white' : 'bg-gray-300 text-gray-500'} shadow-lg cursor-pointer mt-5`}
              onClick={() => {
                if (!settingDetail?.isLoading && !settingSave?.isLoading) {
                  setNotifConfirm(true);
                }
              }}
            >{!settingDetail?.isLoading && !settingSave?.isLoading ? 'Save' : 'Loading...'}</div>
          </div>
        </form>
      </div>

      <Alert
        show={notifConfirm}
        type={'info'}
        title={"Save Data"}
        message={"Are you sure about the data you are going to save?"}
        showCancelButton={true}
        onCancel={() => setNotifConfirm(false)}
        onConfirm={() => submitForm()}
      />

      <Alert
        isLoading={settingDetail?.isLoading || settingSave?.isLoading}
        show={showNotif?.show}
        type={showNotif?.type}
        title={showNotif?.title}
        message={showNotif?.message}
        showCancelButton={false}
        confirmLabel={'Confirm'}
        onConfirm={() => showNotif?.action ? showNotif.action() : {}}
      />
    </div>
  );
};

export default Settings;
