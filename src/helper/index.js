export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height, scrollY: position } = window;
  let data = {
    width,
    height,
    position,
    bottom: position+height
  };
  return data;
}