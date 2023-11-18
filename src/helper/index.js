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