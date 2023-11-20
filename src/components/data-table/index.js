import { useEffect, useState } from "react";
import SelectOption from './../select-option';

const DataTable = (props) => {
  let {
    isLoading,
    data,
    title,
    perPage,
    currentPage,
    showInfo,
    showTitleFooter,
    withNumber,
    withAction,
    renderAction,
    renderCustomFilter,
    onChangePerPage,
    onChangePage,
    onPrevPage,
    onNextPage,
  } = props;
  let { paginate } = data;
  
  const [listPage, setListPage] = useState([]);
  const listPerPage = [10, 50, 100];

  useEffect(() => {
    let list_page = [];
    for (let i = 1; i <= paginate?.totalPage; i++) {
      list_page.push(i);
    }
    setListPage(list_page);
  }, [paginate?.totalPage])

  const getTotalColSpan = () => {
    let titleLength = title?.length;
    if (withNumber) titleLength = titleLength + 1;
    if (withAction) titleLength = titleLength + 1;
    return titleLength;
  }

  const setPositionTitle = (position) => {
    let setPosition = 'justify-center';
    if (position === 'right') setPosition = 'justify-end';
    if (position === 'left') setPosition = 'justify-start';
    return setPosition;
  }

  const renderListData = (item_data) => {
    return title?.map((item, index) => {
      if (item?.customRender) {
        return <td key={index} className="p-2">{item?.customRender(item_data)}</td>
      } else {
        return <td key={index} className="p-2">{item_data[item?.object]}</td>
      }
    });
  }

  const renderDataNumber = (index) => {
    if (withNumber) {
      let number = ((currentPage - 1) * perPage) + (index + 1);
      return <td className="p-2"><span className="flex items-center justify-center">{number}</span></td>
    }
  }

  const renderDataAction = (item) => {
    if (withAction) {
      return <td className="p-2">{renderAction ? renderAction(item) : null}</td>
    }
  }

  const renderData = () => {
    if (data?.data?.length > 0 && (title && title?.length > 0)) {
      return data?.data?.map((item, index) => {
        return (
          <tr key={index} className="hover:bg-gray-200 border border-gray-400">
            {renderDataNumber(index)}
            {renderListData(item)}
            {renderDataAction(item)}
          </tr>
        )
      })
    } else {
      let result = getTotalColSpan()
      return <tr className="border border-gray-400"><td colSpan={result}><div className="flex items-center justify-center p-2">No Data...</div></td></tr>
    }
  }

  const renderTitleFooter = () => {
    if (showTitleFooter) return renderTitle();
  }

  const renderTitle = () => {
    return (
      <thead>
        <tr className="border border-gray-400 text-sm">
          {renderTitleNumber()}
          {renderListTitle()}
          {renderTitleAction()}
        </tr>
      </thead>
    )
  }

  const renderTitleNumber = () => {
    if (withNumber) {
      return <th width={'5%'} className=""><span className={`flex items-center justify-center p-2`}>No</span></th>
    }
  }

  const renderTitleAction = () => {
    if (withAction) {
      return <th className=""><span className={`flex items-center justify-end p-2`}>Action</span></th>
    }
  }

  const renderListTitle = () => {
    if (title && title?.length > 0) {
      return title?.map((item, index) => {
        let position = setPositionTitle(item?.titlePosition)
        return <th key={index} className=""><span className={`flex items-center ${position} p-2`}>{item?.label}</span></th>
      });
    }
  }

  const renderInfo = () => {
    if (showInfo) {
      return (
        <div className="w-full flex flex-col tablet:flex-row mt-5 text-sm text-sky-900 gap-3">
          <div className="w-full whitespace-nowrap flex justify-center tablet:justify-start">Total Data:&nbsp;<b>({data?.data?.length} / {paginate?.totalData})</b></div>
          <div className="w-full tablet:w-fit whitespace-nowrap flex flex-col tablet:flex-row items-center gap-2">
            <div className="w-full flex flex-row justify-center items-center gap-2">
              <span>Per Page</span>
              <div className="w-[60px] tablet:w-[100px]">
                <SelectOption
                  isLoading={false}
                  options={listPerPage}
                  value={perPage}
                  showClear={false}
                  showSearch={false}
                  optionPosition={'top'}
                  onChange={(data) => {
                    if (onChangePerPage) {
                      return onChangePerPage(data);
                    } else {
                      return {}
                    }
                  }}
                />
              </div>
            </div>
            <span className="hidden tablet:block w-[1px] h-full border-l-2 border-l-sky-900 mx-5"></span>
            <div className="w-fit whitespace-nowrap flex flex-row gap-2 items-center">
              <span
                className={parseInt(currentPage) <= 1 ? 'cursor-default text-gray-300 font-bold' : 'cursor-pointer text-sky-900 font-bold'}
                onClick={() => {
                  let status = parseInt(currentPage) <= 1;
                  if (onPrevPage && !status) {
                    return onPrevPage(parseInt(currentPage) - 1);
                  }
                }}
              >Prev Page</span>
              <div className="w-[60px] tablet:w-[100px]">
                <SelectOption
                  isLoading={false}
                  options={listPage}
                  value={currentPage}
                  showClear={false}
                  showSearch={true}
                  onSearch={(data) => {}}
                  optionPosition={'top'}
                  onChange={(data) => {
                    if (onChangePage) {
                      return onChangePage(data);
                    } else {
                      return {}
                    }
                  }}
                />
              </div>
              <span
                className={parseInt(currentPage) >= paginate?.totalPage ? 'cursor-default text-gray-300 font-bold' : 'cursor-pointer text-sky-900 font-bold'}
                onClick={() => {
                  let status = parseInt(currentPage) >= paginate?.totalPage;
                  if (onNextPage && !status) {
                    return onNextPage(parseInt(currentPage) + 1);
                  }
                }}
              >Next Page</span>
            </div>
          </div>
        </div>
      )
    }
  }

  const renderLoading = () => {
    if (isLoading) {
      return (
        <div className="w-full h-full absolute top-0 left-0 flex backdrop-blur-sm rounded items-center justify-center">
          <span className="z-[1] text-sky-900 font-bold animate-bounce">Loading...</span>
        </div>
      )
    }
  }

  const renderComponentFilter = () => {
    if (renderCustomFilter) {
      return renderCustomFilter();
    }
  }

  return (
    <div className="w-full flex flex-col relative">
      {renderComponentFilter()}
      <div className="w-full flex flex-row overflow-auto hide-scroll border border-sky-900 tablet:border-transparent">
        <table className="w-full">
          {renderTitle()}
          <tbody className="text-sm">
          {renderData()}
          </tbody>
          {renderTitleFooter()}
        </table>
      </div>
      {renderInfo()}
      {renderLoading()}
    </div>
  )
}

export default DataTable;