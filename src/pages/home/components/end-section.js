import React from 'react';

import Shape7 from './../../../assets/svgs/shape7.svg';
import Left from './../../../assets/svgs/left.svg';

const EndSection = React.forwardRef((props, ref) => {
  let { data } = props;
  return (
    <div ref={ref} className="w-screen h-screen flex flex-col bg-dark-pink items-center justify-between text-5xl tablet:text-9xl py-32 text-light-pink relative">
      
      <img src={Left} className="h-[40%] desktop:h-[90%] absolute left-0 top-0 desktop:hidden -scale-y-100" alt="shape" />
      <img src={Left} className="h-[40%] desktop:h-[90%] absolute right-0 top-0 desktop:hidden -scale-y-100 -scale-x-100" alt="shape" />
      <img src={Left} className="h-[40%] desktop:h-[90%] absolute left-0 bottom-0" alt="shape" />
      <img src={Left} className="h-[40%] desktop:h-[90%] absolute right-0 bottom-0 -scale-x-100" alt="shape" />
      
      <div className="w-fit flex flex-col items-center justify-center z-[1]">
        <span className="font-bold font-whisper">{data?.groom_nickname && data?.groom_nickname !== "" ? data?.groom_nickname : '-'}</span>
        <span className="text-2xl tablet:text-5xl font-dancing-script">- & -</span>
        <span className="font-bold font-whisper">{data?.bride_nickname && data?.bride_nickname !== "" ? data?.bride_nickname : '-'}</span>
      </div>

      <img src={Shape7} className="h-[100px] tablet:h-[250px]" alt="shape"/>

      <span className="text-2xl tablet:text-5xl font-dancing-script z-[1]">Thanks</span>

    </div>
  )
});

export default EndSection;