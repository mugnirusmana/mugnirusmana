import { openUrl } from './../../../helper';

const Footer = (props) => {
  let { show } = props;
  return (
    <div className={`"w-full flex-col bg-[#3F3F3F] items-center justify-end gap-6 text-white ${show ? 'flex' : 'hidden'}`}>
      <div className="w-fit flex flex-col gap-2 items-center px-8 pt-6">
        <span className="font-bold text-xl mb-2">Follow Us</span>
        <div className="w-fit flex flex-row gap-5">
          <div
            className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-white bg-white text-[#3F3F3F] flex flex-row items-center justify-center text-xs"
            onClick={() => openUrl('https://www.tiktok.com/@mugnirusmana95')}
          >
            <i className="fa-brands fa-tiktok"></i>
          </div>
          <div
            className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-white bg-white text-[#3F3F3F] flex flex-row items-center justify-center text-xs"
            onClick={() => openUrl('https://www.facebook.com/ademugnirsmn')}
          >
            <i className="fa-brands fa-facebook"></i>
          </div>
          <div
            className="w-[30px] h-[30px] transition-all duration-300 ease-in-out cursor-pointer rounded-full border border-white bg-white text-[#3F3F3F] flex flex-row items-center justify-center text-xs"
            onClick={() => openUrl('https://www.instagram.com/addd.mg')}
          >
            <i className="fa-brands fa-instagram"></i>
          </div>
        </div>
      </div>

      <div className="w-fit flex flex-col gap-2 items-center justify-center px-8">
        <span className="mt-2 text-xs">Contact Us</span>
        <div className="w-fit flex flex-row gap-5">
          <div
            className="cursor-pointer text-white flex flex-row items-center justify-center text-xs"
            onClick={() => openUrl('mailto:mugnirusmana95@gmail.com')}
          >
            <i className="fa-solid fa-envelope"></i>
          </div>
          <div
            className="cursor-pointer text-white flex flex-row items-center justify-center text-xs"
            onClick={() => openUrl('https://t.me/mugniruaman95')}
          >
            <i className="fa-brands fa-telegram"></i>
          </div>
        </div>
      </div>

      <div className="w-full py-2 flex flex-row items-center justify-center bg-[#6D6D6D]">
        <span className="text-[#3F3F3F] text-xs">© 2023 | Save Me</span>
      </div>
    </div>
  )
}

export default Footer;