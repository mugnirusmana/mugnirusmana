import React from 'react';

import Header from './header';

import Left from './../../../assets/svgs/left.svg';
import Right from './../../../assets/svgs/right.svg';
import Shape10 from './../../../assets/svgs/shape10.svg';
import Shape11 from './../../../assets/svgs/shape11.svg';

import Bg from './../../../assets/images/bg-2.png';
import Groom from './../../../assets/images/groom-profile.png';
import Bride from './../../../assets/images/bride-profile.png';

const AboutUsSection = React.forwardRef((props, ref) => {

  return (
    <div ref={ref} className="w-screen min-h-screen tablet-lg:h-screen flex flex-col gap-5 relative">
      <Header
        title={'About Us'}
        textColor={'text-light-pink'}
        zIndex={'z-[1]'}
        dropShadow={true}
      />

      <img src={Bg} className="w-full h-full absolute top-0 left-0 object-cover opacity-40" alt="bg"/>
      <div className="w-full h-full absolute top-0 left-0 bg-black opacity-30" />

      <div className="w-full h-full flex flex-col z-[1] items-center gap-5 pb-5 tablet:pb-20 desktop:flex-row desktop:px-20 desktop:pb-32">
        <div className="w-[80%] tablet:w-1/2 desktop:w-full h-full bg-light-pink rounded-md shadow-lg flex flex-col-reverse items-center p-5 tablet:p-10 relative desktop:flex-row-reverse desktop:gap-5">
          <img src={Groom} className="w-[80px] h-[80px] tablet:w-[200px] tablet:h-[200px] rounded-full object-cover mt-5 border-4 border-dark-pink z-[1]" alt="groom"/>
          <div className="w-full flex flex-col items-center desktop:items-end text-dark-pink z-[1]">
            <span className="font-estonia font-bold text-4xl text-center desktop:text-right">Ade Mugni Rusmana</span>
            <span className="font-whisper text-2xl text-center desktop:text-right mb-5">~Ade~</span>
            <span className="font-ruluko text-center desktop:text-right text-black mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
            <div className='w-fit flex flex-row items-center justify-center gap-3'>
              <div className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social">
                <i className="fa-brands fa-tiktok"></i>
              </div>
              <div className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social">
                <i className="fa-brands fa-facebook"></i>
              </div>
              <div className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social">
                <i className="fa-brands fa-instagram"></i>
              </div>
            </div>
          </div>

          <img src={Right} className="h-[70%] absolute right-0 top-0 desktop:-scale-y-100 desktop:top-[unset] desktop:bottom-0" alt="shape" />
          <img src={Shape10} className="h-[30%] absolute left-0 top-0 -scale-y-100" alt="shape" />
          <img src={Shape11} className="h-[30%] absolute left-0 bottom-0" alt="shape" />
        </div>

        <i className="fa-solid fa-heart text-light-pink hidden tablet:block px-5 text-4xl"></i>

        <div className="w-[80%] tablet:w-1/2 desktop:w-full h-full bg-light-pink rounded-md shadow-lg flex flex-col items-center p-5 tablet:p-10 relative desktop:flex-row desktop:gap-5">
          <img src={Bride} className="w-[80px] h-[80px] tablet:w-[200px] tablet:h-[200px] rounded-full object-cover mt-5 border-4 border-dark-pink z-[1]" alt="groom"/>
          <div className="w-full flex flex-col items-center desktop:items-start text-dark-pink z-[1]">
            <span className="font-estonia font-bold text-4xl text-center desktop:text-left">Nova Helmyna</span>
            <span className="font-whisper text-2xl text-center desktop:text-left mb-5">~Nova~</span>
            <span className="font-ruluko text-center desktop:text-left text-black mb-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
            <div className='w-fit flex flex-row items-center justify-center gap-3'>
              <div className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social">
                <i className="fa-brands fa-tiktok"></i>
              </div>
              <div className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social">
                <i className="fa-brands fa-facebook"></i>
              </div>
              <div className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-dark-pink text-dark-pink hover:bg-dark-pink hover:text-white flex flex-row items-center justify-center text-xs open-social">
                <i className="fa-brands fa-instagram"></i>
              </div>
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