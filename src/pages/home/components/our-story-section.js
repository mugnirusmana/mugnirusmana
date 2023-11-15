import { useEffect, useRef } from 'react';

import Header from './header';

import FirstMeet from './../../../assets/images/first-meet.png';
import FirsDate from './../../../assets/images/first-date.png';
import Engagement from './../../../assets/images/engagement.png';

import Right from './../../../assets/svgs/right.svg';
import Left from './../../../assets/svgs/left.svg';
import Shape11 from './../../../assets/svgs/shape11.svg';

const OurStorySection = (props) => {
  let { getRef }= props;
  const ref = useRef()

  useEffect(() => {
    if(getRef) {
      return getRef(ref);
    }
  }, [])

  return (
    <div ref={ref} className="w-screen min-h-screen bg-light-pink pb-5 tablet:pb-20 flex flex-col relative">
      <Header
        title={'Our Story'}
        textColor={'text-dark-pink'}
        bgColor={'bg-light-pink'}
        zIndex={'z-[1]'}
        shadow={true}
        dropShadow={true}
      />

      <div className="w-screen min-h-screen flex flex-col items-center gap-2 mt-10 desktop:mt-0">

        <img src={Shape11} className="h-[10%] desktop:h-[20%] hidden tablet:block absolute right-0 bottom-16 -scale-x-100" alt="shape" />
        <img src={Shape11} className="h-[10%] desktop:h-[20%] hidden tablet:block absolute left-0 top-16 -scale-x-100  -scale-y-100" alt="shape" />
        <img src={Right} className="h-[50%] hidden tablet:block absolute right-0 top-0" alt="shape" />
        <img src={Left} className="h-[50%] hidden tablet:block absolute left-0 bottom-0" alt="shape" />
        
        <div className="w-[10px] h-full border-r-4 border-dashed border-r-dark-pink absolute left-24 mobile-md:left-32 tablet:left-72 top-0 desktop:rotate-[10deg] desktop:left-auto desktop:top-3"></div>
        <div className="w-[10px] h-full border-l-4 border-dashed border-l-dark-pink absolute right-24 mobile-md:right-32 tablet:right-72 top-0 desktop:rotate-[-10deg] desktop:right-auto desktop:top-3"></div>
        
        <div className="w-full tablet:w-[60%] desktop:w-[60%] flex flex-col justify-center items-center relative p-5 gap-5 z-[1]">
          <div className="w-full flex flex-col desktop:flex-row-reverse relative p-5 rounded-md bg-white shadow-lg drop-shadow-lg gap-5 desktop:items-center desktop:gap-16 desktop:pl-16">
            <img src={FirstMeet} className="w-full desktop:w-[500px] desktop:h-[400px] object-cover rounded-md" alt="first-meet" />
            <div className="w-full desktop:h-fit flex flex-col gap-5">
              <span className="font-bold font-dancing-script text-xl text-dark-pink desktop:text-4xl desktop:text-right block desktop:hidden">First Meet ~</span>
              <span className="font-bold font-dancing-script text-xl text-dark-pink desktop:text-4xl desktop:text-right desktop:block hidden">~ First Meet</span>
              <span className="text-justify desktop:text-right">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
            </div>
          </div>

          <div className="w-[65px] h-[65px] desktop:w-[100px] desktop:h-[100px] desktop:text-lg rounded-full flex flex-col items-center justify-center bg-dark-pink text-white absolute top-2 right-2 text-xs desktop:top-0 desktop:right-0 drop-shadow-lg shadow-lg">
            <span className="font-bold">Jan</span>
            <span>2021</span>
          </div>
        </div>

        <div className="w-full tablet:w-[60%] desktop:w-[60%] flex flex-col justify-center items-center relative p-5 gap-5 z-[1]">
          <div className="w-full flex flex-col desktop:flex-row relative p-5 rounded-md bg-white shadow-lg drop-shadow-lg gap-5 desktop:items-center desktop:gap-16 desktop:pr-16">
            <img src={FirsDate} className="w-full desktop:w-[500px] desktop:h-[400px] object-cover rounded-md" alt="engagement" />
            <div className="w-full desktop:h-fit flex flex-col gap-5">
              <span className="font-bold font-dancing-script text-xl text-dark-pink desktop:text-4xl desktop:text-left">First Date ~</span>
              <span className="text-justify desktop:text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
            </div>
          </div>

          <div className="w-[65px] h-[65px] desktop:w-[100px] desktop:h-[100px] desktop:text-lg rounded-full flex flex-col items-center justify-center bg-dark-pink text-white absolute top-2 left-2 text-xs desktop:top-0 desktop:left-0 drop-shadow-lg shadow-lg">
            <span className="font-bold">Jan</span>
            <span>2021</span>
          </div>
        </div>

        <div className="w-full tablet:w-[60%] desktop:w-[60%] flex flex-col justify-center items-center relative p-5 gap-5 z-[1]">
          <div className="w-full flex flex-col desktop:flex-row-reverse relative p-5 rounded-md bg-white shadow-lg drop-shadow-lg gap-5 desktop:items-center desktop:gap-16 desktop:pl-16">
            <img src={Engagement} className="w-full desktop:w-[500px] desktop:h-[400px] object-cover rounded-md" alt="engagement" />
            <div className="w-full desktop:h-fit flex flex-col gap-5">
              <span className="font-bold font-dancing-script text-xl text-dark-pink desktop:text-4xl desktop:text-right block desktop:hidden">Engagement ~</span>
              <span className="font-bold font-dancing-script text-xl text-dark-pink desktop:text-4xl desktop:text-right desktop:block hidden">~ Engagement</span>
              <span className="text-justify desktop:text-right">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</span>
            </div>
          </div>

          <div className="w-[65px] h-[65px] desktop:w-[100px] desktop:h-[100px] desktop:text-lg rounded-full flex flex-col items-center justify-center bg-dark-pink text-white absolute top-2 right-2 text-xs desktop:top-0 desktop:right-0 drop-shadow-lg shadow-lg">
            <span className="font-bold">Jan</span>
            <span>2021</span>
          </div>
        </div>

      </div>
    </div>
  )
}

export default OurStorySection;