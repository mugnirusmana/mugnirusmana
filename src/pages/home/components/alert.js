const Alert = (props) => {
  let {
    show,
    isLoading,
    title,
    message,
    type,
    showCancelButton,
    cancelButtonText,
    cancelButtonAction,
    confirmButtonText,
    confirmButtonAction,
    windowDimensions,
  } = props;

  const renderAlertIcon = () => {
    switch(type) {
      case 'question':
        return <i className="fa-regular fa-circle-question text-4xl text-dark-pink"></i>;
      case 'success':
        return <i className="fa-regular fa-circle-check text-4xl text-dark-pink"></i>;
      case 'danger':
        return <i className="fa-regular fa-circle-xmark text-4xl text-dark-pink"></i>;
      case 'warning':
        return <i className="fa-solid fa-triangle-exclamation text-4xl text-dark-pink"></i>;
      default:
        return <i className="fa-solid fa-circle-info text-4xl text-dark-pink"></i>;
    }
  }

  return (
    <div className={`w-screen h-screen transition-all duration-200 ease-in-out fixed left-0 backdrop-blur-sm flex items-center justify-center z-[90] p-5`} style={{ top: show ? '0px' : `${windowDimensions.height + 50}px` }}>
      <div className="w-fit h-fit rounded shadow-lg bg-white p-5 tablet:p-10 flex flex-col items-center justify-center gap-5 border border-gray-200">
        {renderAlertIcon()}
        <span className="text-xl font-bold text-dark-pink text-center">{title}</span>
        <div className="text-md" dangerouslySetInnerHTML={{ __html: message }} />
        <div className="w-full flex flex-col tablet:flex-row gap-5">
          {showCancelButton ? <div className="w-full p-2 flex items-center justify-center rounded border border-dark-pink text-dark-pink font-bold cursor-pointer" onClick={() => cancelButtonAction && !isLoading ? cancelButtonAction() : {}}>{isLoading ? 'Loading...' : cancelButtonText??'Cancel'}</div> : null }
          <div className="w-full p-2 flex items-center justify-center rounded border border-dark-pink bg-dark-pink text-white font-bold cursor-pointer" onClick={() => confirmButtonAction && !isLoading ? confirmButtonAction() : {}}>{isLoading ? 'Loading...' : confirmButtonText??'Confirm'}</div>
        </div>
      </div>
    </div>
  )
}

export default Alert;