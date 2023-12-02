const Modal = (props) => {
  let { show, renderContent, onClose, isLoading } = props;

  return (
    <div className={`w-screen h-screen fixed top-0 left-0 z-[100] ${show ? 'flex' : 'hidden'} items-center justify-center text-sky-900`}>
      <div className="w-full h-full flex items-center justify-center relative p-5">
        <div className="w-full h-full absolute top-0 left-0 bg-black opacity-50"></div>
          <div className="w-full desktop:w-1/2 bg-white rounded relative pt-10 shadow-lg px-5 pb-5 z-[1]">
            <div
              className={`absolute w-[50px] h-[50px] bg-white rounded-full text-sky-900 top-2 right-2 border border-gray-300 shadow-lg text-xs font-bold flex items-center justify-center transition-all duration-200 ease-in-out ${isLoading ? 'bg-gray-300 cursor-default' : 'bg-white cursor-pointer'}`}
              onClick={() => {
                if(!isLoading && onClose) {
                  return onClose();
                } else {
                  return {}
                }
              }}
            >{isLoading ? '...' : 'X'}</div>
            {renderContent ? renderContent() : null}
          </div>
      </div>
    </div>
  )
}

export default Modal;