import { useEffect, useState } from "react";

import { getWindowDimensions } from './../../helper';

const Loader = (props) => {
  let { show } = props;
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => setWindowDimensions(getWindowDimensions())
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className={`w-full h-full transition-all duration-300 ease-in-out fixed left-0 flex items-center justify-center backdrop-blur-md z-[120]`} style={{ top: show ? '0px' : `${windowDimensions.height+50}px` }}>
      <span className="text-sky-900 font-bold animate-bounce">Loading...</span>
    </div>
  )
}

export default Loader;
