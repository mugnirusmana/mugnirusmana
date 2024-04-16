import { useNavigate } from "react-router";

const BreadCrumb = (props) => {
  let { title, list } = props;
  const navigate = useNavigate();
  const renderList = () => {
    return list?.map((item, key) => {
      if (key === 0) {
        return (
          <span
            key={key}
            className={`${item?.active ? 'text-sky-900 cursor-default' : 'text-sky-300 cursor-pointer'} text-xs hover:text-sky-900 mr-2 last:mr-0 `}
            onClick={() => {
              if (!item?.active) navigate(item?.path);
            }}
          >{item?.title}</span>
        )
      } else {
        return (
          <span
            key={key}
            className={`${item?.active ? 'text-sky-900 cursor-default' : 'text-sky-300 cursor-pointer'} text-xs hover:text-sky-900 mr-2 last:mr-0`}
            onClick={() => {
              if (!item?.active) navigate(item?.path);
            }}
          >{item?.title}</span>
        )
      }
    })
  }
  return (
    <div className="w-full h-fit flex flex-col tablet:flex-row items-center mb-10">
      <span className="w-full text-xl font-bold">{title}</span>
      <span className="w-full tablet:w-fit flex-row whitespace-nowrap items-center">
        {renderList()}
      </span>
    </div>
  )
}

export default BreadCrumb;