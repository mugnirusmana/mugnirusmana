import { useEffect, useState } from 'react';
import Header from './header';

const CommentSection = (props) => {
  let { data } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  let timerActiveIndex = null;
  let timerActiveIndexInside = null;

  useEffect(() => {
    setActiveIndex(0);
  }, []);

  useEffect(() => {
    timerActiveIndex = setTimeout(() => {
      let dataLength = data?.length-1;
      let nextAcative = activeIndex + 1;
      if (nextAcative > dataLength) nextAcative = 0;
      setActiveIndex(null);
      setTimeout(() => {
        setActiveIndex(nextAcative);
      }, 1000)
    }, 7000);

    return () => {
      clearTimeout(timerActiveIndex);
      clearTimeout(timerActiveIndexInside);
    }
  }, [data, activeIndex]);

  const renderListComment = () => {
    return data?.map((item, index) => {
      return (
        <div key={index} className={`w-[80%] transition-all duration-[2000ms] ease-in-out tablet:w-[600px] flex flex-col items-center justify-between min-h-[250px] bg-light-pink rounded-md shadow-lg p-10 absolute bottom-10 ${index === activeIndex ? ' opacity-100' : 'opacity-0'}`}>
          <div className="w-full h-fit flex flex-col">
            <span className="font-bold font-dancing-script text-2xl">{item?.name}</span>
            <span className="text-xs">{item?.date}</span>
          </div>
          <div className="w-full h-fit border-l-4 border-l-dark-pink pt-1.5 pl-3">
            <span className="text-justify text:xs tablet:text-md">{item?.comment}</span>
          </div>
        </div>
      )
    })
  }

  const renderContent = () => {
    if (data && data?.length > 0) {
      return (
        <div className="w-screen h-screen mobile-md:h-[500px] tablet:h-[400px] flex flex-col relative">
          <Header
            title={'People Comments'}
            textColor={'text-dark-pink'}
            zIndex={'z-[1]'}
          />

          <div className="w-full h-full flex flex-col items-center pb-5 desktop:pb-20 text-dark-pink px-5 relative">
            {renderListComment()}
          </div>

        </div>
      )
    } else {
      return <></>
    }
  }

  return renderContent();
}

export default CommentSection;