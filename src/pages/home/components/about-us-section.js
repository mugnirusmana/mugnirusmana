import React from 'react';

import Header from './header';

import Left from './../../../assets/svgs/left.svg';
import Right from './../../../assets/svgs/right.svg';
import Shape10 from './../../../assets/svgs/shape10.svg';
import Shape11 from './../../../assets/svgs/shape11.svg';

import Default from './../../../assets/images/defaul-img.png';

const AboutUsSection = React.forwardRef((props, ref) => {
  let { data, onShowModalImage } = props;

  return (
    <div ref={ref} className="w-screen min-h-screen tablet-lg:h-screen flex flex-col gap-5 relative">
      <Header
        title={'About Us'}
        textColor={'text-light-pink'}
        zIndex={'z-[1]'}
        dropShadow={true}
      />

      {data?.about_us_bg ? (
        <img src={data?.about_us_bg} className="w-full h-full absolute top-0 left-0 object-cover opacity-40" alt="bg"/>
      ) : (
        <img src={Default} className="w-full h-full absolute top-0 left-0 object-cover opacity-40" alt="bg"/>
      )}
      <div className="w-full h-full absolute top-0 left-0 bg-black opacity-30" />

      <div className="w-full h-full flex flex-col z-[1] items-center gap-5 pb-5 tablet:pb-20 desktop:flex-row desktop:px-20 desktop:pb-32">
        <div className="w-[80%] tablet:w-1/2 desktop:w-full h-full bg-light-pink rounded-md shadow-lg flex flex-col-reverse items-center p-5 tablet:p-10 relative desktop:flex-row-reverse desktop:gap-5">
          {data?.groom_picture ? (
            <img src={data?.groom_picture} className="w-[80px] h-[80px] tablet:w-[200px] tablet:h-[200px] rounded-full object-cover mt-5 border-4 border-dark-pink z-[1] cursor-pointer" alt="groom" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}}/>
          ) : (
            <img src={Default} className="w-[80px] h-[80px] tablet:w-[200px] tablet:h-[200px] rounded-full object-cover mt-5 border-4 border-dark-pink z-[1] cursor-pointer" alt="groom" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}}/>
          )}
          <div className="w-full flex flex-col items-center desktop:items-end text-dark-pink z-[1]">
            <span className="font-estonia font-bold text-4xl text-center desktop:text-right">{data?.groom_fullname && data?.groom_fullname !== "" ? data?.groom_fullname : '-'}</span>
            <span className="font-whisper text-2xl text-center desktop:text-right mb-5">~{data?.groom_nickname && data?.groom_nickname !== "" ? data?.groom_nickname : '-'}~</span>
            <span className="font-ruluko text-center desktop:text-right text-black mb-5">{data?.groom_about && data?.groom_about !== "" ? data?.groom_about : '-'}</span>
            <div className='w-fit min-h-[30px] flex flex-row items-center justify-center gap-3'>
              {data?.groom_tiktok ? (
                <div
                  className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                  onClick={() => window.open(data?.groom_tiktok, '_blank')}
                >
                  <i className="fa-brands fa-tiktok"></i>
                </div>
              ) : null}
              {data?.groom_facebook ? (
                <div
                  className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                  onClick={() => window.open(data?.groom_facebook, '_blank')}
                >
                  <i className="fa-brands fa-facebook"></i>
                </div>
              ) : null}
              {data?.groom_instagram ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.groom_instagram, '_blank')}
              >
                <i className="fa-brands fa-instagram"></i>
              </div>
              ) : null}
            </div>
          </div>

          <img src={Right} className="h-[70%] absolute right-0 top-0 desktop:-scale-y-100 desktop:top-[unset] desktop:bottom-0" alt="shape" />
          <img src={Shape10} className="h-[30%] absolute left-0 top-0 -scale-y-100" alt="shape" />
          <img src={Shape11} className="h-[30%] absolute left-0 bottom-0" alt="shape" />
        </div>

        <i className="fa-solid fa-heart text-light-pink hidden tablet:block px-5 text-4xl"></i>

        <div className="w-[80%] tablet:w-1/2 desktop:w-full h-full bg-light-pink rounded-md shadow-lg flex flex-col items-center p-5 tablet:p-10 relative desktop:flex-row desktop:gap-5">
          {data?.bride_picture ? (
            <img src={data?.bride_picture} className="w-[80px] h-[80px] tablet:w-[200px] tablet:h-[200px] rounded-full object-cover mt-5 border-4 border-dark-pink z-[1] cursor-pointer" alt="brides" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}}/>            
          ) : (
            <img src={Default} className="w-[80px] h-[80px] tablet:w-[200px] tablet:h-[200px] rounded-full object-cover mt-5 border-4 border-dark-pink z-[1] cursor-pointer" alt="brides" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}}/>
          )}
          <div className="w-full flex flex-col items-center desktop:items-start text-dark-pink z-[1]">
            <span className="font-estonia font-bold text-4xl text-center desktop:text-left">{data.bride_fullname && data.bride_fullname !== "" ? data.bride_fullname : '-'}</span>
            <span className="font-whisper text-2xl text-center desktop:text-left mb-5">~{data?.bride_nickname && data?.bride_nickname !== "" ? data?.bride_nickname : '-'}~</span>
            <span className="font-ruluko text-center desktop:text-left text-black mb-5">{data?.bride_about && data?.bride_about !== "" ? data?.bride_about : '-'}</span>
            <div className='w-fit min-h-[30px] flex flex-row items-center justify-center gap-3'>
              {data?.bride_tiktok ? (
                <div
                  className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                  onClick={() => window.open(data?.bride_tiktok, '_blank')}
                >
                  <i className="fa-brands fa-tiktok"></i>
                </div>
              ) : null}
              {data?.bride_facebook ? (
                <div
                  className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                  onClick={() => window.open(data?.bride_facebook, '_blank')}
                >
                  <i className="fa-brands fa-facebook"></i>
                </div>
              ) : null}
              {data?.bride_instagram ? (
              <div
                className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social"
                onClick={() => window.open(data?.bride_instagram, '_blank')}
              >
                <i className="fa-brands fa-instagram"></i>
              </div>
              ) : null}
            </div>
          </div>

          <img src={Left} className="h-[70%] absolute left-0 bottom-0" alt="shape" />
          <img src={Shape10} className="h-[30%] absolute right-0 top-0 -scale-y-100 -scale-x-100" alt="shape" />
          <img src={Shape11} className="h-[30%] absolute right-0 bottom-0 -scale-x-100" alt="shape" />
        </div>

      </div>
    </div>
  )
})

export default AboutUsSection;