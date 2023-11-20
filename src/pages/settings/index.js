import React from "react";

import BreadCrumb from "../../components/breadcrumb";
import DefaultImg from './../../assets/images/defaul-img.png';

const Settings = () => {
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
          <div className="w-full flex flex-col desktop:flex-row gap-3">
            <div className="w-full flex flex-col gap-3 shadow-lg bg-white rounded p-5">
              <span className="font-bold">Groom Section -</span>
              <div className="w-full flex flex-col desktop:flex-row gap-3">
                <div className="w-full flex flex-col gap-1">
                  <span>Full Name</span>
                  <input type="text" name="groom_full_name" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Groom Full Name" />
                </div>

                <div className="w-full flex flex-col gap-1">
                  <span>Nick Name</span>
                  <input type="text" name="groom_nick_name" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Groom Nick Name" />
                </div>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span>About</span>
                <textarea maxLength={235} type="text" name="about_groom" className="w-full bg-white outline-none border min-h-[70px] max-h-[70px] border-sky-500 rounded px-2" placeholder="About Groom" />
              </div>

              <div className="w-full flex flex-col gap-1">
                <span>Sosmed Link</span>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                  <input type="text" name="groom_link_tiktok" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Groom Link Tiktok" />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <input type="text" name="groom_link_facebook" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Groom Link Facebook" />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <input type="text" name="groom_link_instagram" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Groom Link Instagram" />
                </div>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span>Picture</span>
                <input type="file" name="groom_picture" className="w-fit bg-white outline-none" />
                <div className="w-[120px] h-[100px] mt-2 rounded">
                  <img src={DefaultImg} className="w-full h-full object-cover" alt="groom"/>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col gap-3 shadow-lg bg-white rounded p-5">
              <span className="font-bold">Brides Section -</span>
              <div className="w-full flex flex-col desktop:flex-row gap-3">
                <div className="w-full flex flex-col gap-1">
                  <span>Full Name</span>
                  <input type="text" name="brides_full_name" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Brides Full Name" />
                </div>

                <div className="w-full flex flex-col gap-1">
                  <span>Nick Name</span>
                  <input type="text" name="brides_nick_name" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Brides Nick Name" />
                </div>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span>About</span>
                <textarea maxLength={235} type="text" name="about_brides" className="w-full bg-white outline-none border min-h-[70px] max-h-[70px] border-sky-500 rounded px-2" placeholder="About Brides" />
              </div>

              <div className="w-full flex flex-col gap-1">
                <span>Sosmed Link</span>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                  <input type="text" name="brides_link_tiktok" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Brides Link Tiktok" />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <input type="text" name="brides_link_facebook" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Brides Link Facebook" />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <input type="text" name="brides_link_instagram" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Brides Link Instagram" />
                </div>
              </div>

              <div className="w-full flex flex-col gap-1">
                <span>Picture</span>
                <input type="file" name="brides_picture" className="w-fit bg-white outline-none" />
                <div className="w-[120px] h-[100px] mt-2 rounded">
                  <img src={DefaultImg} className="w-full h-full object-cover" alt="groom"/>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-full flex flex-col rounded gap-3 bg-white shadow-lg p-5">
            <span className="font-bold">About Us Section -</span>
            <div className="w-full h-full flex flex-col gap-3">
              <span>Background</span>
              <div className="w-full h-full flex flex-col gap-3">
                <input type="file" name="bg_about_us" className="w-fit bg-white outline-none" />
                <div className="w-[120px] h-[100px] bg-red-100 rounded">
                  <img src={DefaultImg} className="w-full h-full object-cover rounded" alt="first-date"/>
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
                  <input type="date" name="date_first_meet" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Date First Meet" />
                  <input type="file" name="first_meet_picutre" className="w-fit bg-white outline-none" />
                  <div className="w-full h-[100px] bg-red-100">
                    <img src={DefaultImg} className="w-full h-full object-cover" alt="first-meet"/>
                  </div>
                </div>
                <textarea maxLength={235} type="text" name="first_meet" className="w-full bg-white outline-none border min-h-[180px] max-h-[180px] border-sky-500 rounded px-2" placeholder="First Meet" />
              </div>
            </div>

            <div className="w-full h-full flex flex-col gap-3">
              <span>First Date</span>
              <div className="w-full h-full flex flex-col desktop:flex-row gap-3">
                <div className="w-[250px] h-full gap-3 flex flex-col">
                  <input type="date" name="date_first_date" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Date First Date" />
                  <input type="file" name="first_date_picutre" className="w-fit bg-white outline-none" />
                  <div className="w-full h-[100px] bg-red-100">
                    <img src={DefaultImg} className="w-full h-full object-cover" alt="first-date"/>
                  </div>
                </div>
                <textarea maxLength={235} type="text" name="first_date" className="w-full bg-white outline-none border min-h-[180px] max-h-[180px] border-sky-500 rounded px-2" placeholder="First Date" />
              </div>
            </div>

            <div className="w-full h-full flex flex-col gap-3">
              <span>Engagement</span>
              <div className="w-full h-full flex flex-col desktop:flex-row gap-3">
                <div className="w-[250px] h-full gap-3 flex flex-col">
                  <input type="date" name="date_engagement" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Engagement" />
                  <input type="file" name="engagement_picutre" className="w-fit bg-white outline-none" />
                  <div className="w-full h-[100px] bg-red-100">
                    <img src={DefaultImg} className="w-full h-full object-cover" alt="first-date"/>
                  </div>
                </div>
                <textarea maxLength={235} type="text" name="engagement" className="w-full bg-white outline-none border min-h-[180px] max-h-[180px] border-sky-500 rounded px-2" placeholder="Engagement" />
              </div>
            </div>
          </div>

          <div className="w-full min-h-[900px] desktop:min-h-[unset] desktop:h-full flex flex-col rounded gap-3 bg-white shadow-lg  p-5">
            <span className="font-bold">Events Section -</span>
            <div className="w-full flex flex-col desktop:flex-row gap-3">
              <div className="w-full h-full flex flex-col gap-3">
                <span>Background</span>
                <div className="w-full h-full flex flex-col gap-3">
                  <input type="file" name="bg_events" className="w-fit bg-white outline-none" />
                  <div className="w-[120px] h-[100px] bg-red-100 rounded">
                    <img src={DefaultImg} className="w-full h-full object-cover rounded" alt="first-date"/>
                  </div>
                </div>
              </div>

              <div className="w-full h-full flex flex-col gap-3">
                <span>Ceremonial</span>
                <div className="w-full h-full flex flex-col gap-3">
                  <input type="date" name="ceremonial_date" className="w-full bg-white outline-none border border-sky-500 rounded px-2" />
                  <input type="time" name="ceremonial_time" className="w-full bg-white outline-none border border-sky-500 rounded px-2" />
                  <input type="text" name="ceremonial_location" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Ceremonial Location" />
                  <input type="text" name="ceremonial_link" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Ceremonial Link Location" />
                </div>
              </div>

              <div className="w-full h-full flex flex-col gap-3">
                <span>Party</span>
                <div className="w-full h-full flex flex-col gap-3">
                  <input type="date" name="party_date" className="w-full bg-white outline-none border border-sky-500 rounded px-2" />
                  <input type="time" name="party_time" className="w-full bg-white outline-none border border-sky-500 rounded px-2" />
                  <input type="text" name="party_location" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Party Location" />
                  <input type="text" name="party_link" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Party Link Location" />
                </div>
              </div>

              <div className="w-full h-full flex flex-col gap-3">
                <span>Traditional Events</span>
                <div className="w-full h-full flex flex-col gap-3">
                  <input type="date" name="traditional_date" className="w-full bg-white outline-none border border-sky-500 rounded px-2" />
                  <input type="time" name="traditional_time" className="w-full bg-white outline-none border border-sky-500 rounded px-2" />
                  <input type="text" name="traditional_location" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Traditional Events Location" />
                  <input type="text" name="traditional_link" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Traditional Events Link Location" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full min-h-[2400px] desktop:min-h-[900px] desktop:h-full flex flex-col rounded gap-5 bg-white shadow-lg p-5">
            <span className="font-bold">Bridesmaids & Groomsman Section -</span>
            <div className="w-full h-full flex flex-col desktop:flex-row gap-3 mb-5">
              <div className="w-full h-full flex flex-col gap-3">
                <input type="text" name="brides_groom_name_1" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Full Name 1" />
                <select name="brides_groom_type_1" className="w-full bg-white outline-none border border-sky-500 rounded px-2">
                  <option value="Bridesmaids">Bridesmaids</option>
                  <option value="Bridesmen">Bridesmen</option>
                  <option value="Groomsmen">Groomsmen</option>
                  <option value="Groomsmaids">Groomsmaids</option>
                </select>
                <select name="brides_groom_status_1"  className="w-full bg-white outline-none border border-sky-500 rounded px-2">
                  <option value="Bestfiend">Bestfiend</option>
                  <option value="Friend">Friend</option>
                  <option value="Nephew">Nephew</option>
                  <option value="Cousin">Cousin</option>
                </select>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                  <input type="text" name="brides_groom_tiktok_1" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Tiktok" />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <input type="text" name="brides_groom_facebook_1" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Facebook" />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <input type="text" name="brides_groom_instagram_1" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Instagram" />
                </div>
                <div className="w-full h-full flex flex-col gap-3">
                  <div className="w-full h-full flex flex-col gap-3">
                    <input type="file" name="brides_groom_picture_1" className="w-fit bg-white outline-none" />
                    <div className="w-[120px] h-[100px] bg-red-100 rounded">
                      <img src={DefaultImg} className="w-full h-full object-cover rounded" alt="first-date"/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full flex flex-col gap-3">
                <input type="text" name="brides_groom_name_2" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Full Name 2" />
                <select name="brides_groom_type_2" className="w-full bg-white outline-none border border-sky-500 rounded px-2">
                  <option value="Bridesmaids">Bridesmaids</option>
                  <option value="Bridesmen">Bridesmen</option>
                  <option value="Groomsmen">Groomsmen</option>
                  <option value="Groomsmaids">Groomsmaids</option>
                </select>
                <select name="brides_groom_status_2"  className="w-full bg-white outline-none border border-sky-500 rounded px-2">
                  <option value="Bestfiend">Bestfiend</option>
                  <option value="Friend">Friend</option>
                  <option value="Nephew">Nephew</option>
                  <option value="Cousin">Cousin</option>
                </select>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                  <input type="text" name="brides_groom_tiktok_2" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Tiktok" />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <input type="text" name="brides_groom_facebook_2" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Facebook" />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <input type="text" name="brides_groom_instagram_2" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Instagram" />
                </div>
                <div className="w-full h-full flex flex-col gap-3">
                  <div className="w-full h-full flex flex-col gap-3">
                    <input type="file" name="brides_groom_picture_2" className="w-fit bg-white outline-none" />
                    <div className="w-[120px] h-[100px] bg-red-100 rounded">
                      <img src={DefaultImg} className="w-full h-full object-cover rounded" alt="first-date"/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full flex flex-col gap-3">
                <input type="text" name="brides_groom_name_3" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Full Name 3" />
                <select name="brides_groom_type_3" className="w-full bg-white outline-none border border-sky-500 rounded px-2">
                  <option value="Bridesmaids">Bridesmaids</option>
                  <option value="Bridesmen">Bridesmen</option>
                  <option value="Groomsmen">Groomsmen</option>
                  <option value="Groomsmaids">Groomsmaids</option>
                </select>
                <select name="brides_groom_status_3"  className="w-full bg-white outline-none border border-sky-500 rounded px-2">
                  <option value="Bestfiend">Bestfiend</option>
                  <option value="Friend">Friend</option>
                  <option value="Nephew">Nephew</option>
                  <option value="Cousin">Cousin</option>
                </select>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                  <input type="text" name="brides_groom_tiktok_3" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Tiktok" />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <input type="text" name="brides_groom_facebook_3" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Facebook" />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <input type="text" name="brides_groom_instagram_3" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Instagram" />
                </div>
                <div className="w-full h-full flex flex-col gap-3">
                  <div className="w-full h-full flex flex-col gap-3">
                    <input type="file" name="brides_groom_picture_3" className="w-fit bg-white outline-none" />
                    <div className="w-[120px] h-[100px] bg-red-100 rounded">
                      <img src={DefaultImg} className="w-full h-full object-cover rounded" alt="first-date"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full h-full flex flex-col desktop:flex-row gap-3 mb-5">
              <div className="w-full h-full flex flex-col gap-3">
                <input type="text" name="brides_groom_name_4" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Full Name 4" />
                <select name="brides_groom_type_4" className="w-full bg-white outline-none border border-sky-500 rounded px-2">
                  <option value="Bridesmaids">Bridesmaids</option>
                  <option value="Bridesmen">Bridesmen</option>
                  <option value="Groomsmen">Groomsmen</option>
                  <option value="Groomsmaids">Groomsmaids</option>
                </select>
                <select name="brides_groom_status_4"  className="w-full bg-white outline-none border border-sky-500 rounded px-2">
                  <option value="Bestfiend">Bestfiend</option>
                  <option value="Friend">Friend</option>
                  <option value="Nephew">Nephew</option>
                  <option value="Cousin">Cousin</option>
                </select>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                  <input type="text" name="brides_groom_tiktok_4" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Tiktok" />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <input type="text" name="brides_groom_facebook_4" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Facebook" />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <input type="text" name="brides_groom_instagram_4" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Instagram" />
                </div>
                <div className="w-full h-full flex flex-col gap-3">
                  <div className="w-full h-full flex flex-col gap-3">
                    <input type="file" name="brides_groom_picture_4" className="w-fit bg-white outline-none" />
                    <div className="w-[120px] h-[100px] bg-red-100 rounded">
                      <img src={DefaultImg} className="w-full h-full object-cover rounded" alt="first-date"/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full flex flex-col gap-3">
                <input type="text" name="brides_groom_name_5" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Full Name 5" />
                <select name="brides_groom_type_5" className="w-full bg-white outline-none border border-sky-500 rounded px-2">
                  <option value="Bridesmaids">Bridesmaids</option>
                  <option value="Bridesmen">Bridesmen</option>
                  <option value="Groomsmen">Groomsmen</option>
                  <option value="Groomsmaids">Groomsmaids</option>
                </select>
                <select name="brides_groom_status_5"  className="w-full bg-white outline-none border border-sky-500 rounded px-2">
                  <option value="Bestfiend">Bestfiend</option>
                  <option value="Friend">Friend</option>
                  <option value="Nephew">Nephew</option>
                  <option value="Cousin">Cousin</option>
                </select>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                  <input type="text" name="brides_groom_tiktok_5" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Tiktok" />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <input type="text" name="brides_groom_facebook_5" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Facebook" />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <input type="text" name="brides_groom_instagram_5" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Instagram" />
                </div>
                <div className="w-full h-full flex flex-col gap-3">
                  <div className="w-full h-full flex flex-col gap-3">
                    <input type="file" name="brides_groom_picture_5" className="w-fit bg-white outline-none" />
                    <div className="w-[120px] h-[100px] bg-red-100 rounded">
                      <img src={DefaultImg} className="w-full h-full object-cover rounded" alt="first-date"/>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-full flex flex-col gap-3">
                <input type="text" name="brides_groom_name_6" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Full Name 6" />
                <select name="brides_groom_type_6" className="w-full bg-white outline-none border border-sky-500 rounded px-2">
                  <option value="Bridesmaids">Bridesmaids</option>
                  <option value="Bridesmen">Bridesmen</option>
                  <option value="Groomsmen">Groomsmen</option>
                  <option value="Groomsmaids">Groomsmaids</option>
                </select>
                <select name="brides_groom_status_6"  className="w-full bg-white outline-none border border-sky-500 rounded px-2">
                  <option value="Bestfiend">Bestfiend</option>
                  <option value="Friend">Friend</option>
                  <option value="Nephew">Nephew</option>
                  <option value="Cousin">Cousin</option>
                </select>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-tiktok"></i>
                  </div>
                  <input type="text" name="brides_groom_tiktok_6" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Tiktok" />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-facebook"></i>
                  </div>
                  <input type="text" name="brides_groom_facebook_6" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Facebook" />
                </div>
                <div className="w-full flex flex-row">
                  <div className="w-[40px] rounded-full flex items-center justify-center mr-2">
                    <i className="fa-brands fa-instagram"></i>
                  </div>
                  <input type="text" name="brides_groom_instagram_6" className="w-full bg-white outline-none border border-sky-500 rounded px-2" placeholder="Link Instagram" />
                </div>
                <div className="w-full h-full flex flex-col gap-3">
                  <div className="w-full h-full flex flex-col gap-3">
                    <input type="file" name="brides_groom_picture_6" className="w-fit bg-white outline-none" />
                    <div className="w-[120px] h-[100px] bg-red-100 rounded">
                      <img src={DefaultImg} className="w-full h-full object-cover rounded" alt="first-date"/>
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
                <input type="file" name="gallery_1" className="w-fit bg-white outline-none" />
                <div className="w-[120px] h-[100px] bg-red-100 rounded">
                  <img src={DefaultImg} className="w-full h-full object-cover rounded" alt="first-date"/>
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-3">
                <span>Gallery 2</span>
                <input type="file" name="gallery_2" className="w-fit bg-white outline-none" />
                <div className="w-[120px] h-[100px] bg-red-100 rounded">
                  <img src={DefaultImg} className="w-full h-full object-cover rounded" alt="first-date"/>
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-3">
                <span>Gallery 3</span>
                <input type="file" name="gallery_3" className="w-fit bg-white outline-none" />
                <div className="w-[120px] h-[100px] bg-red-100 rounded">
                  <img src={DefaultImg} className="w-full h-full object-cover rounded" alt="first-date"/>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col desktop:flex-row gap-3">
              <div className="w-full h-full flex flex-col gap-3">
                <span>Gallery 4</span>
                <input type="file" name="gallery_4" className="w-fit bg-white outline-none" />
                <div className="w-[120px] h-[100px] bg-red-100 rounded">
                  <img src={DefaultImg} className="w-full h-full object-cover rounded" alt="first-date"/>
                </div>
              </div>
              <div className="w-full h-full flex flex-col gap-3">
                <span>Gallery 5</span>
                <input type="file" name="gallery_5" className="w-fit bg-white outline-none" />
                <div className="w-[120px] h-[100px] bg-red-100 rounded">
                  <img src={DefaultImg} className="w-full h-full object-cover rounded" alt="first-date"/>
                </div>
              </div>
              <div className="w-full"></div>
            </div>
          </div>

          <div className="w-full min-h-[200px] desktop:min-h-[unset] desktop:h-full flex flex-col desktop:flex-row gap-3 desktop:gap-5">
            <div className="w-full desktop:w-[200px] flex flex-col desktop:flex-row items-center justify-center py-2 rounded border border-sky-900 text-sky-900 cursor-pointer mt-5">Reset</div>
            <div className="w-full flex flex-col desktop:flex-row items-center justify-center py-2 rounded bg-sky-900 text-white cursor-pointer mt-5">Save</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
