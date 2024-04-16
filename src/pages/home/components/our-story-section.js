import React from 'react';

import Header from './header';

import Default from './../../../assets/images/defaul-img.png';

import Right from './../../../assets/svgs/right.svg';
import Left from './../../../assets/svgs/left.svg';
import Shape11 from './../../../assets/svgs/shape11.svg';

import { formatDate } from '../../../helper';

const OurStorySection = React.forwardRef((props, ref) => {
  let { data, onShowModalImage } = props;

  return (
    <div ref={ref} className="w-screen min-h-screen bg-light-pink pb-5 tablet:pb-20 flex flex-col relative">
      <Header
        title={'Our Story'}
        textColor={'text-dark-pink'}
        bgColor={'bg-light-pink'}
        zIndex={'z-[1]'}
        shadow={true}
      />

      <div className="w-screen min-h-screen flex flex-col items-center gap-2 mt-10 desktop:mt-0">

        <img src={Shape11} className="h-[10%] desktop:h-[20%] hidden tablet:block absolute right-0 bottom-16 -scale-x-100" alt="shape" />
        <img src={Shape11} className="h-[10%] desktop:h-[20%] hidden tablet:block absolute left-0 top-16 -scale-x-100  -scale-y-100" alt="shape" />
        <img src={Right} className="h-[50%] hidden tablet:block absolute right-0 top-0" alt="shape" />
        <img src={Left} className="h-[50%] hidden tablet:block absolute left-0 bottom-0" alt="shape" />
        
        <div className="w-[10px] h-full border-r-4 border-dashed border-r-dark-pink absolute left-24 mobile-md:left-32 tablet:left-72 top-0 desktop:rotate-[10deg] desktop:left-auto desktop:top-3"></div>
        <div className="w-[10px] h-full border-l-4 border-dashed border-l-dark-pink absolute right-24 mobile-md:right-32 tablet:right-72 top-0 desktop:rotate-[-10deg] desktop:right-auto desktop:top-3"></div>
        
        <div className="w-full tablet:w-[60%] desktop:w-[60%] flex flex-col justify-center items-center relative p-5 gap-5 z-[1]">
          <div className="w-full flex flex-col desktop:flex-row-reverse relative p-5 rounded-md bg-white shadow-lg gap-5 desktop:items-center desktop:gap-16 desktop:pl-16">
            {data?.first_meet_picture ? (
              <img src={data?.first_meet_picture} className="w-full desktop:w-[500px] desktop:h-[400px] object-cover rounded-md cursor-pointer" alt="first-meet" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            ) : (
              <img src={Default} className="w-full desktop:w-[500px] desktop:h-[400px] object-cover rounded-md cursor-pointer" alt="first-meet" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            )}
            <div className="w-full desktop:h-fit flex flex-col gap-5">
              <span className="font-bold font-dancing-script text-xl text-dark-pink desktop:text-4xl desktop:text-right block desktop:hidden">First Meet ~</span>
              <span className="font-bold font-dancing-script text-xl text-dark-pink desktop:text-4xl desktop:text-right desktop:block hidden">~ First Meet</span>
              <span className="text-justify desktop:text-right">{data?.first_meet_about && data?.first_meet_about !== "" ? data?.first_meet_about : '-'}</span>
            </div>
          </div>

          <div className="w-[65px] h-[65px] desktop:w-[100px] desktop:h-[100px] desktop:text-lg rounded-full flex flex-col items-center justify-center bg-dark-pink text-white absolute top-2 right-2 text-xs desktop:top-0 desktop:right-0 shadow-lg">
            <span className="font-bold">{formatDate(data?.first_meet_date).mon}</span>
            <span>{formatDate(data?.first_meet_date).year}</span>
          </div>
        </div>

        <div className="w-full tablet:w-[60%] desktop:w-[60%] flex flex-col justify-center items-center relative p-5 gap-5 z-[1]">
          <div className="w-full flex flex-col desktop:flex-row relative p-5 rounded-md bg-white shadow-lg gap-5 desktop:items-center desktop:gap-16 desktop:pr-16">
            {data?.first_date_picture ? (
              <img src={data?.first_date_picture} className="w-full desktop:w-[500px] desktop:h-[400px] object-cover rounded-md cursor-pointer" alt="engagement" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            ) : (
              <img src={Default} className="w-full desktop:w-[500px] desktop:h-[400px] object-cover rounded-md cursor-pointer" alt="engagement" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            )}
            <div className="w-full desktop:h-fit flex flex-col gap-5">
              <span className="font-bold font-dancing-script text-xl text-dark-pink desktop:text-4xl desktop:text-left">First Date ~</span>
              <span className="text-justify desktop:text-left">{data?.first_date_about && data?.first_date_about !== "" ? data?.first_date_about : '-'}</span>
            </div>
          </div>

          <div className="w-[65px] h-[65px] desktop:w-[100px] desktop:h-[100px] desktop:text-lg rounded-full flex flex-col items-center justify-center bg-dark-pink text-white absolute top-2 left-2 text-xs desktop:top-0 desktop:left-0 shadow-lg">
            <span className="font-bold">{formatDate(data?.first_date_date).mon}</span>
            <span>{formatDate(data?.first_date_date).year}</span>
          </div>
        </div>

        <div className="w-full tablet:w-[60%] desktop:w-[60%] flex flex-col justify-center items-center relative p-5 gap-5 z-[1]">
          <div className="w-full flex flex-col desktop:flex-row-reverse relative p-5 rounded-md bg-white shadow-lg gap-5 desktop:items-center desktop:gap-16 desktop:pl-16">
            {data?.engagement_picture ? (
              <img src={data?.engagement_picture} className="w-full desktop:w-[500px] desktop:h-[400px] object-cover rounded-md cursor-pointer" alt="engagement" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            ) : (
              <img src={Default} className="w-full desktop:w-[500px] desktop:h-[400px] object-cover rounded-md cursor-pointer" alt="engagement" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            )}
            <div className="w-full desktop:h-fit flex flex-col gap-5">
              <span className="font-bold font-dancing-script text-xl text-dark-pink desktop:text-4xl desktop:text-right block desktop:hidden">Engagement ~</span>
              <span className="font-bold font-dancing-script text-xl text-dark-pink desktop:text-4xl desktop:text-right desktop:block hidden">~ Engagement</span>
              <span className="text-justify desktop:text-right">{data?.engagement_about && data?.engagement_about !== "" ? data?.engagement_about : "-"}</span>
            </div>
          </div>

          <div className="w-[65px] h-[65px] desktop:w-[100px] desktop:h-[100px] desktop:text-lg rounded-full flex flex-col items-center justify-center bg-dark-pink text-white absolute top-2 right-2 text-xs desktop:top-0 desktop:right-0 shadow-lg">
            <span className="font-bold">{formatDate(data?.engagement_date).mon}</span>
            <span>{formatDate(data?.engagement_date).year}</span>
          </div>
        </div>

      </div>
    </div>
  )
})

export default OurStorySection;