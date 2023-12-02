const CheckBox = (props) => {
  let {
    isChecked,
    value,
    onChange
  } = props
  return (
    <div className={`mt-2 w-[60px] h-[10px] rounded transition-all duration-500 ease-in-out flex items-center justify-center relative bg-gray-200`} >
      <div className={`h-[10px] transition-all duration-500 ease-in-out bg-sky-500 ${isChecked ? 'w-[60px]' : 'w-[0px]'} rounded absolute left-[0px]`}></div>
      <div
        className={`cursor-pointer w-[30px] h-[30px] transition-all duration-500 ease-in-out rounded-full ${isChecked ? 'left-[31px] bg-sky-900 shadow-lg' : 'left-[-1px] bg-gray-400 shadow-none'} absolute`}
        onClick={() => {
          if (onChange) {
            return onChange({value: value??null, isChecked: !isChecked});
          } else {
            return {}
          }
        }}
      />
    </div>
  )
}

export default CheckBox;
