
import { useEffect, useRef } from 'react';

import Header from './header';

import Bg from './../../../assets/images/bg-1.png';
import Ceremonial from './../../../assets/images/akad.jpg';
import Party from './../../../assets/images/resepsi.jpeg';
import Traditional from './../../../assets/images/mulung-mantu.jpg';

import Left from './../../../assets/svgs/left.svg';
import Right from './../../../assets/svgs/right.svg';

const EventsSection = (props) => {
  let { getRef }= props;
  const ref = useRef();

  useEffect(() => {
    if (getRef) {
      return getRef(ref);
    } else {
      return {}
    }
  }, [])
  
  return (
    <div ref={ref} className="w-screen min-h-screen relative">
      <img src={Bg} className="w-full h-full absolute top-0 left-0 object-cover opacity-40" alt="bg"/>
      <div className="w-full h-full absolute top-0 left-0 bg-black opacity-30" />

      <Header
        title={'Events'}
        textColor={'text-light-pink'}
        // zIndex={'z-[1]'}
        dropShadow={true}
      />
      
      <div className="w-full desktop:h-full flex flex-col p-5 text-dark-pink tablet:items-center desktop:p-10">

        <div className="w-full h-fit flex flex-col gap-5 font-puppies text-lg desktop:text-2xl tablet:flex-row tablet:w-1/2 desktop:w-full desktop:gap-10">
          <div className="w-full flex flex-row gap-5 desktop:gap-10">
            <div className="w-full h-[70px] bg-light-pink shadow-lg drop-shadow-lg rounded-md flex flex-col items-center justify-between p-2 desktop:px-10 desktop:flex-row">
              <span className="font-bold">Days</span>
              <span className="desktop:text-lg">0</span>
            </div>
            <div className="w-full h-[70px] bg-light-pink shadow-lg drop-shadow-lg rounded-md flex flex-col items-center justify-between p-2 desktop:px-10 desktop:flex-row">
              <span className="font-bold">Hours</span>
              <span className="desktop:text-lg">0</span>
            </div>
          </div>
          <div className="w-full flex flex-row gap-5 desktop:gap-10">
            <div className="w-full h-[70px] bg-light-pink shadow-lg drop-shadow-lg rounded-md flex flex-col items-center justify-between p-2 desktop:px-10 desktop:flex-row">
              <span className="font-bold">Minutes</span>
              <span className="desktop:text-lg">0</span>
            </div>
            <div className="w-full h-[70px] bg-light-pink shadow-lg drop-shadow-lg rounded-md flex flex-col items-center justify-between p-2 desktop:px-10 desktop:flex-row">
              <span className="font-bold">Seconds</span>
              <span className="desktop:text-lg">0</span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-5 mt-5 tablet:items-center desktop:flex-row desktop:gap-10 desktop:mt-10 desktop:items-start desktop:h-full">

          <div className="w-full bg-light-pink rounded-md shadow-lg drop-shadow-lg relative tablet:w-1/2 desktop:w-full desktop:h-full">
            <img src={Left} className="h-[40%] absolute left-0 bottom-0" alt="shape"/>
            <img src={Right} className="h-[40%] absolute right-0 bottom-0 -scale-y-100" alt="shape"/>

            <div className="w-full flex flex-col items-center p-5 gap-5">
              <span className="text-2xl text-center font-imperial-script font-bold">Ceremonial (Akad)</span>
              <img src={Ceremonial} className="w-full desktop:h-[300px] z-[1] object-cover rounded-md border border-dark-pink" alt="bg" />
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex flex-row gap-5 justify-center">
                  <i className="fa-solid fa-calendar-check"></i>
                  <span>Januari 01, 2021</span>
                </div>
                <div className="w-full flex flex-row gap-5 justify-center">
                  <i className="fa-solid fa-clock"></i>
                  <span>09:00 - 10:00</span>
                </div>
              </div>
              <div className="w-full flex flex-row gap-5 justify-center text-sm z-[1]">
                <i className="fa-solid fa-location-dot"></i>
                <span className="text-center">Streen A No 123, 4 Floor</span>
              </div>
              <div className="w-fit transition-all duration-500 ease-in-out flex items-center justify-center px-4 py-2 bg-white text-dark-pink font-bold rounded-md shadow-lg drop-shadow-lg cursor-pointer hover:bg-dark-pink hover:text-white">Open on Maps</div>
            </div>
          </div>

          <div className="w-full bg-light-pink rounded-md shadow-lg drop-shadow-lg relative tablet:w-1/2 desktop:w-full desktop:h-full">
            <img src={Left} className="h-[40%] absolute left-0 bottom-0" alt="shape"/>
            <img src={Right} className="h-[40%] absolute right-0 bottom-0 -scale-y-100" alt="shape"/>

            <div className="w-full flex flex-col items-center p-5 gap-5">
              <span className="text-2xl text-center font-imperial-script font-bold">Party (Resepsi)</span>
              <img src={Party} className="w-full desktop:h-[300px] z-[1] object-cover rounded-md border border-dark-pink" alt="bg" />
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex flex-row gap-5 justify-center">
                  <i className="fa-solid fa-calendar-check"></i>
                  <span>Januari 01, 2021</span>
                </div>
                <div className="w-full flex flex-row gap-5 justify-center">
                  <i className="fa-solid fa-clock"></i>
                  <span>09:00 - 10:00</span>
                </div>
              </div>
              <div className="w-full flex flex-row gap-5 justify-center text-sm z-[1]">
                <i className="fa-solid fa-location-dot"></i>
                <span className="text-center">Streen A No 123, 4 Floor</span>
              </div>
              <div className="w-fit transition-all duration-500 ease-in-out flex items-center justify-center px-4 py-2 bg-white text-dark-pink font-bold rounded-md shadow-lg drop-shadow-lg cursor-pointer hover:bg-dark-pink hover:text-white">Open on Maps</div>
            </div>
          </div>

          <div className="w-full bg-light-pink rounded-md shadow-lg drop-shadow-lg relative tablet:w-1/2 desktop:w-full desktop:h-full">
            <img src={Left} className="h-[40%] absolute left-0 bottom-0" alt="shape"/>
            <img src={Right} className="h-[40%] absolute right-0 bottom-0 -scale-y-100" alt="shape"/>

            <div className="w-full flex flex-col items-center p-5 gap-5">
              <span className="text-2xl text-center font-imperial-script font-bold">Traditional Events</span>
              <img src={Traditional} className="w-full desktop:h-[300px] z-[1] object-cover rounded-md border border-dark-pink" alt="bg" />
              <div className="w-full flex flex-col items-center">
                <div className="w-full flex flex-row gap-5 justify-center">
                  <i className="fa-solid fa-calendar-check"></i>
                  <span>Januari 01, 2021</span>
                </div>
                <div className="w-full flex flex-row gap-5 justify-center">
                  <i className="fa-solid fa-clock"></i>
                  <span>09:00 - 10:00</span>
                </div>
              </div>
              <div className="w-full flex flex-row gap-5 justify-center text-sm z-[1]">
                <i className="fa-solid fa-location-dot"></i>
                <span className="text-center">Streen A No 123, 4 Floor</span>
              </div>
              <div className="w-fit transition-all duration-500 ease-in-out flex items-center justify-center px-4 py-2 bg-white text-dark-pink font-bold rounded-md shadow-lg drop-shadow-lg cursor-pointer hover:bg-dark-pink hover:text-white">Open on Maps</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default EventsSection;