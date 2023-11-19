const Header = (props) => {
  let {
    title,
    bgColor,
    textColor,
    shadow,
    dropShadow,
    zIndex
  } = props
  return <div className={`${bgColor ? bgColor : 'bg-transparent'} ${textColor ? textColor : 'text-darp-pink'} ${shadow ? 'shadow-lg' : ''} ${dropShadow ? '' : ''} ${zIndex??''} mb-0 desktop:mb-10 w-full h-[100px] flex items-center justify-center text-center text-xl tablet:text-4xl font-bold font-dancing-script tablet:pt-5 whitespace-nowrap`}>{title}</div>
}

export default Header;