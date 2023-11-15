const ScrollToTop = (props) => {
  let { show, onScrollToTop } = props;

  return (
    <div
      className={`w-[50px] h-[50px] transition-all duration-300 ease-in-out fixed right-10 ${show ? 'bottom-10' : '-bottom-32'} rounded bg-light-pink border border-dark-pink z-[60] flex items-center justify-center text-center text-dark-pink cursor-pointer shadow-lg drop-shadow-lg`}
      onClick={() => {
        if (onScrollToTop) {
          return onScrollToTop();
        } else {
          return {}
        }
      }}
    >
      <i className="fa-solid fa-chevron-up"></i>
    </div>
  )
}

export default ScrollToTop;