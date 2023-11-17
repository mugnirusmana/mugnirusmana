import React from 'react';

import Header from './header';

import Gallery1 from './../../../assets/images/bg-2.png';
import Gallery2 from './../../../assets/images/bg-1.png';
import Gallery3 from './../../../assets/images/first-date.png';
import Gallery4 from './../../../assets/images/first-meet.png';
import Gallery5 from './../../../assets/images/engagement.png';

import Left from './../../../assets/svgs/left.svg';
import Right from './../../../assets/svgs/right.svg';
import Shape8 from './../../../assets/svgs/shape8.svg';
import Shape9 from './../../../assets/svgs/shape9.svg';

const GallerySection = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className="w-screen min-h-screen tablet:h-screen flex flex-col bg-light-pink relative">
      <Header
        title={'Gallery'}
        textColor={'text-dark-pink'}
        zIndex={'z-[1]'}
      />

      <img src={Shape9} className="w-[28%] absolute left-2 top-2 -scale-y-100" alt="shape" />
      <img src={Shape8} className="w-[30%] absolute left-0 top-0 -scale-y-100" alt="shape" />

      <img src={Shape9} className="w-[18%] absolute right-2 bottom-2 -scale-x-100" alt="shape" />
      <img src={Shape8} className="w-[20%] absolute right-0 bottom-0 -scale-x-100" alt="shape" />

      <img src={Left} className="h-[60%] absolute left-0 top-0 -scale-y-100" alt="shape"/>
      <img src={Right} className="h-[60%] absolute right-0 bottom-0 -scale-y-100" alt="shape"/>

      <div className="w-full h-full flex flex-row px-5 pb-5 tablet:px-20 desktop:px-32 z-[1]">
        <div className="w-full h-full flex flex-col desktop:flex-row rounded-md shadow-lg drop-shadow-lg">
          <div className="w-full h-full backdrop-blur-lg">
            <img src={Gallery1} className="w-full h-[400px] tablet:h-full object-cover transition-all duration-300 ease-in-out opacity-90 grayscale hover:grayscale-0 hover:opacity-100 cursor-pointer rounded-tl-md rounded-tr-md desktop:rounded-tr-none desktop:rounded-bl-md" alt="gallery" />
          </div>
          <div className="w-full h-full flex flex-col tablet:flex-col">
            <div className="w-full h-full flex flex-col tablet:flex-row">
              <div className="w-full h-full backdrop-blur-lg">
                <img src={Gallery2} className="w-full h-[400px] tablet:h-full object-cover transition-all duration-300 ease-in-out opacity-90 grayscale hover:grayscale-0 hover:opacity-100 cursor-pointer" alt="gallery" />
              </div>
              <div className="w-full h-full backdrop-blur-lg">
                <img src={Gallery3} className="w-full h-[400px] tablet:h-full object-cover transition-all duration-300 ease-in-out opacity-90 grayscale hover:grayscale-0 hover:opacity-100 cursor-pointer desktop:rounded-tr-md" alt="gallery" />
              </div>
            </div>
            <div className="w-full h-full flex flex-col tablet:flex-row">
              <div className="w-full h-full backdrop-blur-lg">
                <img src={Gallery4} className="w-full h-[400px] tablet:h-full object-cover transition-all duration-300 ease-in-out opacity-90 grayscale hover:grayscale-0 hover:opacity-100 cursor-pointer tablet:rounded-bl-md desktop:rounded-bl-none" alt="gallery" />
              </div>
              <div className="w-full h-full backdrop-blur-lg">
                <img src={Gallery5} className="w-full h-[400px] tablet:h-full object-cover transition-all duration-300 ease-in-out opacity-90 grayscale hover:grayscale-0 hover:opacity-100 cursor-pointer rounded-bl-md rounded-br-md tablet:rounded-bl-none" alt="gallery" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default GallerySection;