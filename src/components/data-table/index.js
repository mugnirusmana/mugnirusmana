const DataTable = (props) => {
  let {
    config,
    title,
    isLoading,
    perPage,
    currentPage,
    showInfo,
    showTitleFooter,
    withNumber,
    withAction,
    renderAction,
    onChangePerPage,
    onChangePage,
  } = props;

  const looListPage = () => {
    let data = [];
    for (let i = 1; i <= config?.paginate?.totalPage; i++) {
      data.push(i);
    }
    return data;
  }

  const renderListByTitle = (item) => {
    return title?.map((item_title, key) => {
      if (item_title?.object) {
        if (item_title?.customRender) {
          return <span key={key} className="w-full">{item_title?.customRender(item)}</span>
        } else {
          return <span key={key} className="w-full">{item[item_title?.object]}</span>
        }
      } else {
        return <span key={key} className="w-full">-</span>
      }
    })
  }

  const renderListData = () => {
    if (config?.data?.length > 0) {
      return config?.data?.map((item, index) => {
        return (
          <div key={index} className={`w-full text-xs flex flex-row gap-2 py-2 hover:bg-gray-100 px-2 ${index > 0 ? 'border border-t-gray-300' : ''}`}>
            {renderNumberList(currentPage, index)}
            {renderListByTitle(item)}
            {renderActionList(item)}
          </div>
        );
      });
    } else {
     return (
      <div className="w-full flex flex-row items-center justify-center gap-2 py-2 border-b border-b-gray-300 hover:bg-gray-100">
        No Data Found
      </div>
     )
    }
  }

  const renderNumberList = (currentPage, item) => {
    let page = ((currentPage-1) * perPage) + item+1;
    if (currentPage < 1) page = currentPage + item;
    if (withNumber) {
      return <span className="w-[300px]">{page}</span>
    }
  }

  const renderActionList = (item) => {
    if (withAction && renderAction) {
      return <div className="w-full flex flex-row justify-end">{renderAction(item)}</div>
    }
  }

  const renderNumberTitle = () => {
    if (withNumber) {
      return <span className="w-[300px] font-bold">No</span>
    }
  }

  const renderActionTitle = () => {
    if (withAction && renderAction) {
      return <span className="w-full font-bold text-right">Action</span>
    }
  }

  const renderTitle = () => {
    return title?.map((item, index) => {
      return <span key={index} className="w-full font-bold">{item?.label}</span>
    })
  }

  const renderListPage = () => {
    let result = looListPage();
    return result?.map((item, index) => {
      return <option key={index} value={item}>{item}</option>
    })
  }

  const renderTitleFooter = () => {
    if (showTitleFooter) {
      return (
        <div className="w-full flex flex-row gap-2 py-2 border-t-2 border-t-sky-900 border-b-2 border-b-sky-900 px-2">
          {renderNumberTitle()}
          {renderTitle()}
          {renderActionTitle()}
        </div>
      )
    }
  }

  const renderInfo = (currentPage) => {
    if (showInfo) {
      return (
        <div className="w-full flex flex-col desktop:flex-row items-center px-2 py-5 text-xs gap-5">
          <span className="w-fit desktop:w-full">Total Data: <span className="font-bold">({config?.data?.length} / {config?.paginate?.totalData})</span></span>
          <div className="w-fit flex flex-col desktop:flex-row items-center gap-2">
            <span className="whitespace-nowrap">Data Per Page</span>
            <select
              className="w-[50px] border border-sky-900 rounded"
              value={perPage}
              onChange={(e) => {
                if (onChangePerPage) {
                  return onChangePerPage(e?.currentTarget?.value)
                }
              }}
            >
              <option>10</option>
              <option>50</option>
              <option>100</option>
            </select>
            <span className="hidden desktop:block border-l border-l-sky-900">&nbsp;</span>
            <span className="whitespace-nowrap">Select Page</span>
            <select
              className="w-[50px] border border-sky-900 rounded"
              value={currentPage}
              onChange={(e) => {
                if (onChangePage) {
                  return onChangePage(e?.currentTarget?.value)
                } else {
                  return {}
                }
              }}
            >
              {renderListPage()}
            </select>
          </div>
        </div>
      );
    }
  }

  const renderLoading = () => {
    if (isLoading) {
      return (
        <div className='w-full h-full absolute top-0 left-0 text-white flex items-center justify-center'>
          <div className='w-full h-full flex items-center justify-center relative'>
            <span className='z-[1] font-bold'>Loading...</span>
            <div className='w-full h-full bg-black opacity-50 absolute left-0 top-0'></div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="w-full h-fit flex">
      <div className="w-full h-fit border-2 border-sky-900 rounded overflow-x-auto relative">
        <div className="w-full flex flex-row gap-2 py-2 border-b-2 border-b-sky-900 px-2">
          {renderNumberTitle()}
          {renderTitle()}
          {renderActionTitle()}
        </div>
        {renderListData()}
        {renderTitleFooter()}
        {renderInfo(currentPage)}
        {renderLoading()}
      </div>
    </div>
  )
}

export default DataTable;