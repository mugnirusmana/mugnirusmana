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

  const setOptionStyle = (item) => {
    if (objectLabel && (value[objectLabel] === item[objectLabel])) {
      return 'bg-sky-900 text-white cursor-default'
    } else if (typeof value !== 'object' && (value?.toString() === item?.toString())) {
      return 'bg-sky-900 text-white cursor-default';
    } else {
      return 'bg-transparent text-sky-900 cursor-pointer';
    }
  }

  const renderOptionValue = (item) => {
    if (objectLabel && (item[objectLabel])) {
      return item[objectLabel]
    } else if (typeof item !== 'object') {
      return item;
    } else {
      return '-';
    }
  }

  const validateOption = (item) => {
    if (objectUniq && (item[objectUniq] === value[objectUniq])) {
      return true;
    } else if (typeof item !== 'object' && (value?.toString() === item?.toString())) {
      return true;
    } else {
      return false;
    }
  }

  const validateSearch = (item) => {
    if (objectLabel) {
      return item[objectLabel]?.toString()?.toLowerCase()?.includes(searchValue?.toLowerCase());
    } else if(typeof item !== 'object') {
      return item?.toString()?.toLowerCase()?.includes(searchValue?.toLowerCase());
    } else {
      return '';
    }
  }

  const renderOptionList = () => {
    if (!isLoading && options?.length > 0) {
      if (!searchServerSide && searchValue) {
        return options?.map((item, index) => {
          let status = validateSearch(item)
          if (status) {
            return (
              <div
                key={index}
                className={`w-full h-fit ${setOptionStyle(item)} hover:bg-sky-900 hover:text-white p-1 rounded`}
                onClick={() => {
                  let status = validateOption(item);
                  if (onChange && !status) {
                    setShowList(false);
                    return onChange(item);
                  } else {
                    return {}
                  }
                }}
              >{renderOptionValue(item)}</div>
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
              className={`w-full h-fit ${setOptionStyle(item)} hover:bg-sky-900 hover:text-white p-1 rounded`}
              onClick={() => {
                let status = validateOption(item);
                if (onChange && !status) {
                  setShowList(false);
                  return onChange(item);
                } else {
                  return {}
                }
              }}
            >{renderOptionValue(item)}</div>
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
    if (objectLabel && value[objectLabel]) {
      return value[objectLabel]
    } else if (typeof value !== 'object' && value) {
      return value;
    } else {
      return placeholder??'Select';
    }
  }

  const renderClear = () => {
    if (showClear && value[objectLabel]) {
      return (
        <span
          className="w-fit h-full flex items-center ml-2"
          onClick={() => {
            if (onClear) {
              setShowList(false);
              if (objectLabel) return onClear({})
              if (typeof value !== 'object') return onClear(null);
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

  const renderStyleValue = () => {
    if (objectLabel && value[objectLabel]) {
      return 'text-sky-900'
    } else if (typeof value !== 'object' && value) {
      return 'text-sky-900';
    } else {
      return 'text-[#9CA3B0]';
    }
  }

  return (
    <div ref={selectRef} className="w-full h-[30px] rounded flex flex-col border border-sky-900 text-xs relative">
      <div className="w-full h-full flex flex-row px-2 cursor-pointer">
        <span className={`w-full h-full whitespace-nowrap text-ellipsis flex items-center ${renderStyleValue()}`} onClick={() => setShowList(!showList)}>{renderSelectedValue()}</span>
        {renderClear()}
        <span className="w-fit h-full flex items-center ml-2" onClick={() => setShowList(!showList)}>{renderIcon()}</span>
      </div>
      {renderOption()}
      
    </div>
  )
}

export default SelectOption;