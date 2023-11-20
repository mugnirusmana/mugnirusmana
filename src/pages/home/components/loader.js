import { useEffect, useState } from "react";

const Loader = (props) => {
  let {
    show,
    windowDimensions,
  } = props;
  const [parentStyles, setParentStyle] = useState({});
  const [isHide, setIsHide] = useState(false);

  useEffect(() => {
    renderStateStyle();
  }, [show]);

  const renderStateStyle = () => {
    let width = windowDimensions.width + 20;
    let style = null;
    let timeInterval = null;
    
    if (show) {
      setIsHide(false);
      style = {
        left: 0,
      };
    } else {
      style = {
        left: ( width - width - width) - 20,
      };
    }
    setParentStyle(style);

    if (!show) {
      timeInterval = setTimeout(() => {
        setIsHide(true);
        clearInterval(timeInterval);
      }, 1000);
    }
  }

  const renderComponent = () => {
    if (!isHide) {
      return (
        <div className={`w-screen h-screen bg-light-pink text-dark-pink flex transition-all duration-500 items-center justify-center fixed top-0 z-[100]`} style={parentStyles}>
         <div className="w-[70%] tablet:w-1/2 h-fit flex flex-col items-center justify-center relative">
           <span className="font-estonia text-4xl tablet:text-6xl font-bold animate-bounce mt-10">Loading ...</span>
           <div className="w-[125px] tablet:w-[200px] scale-x-[1] h-[10px] rounded-full bg-dark-pink opacity-10 animate-[expanding_1s_ease-in-out_infinite]"></div>
           <i className="fa-solid fa-heart absolute left-[0%] opacity-0 translate-y-0 -top-10 text-3xl animate-[flying_2s_ease-in-out_infinite]"></i>
           <i className="fa-solid fa-heart absolute left-[12%] opacity-0 translate-y-0 -top-14 text-2xl animate-[flying_2s_ease-in-out_infinite_181ms]"></i>
           <i className="fa-solid fa-heart absolute left-[20%] opacity-0 translate-y-0 -top-10 text-4xl animate-[flying_2s_ease-in-out_infinite_362ms]"></i>
           <i className="fa-solid fa-heart absolute left-[35%] opacity-0 translate-y-0 -top-8 text-2xl animate-[flying_2s_ease-in-out_infinite_543ms]"></i>
           <i className="fa-solid fa-heart absolute left-[40%] opacity-0 translate-y-0 -top-10 text-xl animate-[flying_2s_ease-in-out_infinite_724ms]"></i>
           <i className="fa-solid fa-heart absolute left-[55%] opacity-0 translate-y-0 -top-8 text-4xl animate-[flying_2s_ease-in-out_infinite_905ms]"></i>
           <i className="fa-solid fa-heart absolute left-[60%] opacity-0 translate-y-0 -top-14 text-2xl animate-[flying_2s_ease-in-out_infinite_1086ms]"></i>
           <i className="fa-solid fa-heart absolute left-[72%] opacity-0 translate-y-0 -top-10 text-4xl animate-[flying_2s_ease-in-out_infinite_1267ms]"></i>
           <i className="fa-solid fa-heart absolute left-[80%] opacity-0 translate-y-0 -top-6 text-xl animate-[flying_2s_ease-in-out_infinite_1448ms]"></i>
           <i className="fa-solid fa-heart absolute left-[95%] opacity-0 translate-y-0 -top-8 text-3xl animate-[flying_2s_ease-in-out_infinite_1629ms]"></i>
           <i className="fa-solid fa-heart absolute left-[100%] opacity-0 translate-y-0 -top-14 text-4xl animate-[flying_2s_ease-in-out_infinite_1810ms]"></i>
         </div>
        </div>
      )
    }
    return null;
  }

  return (
    <>
      {renderComponent()}
    </>
  );
}

export default Loader;