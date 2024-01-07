import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

export const useOutsideClick = (callback) => {
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

export const useQueryParams = () => {
  const location = useLocation();
  let { search } = location;
  const [queryParams, setQueryParams] = useState({});
  
  useEffect(() => {
    if (search) {
      let params = search.substring(1);
      let decoded = JSON.parse('{"' + decodeURI(params).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
      setQueryParams(decoded);
    }
  }, []);

  return queryParams;
}