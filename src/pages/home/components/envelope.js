import { useEffect, useState } from "react";

const Envelope = (props) => {
  let {
    show,
    windowDimensions
  } = props;
  const [loveStyles, setLoveStyle] = useState({});
  const [midStyles, setMidStyle] = useState({});
  const [leftStyles, setLeftStyle] = useState({});
  const [rightStyles, setRightStyle] = useState({});
  const [isHide, setIsHide] = useState(false);
  let timeInterval = null;

  useEffect(() => {
    renderStateStyle();
  }, [show]);

  const renderStateStyle = () => {
    let width = windowDimensions.width / 2;
    let loveStyles = null;
    let midStyle = null;
    let leftStyle = null;
    let rightStyle = null;

    if (show) {
      setIsHide(false);
      loveStyles = {
        top: '40%',
      };
      midStyle = {
        top: '50%',
      };
      leftStyle = {
        left: 0,
      };
      rightStyle = {
        right: 0
      };
    } else {
      loveStyles = {
        top: -200,
      };
      midStyle = {
        top: -100,
      };
      leftStyle = {
        left: ( width - width - width) - 20,
      };
      rightStyle = {
        right: ( width - width - width) - 20,
      };
    }
    setLoveStyle(loveStyles);
    setMidStyle(midStyle);
    setLeftStyle(leftStyle);
    setRightStyle(rightStyle);

    if(!show) {
      timeInterval = setTimeout(() => {
        setIsHide(true);
        clearInterval(timeInterval);
      }, 600);
    }
  }

  const onOpenEnvelope = () => {
    let width = windowDimensions.width / 2;
    let loveStyles = {
      top: -200,
    };
    let midStyle = {
      top: -100,
    };
    let leftStyle = {
      left: ( width - width - width) - 20,
    };
    let rightStyle = {
      right: ( width - width - width) - 20,
    };
    setLoveStyle(loveStyles);
    setMidStyle(midStyle);
    setLeftStyle(leftStyle);
    setRightStyle(rightStyle);

    timeInterval = setTimeout(() => {
      setIsHide(true);
      clearInterval(timeInterval);
    }, 600);
  }

  const renderComponenet = () => {
    if (!isHide) {
      return (
        <div className="w-screen h-screen fixed top-0 z-[90]">
          <div className="w-full h-full flex flex-row items-center justify-center relative">
            <div className={`w-[70%] tablet:w-1/2 absolute transition-all duration-300 ease-in-out z-[92] text-dark-pink`} style={loveStyles}>
              <div className="w-full relative">
                <i className="fa-solid fa-heart absolute left-[0%] opacity-0 translate-y-0 -top-10 text-3xl animate-[flying_2s_ease-in-out_infinite]"></i>
                <i className="fa-solid fa-heart absolute left-[20%] opacity-0 translate-y-0 -top-10 text-4xl animate-[flying_2s_ease-in-out_infinite_362ms]"></i>
                <i className="fa-solid fa-heart absolute left-[40%] opacity-0 translate-y-0 -top-10 text-xl animate-[flying_2s_ease-in-out_infinite_724ms]"></i>
                <i className="fa-solid fa-heart absolute left-[60%] opacity-0 translate-y-0 -top-14 text-2xl animate-[flying_2s_ease-in-out_infinite_1086ms]"></i>
                <i className="fa-solid fa-heart absolute left-[80%] opacity-0 translate-y-0 -top-6 text-xl animate-[flying_2s_ease-in-out_infinite_1448ms]"></i>
                <i className="fa-solid fa-heart absolute left-[100%] opacity-0 translate-y-0 -top-14 text-4xl animate-[flying_2s_ease-in-out_infinite_1810ms]"></i>
              </div>
            </div>
            <div
              className="w-[60px] h-[60px] cursor-pointer rounded-full bg-dark-pink flex items-center justify-center text-center z-[92] text-md text-light-pink transition-all duration-500 absolute left-[calc(50%_-_30px)]"
              style={midStyles}
              onClick={() => onOpenEnvelope()}
            >Open</div>
            <div className="w-1/2 h-full absolute backdrop-blur-lg top-0 transition-all duration-500 ease-in-out z-[91]" style={leftStyles}></div>
            <div className="w-1/2 h-full absolute backdrop-blur-lg top-0 transition-all duration-500 ease-in-out z-[91]" style={rightStyles}></div>
          </div>
        </div>
      )
    }
    return null;
  }

  return (
    <>
      {renderComponenet()}
    </>
  )
}

export default Envelope;