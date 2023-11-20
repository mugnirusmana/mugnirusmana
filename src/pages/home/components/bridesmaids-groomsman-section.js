import React from 'react';

import Header from './header';

import Bestfiend from './../../../assets/images/maid-men.png';
import Cousin from './../../../assets/images/bride-profile.png';
import Nephew from './../../../assets/images/groom-profile.png';

import Left from './../../../assets/svgs/left.svg';
import Right from './../../../assets/svgs/right.svg';
import Shape8 from './../../../assets/svgs/shape8.svg';
import Shape9 from './../../../assets/svgs/shape9.svg';

const BridesmaidsGroomsmanSection = React.forwardRef((props, ref) => {

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
            <img src={Bestfiend} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink" alt="bridesmaids-groomsman" />
            <div className="w-full flex flex-col items-center justify-center">
              <span className="font-imperial-script text-2xl font-bold">Jane Doe</span>
              <span className="font-bold text-sm">Bridesmaids</span>
            </div>
            <span className="text-xs">Friend</span>
            <div className="w-full flex flex-row items-center justify-center gap-3">
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
          <div className="w-full h-full flex flex-col bg-white rounded-md p-3 gap-3 items-center text-dark-pink shadow-lg">
            <img src={Nephew} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink" alt="bridesmaids-groomsman" />
            <div className="w-full flex flex-col items-center justify-center">
              <span className="font-imperial-script text-2xl font-bold">Jane Doe</span>
              <span className="font-bold text-sm">Bridesmaids</span>
            </div>
            <span className="text-xs">Cousin</span>
            <div className="w-full flex flex-row items-center justify-center gap-3">
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
          <div className="w-full h-full flex flex-col bg-white rounded-md p-3 gap-3 items-center text-dark-pink shadow-lg">
            <img src={Cousin} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink" alt="bridesmaids-groomsman" />
            <div className="w-full flex flex-col items-center justify-center">
              <span className="font-imperial-script text-2xl font-bold">Jane Doe</span>
              <span className="font-bold text-sm">Bridesmaids</span>
            </div>
            <span className="text-xs">Nephew</span>
            <div className="w-full flex flex-row items-center justify-center gap-3">
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
        </div>
        <div className="w-full h-full flex flex-col tablet:flex-row gap-5 desktop:gap-10">
          <div className="w-full h-full flex flex-col bg-white rounded-md p-3 gap-3 items-center text-dark-pink shadow-lg">
            <img src={Nephew} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink" alt="bridesmaids-groomsman" />
            <div className="w-full flex flex-col items-center justify-center">
              <span className="font-imperial-script text-2xl font-bold">Jane Doe</span>
              <span className="font-bold text-sm">Bridesmaids</span>
            </div>
            <span className="text-xs">Friend</span>
            <div className="w-full flex flex-row items-center justify-center gap-3">
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
          <div className="w-full h-full flex flex-col bg-white rounded-md p-3 gap-3 items-center text-dark-pink shadow-lg">
            <img src={Cousin} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink" alt="bridesmaids-groomsman" />
            <div className="w-full flex flex-col items-center justify-center">
              <span className="font-imperial-script text-2xl font-bold">Jane Doe</span>
              <span className="font-bold text-sm">Bridesmaids</span>
            </div>
            <span className="text-xs">Cousin</span>
            <div className="w-full flex flex-row items-center justify-center gap-3">
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
          <div className="w-full h-full flex flex-col bg-white rounded-md p-3 gap-3 items-center text-dark-pink shadow-lg">
            <img src={Bestfiend} className="w-full h-[200px] mobile-md:h-[300px] desktop:h-[400px] object-cover rounded-md border border-dark-pink" alt="bridesmaids-groomsman" />
            <div className="w-full flex flex-col items-center justify-center">
              <span className="font-imperial-script text-2xl font-bold">Jane Doe</span>
              <span className="font-bold text-sm">Bridesmaids</span>
            </div>
            <span className="text-xs">Nephew</span>
            <div className="w-full flex flex-row items-center justify-center gap-3">
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
        </div>
      </div>
    </div>
  )
})

export default BridesmaidsGroomsmanSection;