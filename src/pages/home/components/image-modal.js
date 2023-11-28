import { useEffect, useState } from "react";

const ImageModal = (props) => {
  let {
    show,
    data,
    onClose,
    windowDimensions,
  } = props;
  let heightScreen = windowDimensions?.height + 50;
  const [image, setImage] = useState(data);

  useEffect(() => {
  let timeoutImage;
    if (!show) {
      timeoutImage = setTimeout(() => {
        setImage(null);
      }, 600);
    } else {
      setImage(data);
    }

    return () => {
      clearInterval(timeoutImage);
    }
  }, [show])

  return (
    <div
      className={`w-screen h-screen transition-all duration-500 ease-in-out fixed left-0 backdrop-blur-md p-5 tablet:p-16 flex z-[100] cursor-pointer`} style={{ top: show ? '0px' : `${heightScreen}px` }}
      onClick={() => {
        if(onClose) {
          return onClose();
        } else {
          return {}
        }
      }}
    >
      <div className="w-full h-full rounded relative flex items-center justify-center">
        <img
          src={image}
          className="w-full h-full object-contain"
          alt="img"
        />
      </div>
    </div>
  )
}

export default ImageModal;