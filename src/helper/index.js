export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  let data = {
    width,
    height,
    position: 0,
  };
  return data;
}