import { useEffect, useState } from "react";

const NotAvailable = (props) => {
  let {
    show,
    windowDimensions,
  } = props;
  let heightScreen = windowDimensions?.height + 50;
  const [opacity, setOpacity] = useState('opacity-0');

  useEffect(() => {
    const timeoutOpacity = setTimeout(() => {
      setOpacity('opacity-100');
    }, 1500);

    return () => {
      clearTimeout(timeoutOpacity);
    }
  }, [])

  return (
    <div className="w-screen h-screen transition-all duration-300 ease-in-out flex flex-col text-center items-center justify-center bg-light-pink text-dark-pink z-[99] fixed left-0 p-5 font-anek-telugu" style={{ top: show ? '0px' : `${heightScreen}px` }}>
      <div className={`text-8xl transition-all duration-500 ease-in-out font-bold mb-5 flex flex-row ${opacity}`}><span className="animate-[bounce_1500ms_ease-in-out_infinite_500ms]">5</span><span className="animate-[bounce_1500ms_ease-in-out_infinite_1000ms]">0</span><span className="animate-[bounce_1500ms_ease-in-out_infinite_1500ms]">3</span></div>
      <span className="text-xl font-bold mb-10">This page is not available yet...</span>
      <span className="text-md">Sorry, but the page is not available for now.</span>
      <span className="text-md">Try refreshing the page or clicking button bellow to reload the page.</span>
      <span className="text-md mb-10">Or send message to dev via <span className="font-bold cursor-pointer" onClick={() => window.location.href = 'mailto:mugnirusmana95@gmail.com'}>email</span> or <span className="font-bold cursor-pointer" onClick={() => window.open('https://wa.me/+628980500453', '_blank')}>whatsapp</span></span>
      <div className="w-fit h-fit flex flex-row gap-5">
        <div
          className="w-fit h-fit px-4 py-2 border border-dark-pink rounded-md hover:bg-dark-pink hover:text-light-pink font-bold cursor-pointer"
          onClick={() => window.location.reload()}
        >Reload</div>
      </div>
    </div>
  )
}

export default NotAvailable;