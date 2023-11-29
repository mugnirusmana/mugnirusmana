export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  let data = {
    width,
    height,
    position: 0,
  };
  return data;
}

export const openUrl = (url, type = 'new-tab') => {
  if (type) {
    return window.open(url, '_blank', 'noopener,noreferrer');
  }
  return window.location.href = url;
}

export const decodeParams = (queryString) => {
  if (queryString) {
    return JSON.parse('{"' + decodeURI(queryString?.replace('?','')).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  } else {
    return {}
  }
}