import React, { useEffect, useState, useRef } from "react";

const useOutsideClick = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
       if (callback) callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref]);

  return ref;
};

const SelectOption = (props) => {
  let {
    isLoading,
    options,
    objectLabel,
    objectUniq,
    value,
    optionPosition,
    onChange,
    showClear,
    onClear,
    showSearch,
    onSearch,
    searchServerSide,
    placeholder
  } = props;
  const [showList, setShowList] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleClickParticipantOutside = () => {
    setShowList(false);
  };

  const selectRef = useOutsideClick(handleClickParticipantOutside);

  const renderOptionList = () => {
    if (!isLoading && options?.length > 0) {
      if (!searchServerSide && searchValue) {
        return options?.map((item, index) => {
          let status = item[objectLabel]?.toString()?.toLowerCase()?.includes(searchValue?.toLowerCase());
          if (status) {
            return (
              <div
                key={index}
                className={`w-full h-fit ${item[objectUniq] === value[objectUniq] ? 'bg-sky-900 text-white cursor-default' : 'bg-transparent text-sky-900 cursor-pointer'} hover:bg-sky-900 hover:text-white p-1 rounded`}
                onClick={() => {
                  let status = item[objectUniq] === value[objectUniq];
                  if (onChange && !status) {
                    setShowList(false);
                    return onChange(item);
                  } else {
                    return {}
                  }
                }}
              >{item[objectLabel]??'-'}</div>
            )
          } else {
            return null;
          }
        })
      } else {
        return options?.map((item, index) => {
          return (
            <div
              key={index}
              className={`w-full h-fit ${item[objectUniq] === value[objectUniq] ? 'bg-sky-900 text-white cursor-default' : 'bg-transparent text-sky-900 cursor-pointer'} hover:bg-sky-900 hover:text-white p-1 rounded`}
              onClick={() => {
                let status = item[objectUniq] === value[objectUniq];
                if (onChange && !status) {
                  setShowList(false);
                  return onChange(item);
                } else {
                  return {}
                }
              }}
            >{item[objectLabel]??'-'}</div>
          )
        })
      }
    }
  }

  const renderSearch = () => {
    if (showSearch) {
      return (
        <input
          className="w-full outline-none bg-gray-100 border-gray-400 rounded px-2 py-2 text-xs mb-2" placeholder="Search"
          value={searchValue}
          onChange={(e) => {
            if (onSearch) {
              setSearchValue(e?.currentTarget?.value);
              return onSearch(e?.currentTarget?.value)
            } else {
              return {};
            }
          }}
        />);
    }
  }

  const renderOption = () => {
    if (showList) {
      return (
        <div className={`w-full h-fit transition-all duration-300 ease-in-out max-h-[120px] rounded bg-white absolute ${optionPosition === 'top' ? 'bottom-[35px]' : 'top-[35px]'} left-0 border border-sky-900 shadow-md flex flex-col p-2 z-[2]`}>
          {renderSearch()}
          <div className="w-full h-fit flex flex-col gap-1 overflow-y-auto hide-scroll">
            {renderOptionList()}
          </div>
        </div>
      )
    }
  }

  const renderSelectedValue = () => {
    if (value[objectLabel]) {
      return value[objectLabel]
    } else {
      return placeholder??'Select Data';
    }
  }

  const renderClear = () => {
    if (showClear && value[objectLabel]) {
      return (
        <span
          className="w-fit h-full flex items-center mr-2"
          onClick={() => {
            if (onClear) {
              setShowList(false);
              return onClear({})
            } else {
              return {}
            }
          }}
        ><i className="fa-solid fa-xmark"></i></span>
      )
    }
  }

  const renderIcon = () => {
    if (optionPosition === 'top') {
      if (!showList) {
        return <i className="fa-solid fa-caret-down"></i>
      } else {
        return <i className="fa-solid fa-caret-up"></i>
      }
    } else {
      if (!showList) {
        return <i className="fa-solid fa-caret-up"></i>
      } else {
        return <i className="fa-solid fa-caret-down"></i>
      }
    }
  }

  return (
    <div ref={selectRef} className="w-full h-[30px] rounded flex flex-col border border-sky-900 text-xs relative">
      <div className="w-full h-full flex flex-row px-2 cursor-pointer">
        <span className={`w-full h-full whitespace-nowrap text-ellipsis flex items-center ${value[objectLabel] ? 'text-sky-900' : 'text-[#9CA3B0]'}`} onClick={() => setShowList(!showList)}>{renderSelectedValue()}</span>
        {renderClear()}
        <span className="w-fit h-full flex items-center" onClick={() => setShowList(!showList)}>{renderIcon()}</span>
      </div>
      {renderOption()}
      
    </div>
  )
}

export default SelectOption;