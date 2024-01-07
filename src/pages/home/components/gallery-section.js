import React from 'react';

import Header from './header';

import Default from './../../../assets/images/defaul-img.png';

import Left from './../../../assets/svgs/left.svg';
import Right from './../../../assets/svgs/right.svg';
import Shape8 from './../../../assets/svgs/shape8.svg';
import Shape9 from './../../../assets/svgs/shape9.svg';

const GallerySection = React.forwardRef((props, ref) => {
  let { data, onShowModalImage } = props;

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
        <div className="w-full h-full flex flex-col desktop:flex-row rounded-md shadow-lg">
          <div className="w-full h-full">
            {data?.gallery_1 ? (
              <img src={data?.gallery_1} className="w-full h-[400px] grayscale hover:grayscale-0 tablet:h-full object-cover transition-all duration-300 ease-in-out cursor-pointer rounded-tl-md rounded-tr-md desktop:rounded-tr-none desktop:rounded-bl-md" alt="gallery" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            ) : (
              <img src={Default} className="w-full h-[400px] grayscale hover:grayscale-0 tablet:h-full object-cover transition-all duration-300 ease-in-out cursor-pointer rounded-tl-md rounded-tr-md desktop:rounded-tr-none desktop:rounded-bl-md" alt="gallery" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
            )}
          </div>
          <div className="w-full h-full flex flex-col tablet:flex-col">
            <div className="w-full h-full flex flex-col tablet:flex-row">
              <div className="w-full h-full">
              {data?.gallery_2 ? (
                <img src={data?.gallery_2} className="w-full h-[400px] grayscale hover:grayscale-0 tablet:h-full object-cover transition-all duration-300 ease-in-out cursor-pointer" alt="gallery" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
              ): (
                <img src={Default} className="w-full h-[400px] grayscale hover:grayscale-0 tablet:h-full object-cover transition-all duration-300 ease-in-out cursor-pointer" alt="gallery" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
              )}
              </div>
              <div className="w-full h-full">
              {data?.gallery_3 ? (
                <img src={data?.gallery_3} className="w-full h-[400px] grayscale hover:grayscale-0 tablet:h-full object-cover transition-all duration-300 ease-in-out cursor-pointer desktop:rounded-tr-md" alt="gallery" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
              ) : (
                <img src={Default} className="w-full h-[400px] grayscale hover:grayscale-0 tablet:h-full object-cover transition-all duration-300 ease-in-out cursor-pointer desktop:rounded-tr-md" alt="gallery" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
              )}
              </div>
            </div>
            <div className="w-full h-full flex flex-col tablet:flex-row">
              <div className="w-full h-full">
              {data?.gallery_4 ? (
                <img src={data?.gallery_4} className="w-full h-[400px] grayscale hover:grayscale-0 tablet:h-full object-cover transition-all duration-300 ease-in-out cursor-pointer tablet:rounded-bl-md desktop:rounded-bl-none" alt="gallery" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
              ) : (
                <img src={Default} className="w-full h-[400px] grayscale hover:grayscale-0 tablet:h-full object-cover transition-all duration-300 ease-in-out cursor-pointer tablet:rounded-bl-md desktop:rounded-bl-none" alt="gallery" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
              )}
              </div>
              <div className="w-full h-full">
              {data?.gallery_5 ? (
                <img src={data?.gallery_5} className="w-full h-[400px] grayscale hover:grayscale-0 tablet:h-full object-cover transition-all duration-300 ease-in-out cursor-pointer rounded-bl-md rounded-br-md tablet:rounded-bl-none" alt="gallery" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
              ) : (
                <img src={Default} className="w-full h-[400px] grayscale hover:grayscale-0 tablet:h-full object-cover transition-all duration-300 ease-in-out cursor-pointer rounded-bl-md rounded-br-md tablet:rounded-bl-none" alt="gallery" onClick={(e) => onShowModalImage ? onShowModalImage(e.target.getAttribute('src')) : {}} />
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default GallerySection;