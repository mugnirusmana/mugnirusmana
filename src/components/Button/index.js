const Button = (props) => {
  let {
    width,
    text,
    bold,
    shadow,
    isLoading,
    disabled,
    type,
    label,
    onClick,
  } = props

  const onClickButton = () => {
    if (!isLoading && !disabled && onClick) {
      return onClick()
    } else {
      return {}
    }
  }

  const renderButtonType = () => {
    if (isLoading || disabled) {
      return 'bg-gray-300 text-gray-400 border border-gray-300 cursor-default';
    } else {
      if (type === 'submit') {
        return 'bg-sky-900 text-white border border-sky-900 cursor-pointer';
      } else {
        return 'bg-white text-sky-900 border border-sky-900 cursor-pointer';
      }
    }
  }

  return (
    <div
      className={`${width??'w-fit'} flex items-center justify-center px-4 py-2 ${bold ? 'font-bold' : 'font-normal'} ${renderButtonType()} whitespace-nowrap rounded ${shadow && !disabled ? 'shadow-lg' : ''} ${text ?? 'text-md'}`}
      onClick={() => onClickButton()}
    >{isLoading && !disabled ? (
      <div className="w-full flex flex-row gap-3">
        <span>{label??'Confirm'}</span>
        <i className="fa-solid fa-spinner animate-spin"></i>
      </div>
    ) : label??'Confirm'}</div>
  )
}

export default Button;