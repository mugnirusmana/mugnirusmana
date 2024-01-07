import React from 'react';

import Header from './header';

import Default from './../../../assets/images/defaul-img.png';

import Left from './../../../assets/svgs/left.svg';
import Right from './../../../assets/svgs/right.svg';
import Shape8 from './../../../assets/svgs/shape8.svg';
import Shape9 from './../../../assets/svgs/shape9.svg';

const BridesmaidsGroomsmanSection = React.forwardRef((props, ref) => {
  let { data, onShowModalImage } = props;

  return (
    <div ref={ref} className="w-screen min-h-screen relative bg-light-pink flex flex-col">
      <Header
        title={'Bridesmaids & Groomsman'}
        textColor={'text-dark-pink'}
      />

      <img src={Shape9} className="w-[28%] absolute left-2 bottom-2" alt="shape" />
      <img src={Shape8} className="w-[30%] absolute left-0 bottom-0" alt="shape" />

      <img src={Shape9} className="w-[18%] absolute right-2 top-2 -scale-x-100 -scale-y-100" alt="shape" />
      <img src={Shape8} className="w-[20%] absolute right-0 top-0 -scale-x-100 -scale-y-100" alt="shape" />

      <img src={Left} className="h-[60%] absolute left-0 bottom-0" alt="shape"/>
      <img src={Right} className="h-[50%] absolute right-0 top-0" alt="shape"/>

      <div className="w-full h-full flex flex-col gap-5 desktop:gap-10 px-5 pb-5 desktop:px-32 desktop:pb-20 z-[1]">
        <div className="w-full h-full flex flex-col tablet:flex-row gap-5 desktop:gap-10">
          <div className="w-full h-full flex flex-col bg-white rounded-md p-3 gap-3 items-center text-dark-pink shadow-lg">
            {data?.accompanist_pircue_1 ? (
              <img src={data?.accompanist_pircue_1} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink cursor-pointer" alt="bridesmaids-groomsman" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            ) : (
              <img src={Default} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink cursor-pointer" alt="bridesmaids-groomsman" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            )}
            <div className="w-full flex flex-col items-center justify-center">
              <span className="font-whisper text-2xl font-bold">{data?.accompanist_fullname_1 && data?.accompanist_fullname_1 !== "" ? data?.accompanist_fullname_1 : "-"}</span>
              <span className="font-bold text-sm">{data?.accompanist_status_1 && data?.accompanist_status_1 !== "" ? data?.accompanist_status_1 : "-"}</span>
            </div>
            <span className="text-xs">{data?.accompanist_type_1 && data?.accompanist_type_1 !== "" ? data?.accompanist_type_1 : "-"}</span>
            <div className="w-full min-h-[30px] flex flex-row items-center justify-center gap-3">
              {data?.accompanist_tiktok_1 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_tiktok_1, '_blank')}
              >
                <i className="fa-brands fa-tiktok"></i>
              </div>
              ) : null}
              {data?.accompanist_facebook_1 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_facebook_1, '_blank')}
              >
                <i className="fa-brands fa-facebook"></i>
              </div>
              ) : null}
              {data?.accompanist_instagram_1 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_instagram_1, '_blank')}
              >
                <i className="fa-brands fa-instagram"></i>
              </div>
              ) : null}
            </div>
          </div>
          <div className="w-full h-full flex flex-col bg-white rounded-md p-3 gap-3 items-center text-dark-pink shadow-lg">
            {data?.accompanist_pircue_2 ? (
              <img src={data?.accompanist_pircue_2} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink cursor-pointer" alt="bridesmaids-groomsman" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            ) : (
              <img src={Default} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink cursor-pointer" alt="bridesmaids-groomsman" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            )}
            <div className="w-full flex flex-col items-center justify-center">
              <span className="font-whisper text-2xl font-bold">{data?.accompanist_fullname_2 && data?.accompanist_fullname_2 !== "" ? data?.accompanist_fullname_2 : "-"}</span>
              <span className="font-bold text-sm">{data?.accompanist_status_2 && data?.accompanist_status_2 !== "" ? data?.accompanist_status_2 : "-"}</span>
            </div>
            <span className="text-xs">{data?.accompanist_type_2 && data?.accompanist_type_2 !== "" ? data?.accompanist_type_2 : "-"}</span>
            <div className="w-full min-h-[30px] flex flex-row items-center justify-center gap-3">
              {data?.accompanist_tiktok_2 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_tiktok_2, '_blank')}
              >
                <i className="fa-brands fa-tiktok"></i>
              </div>
              ) : null}
              {data?.accompanist_facebook_2 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_facebook_2, '_blank')}
              >
                <i className="fa-brands fa-facebook"></i>
              </div>
              ) : null}
              {data?.accompanist_instagram_2 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_instagram_2, '_blank')}
              >
                <i className="fa-brands fa-instagram"></i>
              </div>
              ) : null}
            </div>
          </div>
          <div className="w-full h-full flex flex-col bg-white rounded-md p-3 gap-3 items-center text-dark-pink shadow-lg">
            {data?.accompanist_pircue_3 ? (
              <img src={data?.accompanist_pircue_3} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink cursor-pointer" alt="bridesmaids-groomsman" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            ) : (
              <img src={Default} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink cursor-pointer" alt="bridesmaids-groomsman" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            )}
            <div className="w-full flex flex-col items-center justify-center">
              <span className="font-whisper text-2xl font-bold">{data?.accompanist_fullname_3 && data?.accompanist_fullname_3 !== "" ? data?.accompanist_fullname_3 : "-"}</span>
              <span className="font-bold text-sm">{data?.accompanist_status_3 && data?.accompanist_status_3 !== "" ? data?.accompanist_status_3 : "-"}</span>
            </div>
            <span className="text-xs">{data?.accompanist_type_3 && data?.accompanist_type_3 !== "" ? data?.accompanist_type_3 : "-"}</span>
            <div className="w-full min-h-[30px] flex flex-row items-center justify-center gap-3">
              {data?.accompanist_tiktok_3 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_tiktok_3, '_blank')}
              >
                <i className="fa-brands fa-tiktok"></i>
              </div>
              ) : null}
              {data?.accompanist_facebook_3 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_facebook_3, '_blank')}
              >
                <i className="fa-brands fa-facebook"></i>
              </div>
              ) : null}
              {data?.accompanist_instagram_3 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_instagram_3, '_blank')}
              >
                <i className="fa-brands fa-instagram"></i>
              </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="w-full h-full flex flex-col tablet:flex-row gap-5 desktop:gap-10">
          <div className="w-full h-full flex flex-col bg-white rounded-md p-3 gap-3 items-center text-dark-pink shadow-lg">
            {data?.accompanist_pircue_4 ? (
              <img src={data?.accompanist_pircue_4} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink cursor-pointer" alt="bridesmaids-groomsman" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            ) : (
              <img src={Default} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink cursor-pointer" alt="bridesmaids-groomsman" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            )}
            <div className="w-full flex flex-col items-center justify-center">
              <span className="font-whisper text-2xl font-bold">{data?.accompanist_fullname_4 && data?.accompanist_fullname_4 !== "" ? data?.accompanist_fullname_4 : "-"}</span>
              <span className="font-bold text-sm">{data?.accompanist_status_4 && data?.accompanist_status_4 !== "" ? data?.accompanist_status_4 : "-"}</span>
            </div>
            <span className="text-xs">{data?.accompanist_type_4 && data?.accompanist_type_4 !== "" ? data?.accompanist_type_4 : "-"}</span>
            <div className="w-full min-h-[30px] flex flex-row items-center justify-center gap-3">
              {data?.accompanist_tiktok_4 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_tiktok_4, '_blank')}
              >
                <i className="fa-brands fa-tiktok"></i>
              </div>
              ) : null}
              {data?.accompanist_facebook_4 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_facebook_4, '_blank')}
              >
                <i className="fa-brands fa-facebook"></i>
              </div>
              ) : null}
              {data?.accompanist_instagram_4 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_instagram_4, '_blank')}
              >
                <i className="fa-brands fa-instagram"></i>
              </div>
              ) : null}
            </div>
          </div>
          <div className="w-full h-full flex flex-col bg-white rounded-md p-3 gap-3 items-center text-dark-pink shadow-lg">
            {data?.accompanist_pircue_5 ? (
              <img src={data?.accompanist_pircue_5} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink cursor-pointer" alt="bridesmaids-groomsman" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            ) : (
              <img src={Default} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink cursor-pointer" alt="bridesmaids-groomsman" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            )}
            <div className="w-full flex flex-col items-center justify-center">
              <span className="font-whisper text-2xl font-bold">{data?.accompanist_fullname_5 && data?.accompanist_fullname_5 !== "" ? data?.accompanist_fullname_5 : "-"}</span>
              <span className="font-bold text-sm">{data?.accompanist_status_5 && data?.accompanist_status_5 !== "" ? data?.accompanist_status_5 : "-"}</span>
            </div>
            <span className="text-xs">{data?.accompanist_type_5 && data?.accompanist_type_5 !== "" ? data?.accompanist_type_5 : "-"}</span>
            <div className="w-full min-h-[30px] flex flex-row items-center justify-center gap-3">
              {data?.accompanist_tiktok_5 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_tiktok_5, '_blank')}
              >
                <i className="fa-brands fa-tiktok"></i>
              </div>
              ) : null}
              {data?.accompanist_facebook_5 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_facebook_5, '_blank')}
              >
                <i className="fa-brands fa-facebook"></i>
              </div>
              ) : null}
              {data?.accompanist_instagram_5 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_instagram_5, '_blank')}
              >
                <i className="fa-brands fa-instagram"></i>
              </div>
              ) : null}
            </div>
          </div>
          <div className="w-full h-full flex flex-col bg-white rounded-md p-3 gap-3 items-center text-dark-pink shadow-lg">
            {data?.accompanist_pircue_6 ? (
              <img src={data?.accompanist_pircue_6} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink cursor-pointer" alt="bridesmaids-groomsman" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            ) : (
              <img src={Default} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink cursor-pointer" alt="bridesmaids-groomsman" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            )}
            <div className="w-full flex flex-col items-center justify-center">
              <span className="font-whisper text-2xl font-bold">{data?.accompanist_fullname_6 && data?.accompanist_fullname_6 !== "" ? data?.accompanist_fullname_6 : "-"}</span>
              <span className="font-bold text-sm">{data?.accompanist_status_6 && data?.accompanist_status_6 !== "" ? data?.accompanist_status_6 : "-"}</span>
            </div>
            <span className="text-xs">{data?.accompanist_type_6 && data?.accompanist_type_6 !== "" ? data?.accompanist_type_6 : "-"}</span>
            <div className="w-full min-h-[30px] flex flex-row items-center justify-center gap-3">
              {data?.accompanist_tiktok_6 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_tiktok_6, '_blank')}
              >
                <i className="fa-brands fa-tiktok"></i>
              </div>
              ) : null}
              {data?.accompanist_facebook_6 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_facebook_6, '_blank')}
              >
                <i className="fa-brands fa-facebook"></i>
              </div>
              ) : null}
              {data?.accompanist_instagram_6 ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.accompanist_instagram_6, '_blank')}
              >
                <i className="fa-brands fa-instagram"></i>
              </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

export default BridesmaidsGroomsmanSection;