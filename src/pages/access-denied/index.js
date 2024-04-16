import { useNavigate } from "react-router";

const AccessDenied = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full mt-5 mobile-md:mt-20 tablet:h-full tablet:mt-0 flex flex-col text-center items-center justify-center text-sky-900 p-5 font-anek-telugu">
      <div className={`text-8xl transition-all duration-500 ease-in-out font-bold mb-5 flex flex-row opacity-100`}>403</div>
      <span className="text-xl font-bold mb-10">Access denied...</span>
      <span className="text-base">Sorry, the page you are accessing is currently not available for your account.</span>
      <span className="text-base mb-10">Try refreshing the page or clicking button bellow to go to Dashboard.</span>
      <div className="w-fit h-fit flex flex-row gap-5">
        <div
          onClick={() => navigate('/dashboard')}
          className="w-fit h-fit px-4 py-2 border border-sky-900 cursor-pointer transition-all ease-in-out duration-300 rounded-md hover:bg-sky-900 hover:text-white font-bold"
        >DASHBOARD</div>
      </div>
    </div>
  )
}

export default AccessDenied;