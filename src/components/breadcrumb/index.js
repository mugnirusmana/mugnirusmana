import { useNavigate } from "react-router";

const BreadCrumb = (props) => {
  let { title, list } = props;
  const navigate = useNavigate();
  const renderList = () => {
    return list?.map((item, key) => {
      if (key === 0) {
        return (
          <>
            <span
              className={`${item?.active ? 'text-sky-900 cursor-default' : 'text-sky-300 cursor-pointer'} text-xs hover:text-sky-900 `}
              onClick={() => {
                if (!item?.active) navigate(item?.path);
              }}
            >{item?.title}</span>
          </>
        )
      } else {
        return (
          <>
            <span>/</span>
            <span
              className={`${item?.active ? 'text-sky-900 cursor-default' : 'text-sky-300 cursor-pointer'} text-xs hover:text-sky-900`}
              onClick={() => {
                if (!item?.active) navigate(item?.path);
              }}
            >{item?.title}</span>
          </>
        )
      }
    })
  }
  return (
    <div className="w-full h-fit flex flex-row items-center mb-10">
      <spam className="w-full text-xl font-bold">{title}</spam>
      <spam className="hidden tablet:flex w-fit flex-row whitespace-nowrap gap-2 items-center">
        {renderList()}
      </spam>
    </div>
  )
}

export default BreadCrumb;