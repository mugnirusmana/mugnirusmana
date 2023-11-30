const NotAvailable = (props) => {
  let {
    show,
    windowDimensions,
  } = props;
  let heightScreen = windowDimensions?.height + 50;

  return (
    <div className="w-screen h-screen transition-all duration-300 ease-in-out flex flex-col text-center items-center justify-center bg-light-pink text-dark-pink z-[99] fixed left-0 p-5" style={{ top: show ? '0px' : `${heightScreen}px` }}>
      <span className="text-8xl font-bold mb-5">503</span>
      <span className="text-xl font-bold mb-10">This page is not available yet...</span>
      <span className="text-md">Sorry, but the page are not available for now.</span>
      <span className="text-md">Try refreshing the page or clicking button bellow to reload the page.</span>
      <span className="text-md mb-10">Or send email to dev via: <span className="font-bold cursor-pointer" onClick={() => window.location.href = 'mailto:mugnirusmana95@gmail.com'}>email</span> or <span className="font-bold cursor-pointer" onClick={() => window.open('https://wa.me/+628980500453', '_blank')}>whatsapp</span></span>
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