import moment from 'moment';

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

export const formatDate = (date) => {
  let result = {
    m: '-',
    mon: '-',
    month: '-',
    date: '-',
    year: '-'
  }

  if (date && (date !== "" || date !== false)) {
    result.m = moment(date).format('MM');
    result.mon = moment(date).format('MMM');
    result.month = moment(date).format('MMMM');
    result.date = moment(date).format('DD');
    result.year = moment(date).format('YYYY');
  }

  return result;
}

export const formatDateCoundown = (date, time) => {
  let result = null;
  if ((date && (date !== "" || date !== false)) && (time && (time !== "" || time !== false))) result = moment(`${date} ${time}`).format('DD/MM/YYYY H:i');
  return result;
}