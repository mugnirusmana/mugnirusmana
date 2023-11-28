import React from 'react';

import Shape2 from './../../../assets/svgs/shape2.svg';
import Shape3DarkPink from './../../../assets/svgs/shape3-dark-pink.svg';
import Shape5DarkPink from './../../../assets/svgs/shape5-dark-pink.svg';
import Shape7 from './../../../assets/svgs/shape7.svg';
import Shape8 from './../../../assets/svgs/shape8.svg';
import Shape9 from './../../../assets/svgs/shape9.svg';
import Left from './../../../assets/svgs/left.svg';
import Right from './../../../assets/svgs/right.svg';

import Couple from './../../../assets/images/bg-2.png';
import Groom from './../../../assets/images/groom-profile.png';
import Bride from './../../../assets/images/bride-profile.png';

const HomeSection = React.forwardRef((props, ref) => {
  let {
    onClickDown,
    onShowModalImage,
  } = props;

  return (
    <div
      ref={ref}
      className="w-screen min-h-screen h-screen bg-light-pink text-dark-pink flex flex-col-reverse desktop:flex-row items-center justify-center relative gap-10"
    >
      <div className="w-fit h-fit flex flex-row items-center justify-center relative mb-24 mobile-md:mb-36 mobile-lg:mb-52 desktop:mb-[unset] desktop:ml-60 desktop:mr-20 z-[1] desktop:mt-20">
        <img src={Couple} className="w-[150px] h-[150px] tablet:w-[250px] tablet:h-[250px] desktop:w-[350px] desktop:h-[350px] rounded-full object-cover border-4 border-dark-pink cursor-pointer" alt="couple" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />

        <img src={Shape2} className="h-[80px] tablet:h-[130px] desktop:h-[230px] top-10 -left-5 tablet:top-20 tablet:-left-10 absolute desktop:top-10 desktop:-left-20 -scale-y-100 -scale-x-100" alt="shape"/>
        <img src={Shape5DarkPink} className="h-[130px] tablet:h-[180px] desktop:h-[230px] top-10 -left-10 tablet:top-20 tablet:-left-16 absolute desktop:top-20 desktop:-left-24 -scale-y-100 rotate-[10deg]" alt="shape"/>
        <img src={Shape3DarkPink} className="h-[80px] tablet:h-[130px] desktop:h-[150px] absolute -top-14 left-8 tablet:-top-20 tablet:left-10 desktop:-top-32 desktop:left-20 -scale-x-100 rotate-[50deg]" alt="shape"/>
        <img src={Groom} className="w-[100px] h-[100px] tablet:w-[150px] tablet:h-[150px] desktop:w-[200px] -left-5 -top-5 tablet:-left-10 tablet:-top-5 desktop:h-[200px] rounded-full object-cover border-2 border-dark-pink absolute desktop:-left-20 desktop:-top-10 cursor-pointer" alt="groom" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />

        <img src={Shape2} className="h-[80px] tablet:h-[130px] desktop:h-[230px] bottom-10 -right-5 tablet:bottom-20 tablet:-right-10 absolute desktop:bottom-10 desktop:-right-20" alt="shape"/>
        <img src={Shape5DarkPink} className="h-[130px] tablet:h-[180px] desktop:h-[230px] bottom-10 -right-10 tablet:bottom-20 tablet:-right-16 absolute desktop:bottom-20 desktop:-right-24 -scale-x-100 rotate-[10deg]" alt="shape"/>
        <img src={Shape3DarkPink} className="h-[80px] tablet:h-[130px] desktop:h-[150px] absolute -bottom-14 right-8 tablet:-bottom-20 tablet:right-10 desktop:-bottom-32 desktop:right-20 -scale-y-100 rotate-[50deg]" alt="shape"/>
        <img src={Bride} className="w-[100px] h-[100px] tablet:w-[150px] tablet:h-[150px] desktop:w-[200px] -right-5 -bottom-5 tablet:-right-10 tablet:-bottom-5 desktop:h-[200px] rounded-full object-cover border-2 border-dark-pink absolute desktop:-right-20 desktop:-bottom-10 cursor-pointer" alt="bride" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
      </div>
      <div className="w-full h-full desktop:pr-24 flex flex-col items-center justify-center text-xl capitalize z-10 tablet:text-4xl desktop:w-fit desktop:text-6xl">
        <span className="font-estonia text-[#77626F]">we are getting married</span>
        <div className="w-fit flex flex-row items-center gap-2 desktop:gap-6 whitespace-nowrap">
          <span className="text-4xl sm: font-whisper tablet:text-8xl desktop:text-9xl">~ ade</span>
          <span className="font-imperial-script text-[#A5AA9C]">&</span>
          <span className="text-4xl font-whisper tablet:text-8xl desktop:text-9xl">nova ~</span>
        </div>
        <img src={Shape7} className="h-[50px] my-2 tablet:h-[100px] desktop:h-[unset]" alt="shape" />
        <span className="capitalize font-dancing-script text-sm tablet:text-lg desktop:text-xl text-[#657251]">- save the date -</span>
        <div className="w-fit flex flex-row items-center text-2xl gap-2 tablet:text-4xl desktop:text-6xl">
          <span className="font-ingrid-darling">january</span>
          <span className="font-ingrid-darling">01,</span>
          <span className="font-ingrid-darling">2021</span>
        </div>
      </div>

      <img src={Shape9} className="h-[20%] desktop:h-[55%] -rotate-90 bottom-5 right-5 desktop:bottom-5 desktop:right-5 absolute z-1 object-fill" alt="shape"/>
      <img src={Shape8} className="h-[30%] desktop:h-[60%] -rotate-90 bottom-0 right-0 absolute z-1 object-fill" alt="shape"/>
      <img src={Right} className="h-[50%] desktop:h-[100%] top-0 right-0 absolute z-1 object-fill" alt="shape"/>

      <img src={Shape9} className="h-[20%] desktop:h-[55%] rotate-90 top-5 left-5 desktop:top-5 desktop:left-5 absolute z-1 object-fill" alt="shape"/>
      <img src={Shape8} className="h-[30%] desktop:h-[60%] rotate-90 top-0 left-0 absolute z-1 object-fill" alt="shape"/>
      <img src={Left} className="h-[50%] desktop:h-[60%] bottom-0 left-0 absolute z-1 object-fill" alt="shape"/>

      <div
        className='w-[20px] h-[30px] tablet:w-[30px] tablet:h-[50px] desktop:w-[40px] desktop:h-[60px] absolute bottom-5 desktop:bottom-10 border-2 border-dark-pink rounded-md text-dark-pink flex items-center justify-center text-center text-sm left-[calc(50%_-_20px)] cursor-pointer z-[20] animate-bounce backdrop-blur-lg'
        onClick={() => {
          if (onClickDown) {
            return onClickDown();
          } else {
            return {};
          }
        }}
      >
        <i className="fa-solid fa-chevron-down"></i>
      </div>
    </div>
  )
})

export default HomeSection;