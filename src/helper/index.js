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

export const downloadFile = (params) => {
  if (params && params?.url) {
    let name = params?.name??'download-file';
    let link = document.createElement("a");
    link.download = name;
    link.href = params?.url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  } else {
    return false;
  }
}

export const getInvitaionMessage = (data) => {
  if (data) {
    return `Assalamualaikum Warahmatullahi Wabarakatuh%0a
%0a
Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i, untuk menghadiri acara pernikahan kami, pada:%0a
- Tanggal: ${data?.date??'-'}%0a
- ⁠Lokasi: ${data?.location??'-'}%0a
%0a
Suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan untuk hadir dan memberikan doa restu.%0a
%0a
Terima kasih banyak atas perhatiannya.%0a
%0a
Wassalamualaikum Warahmatullahi Wabarakatuh%0a
%0a
~ _Ade dan Nova_%0a
%0a
Info lebih lanjut & undangan pernikahan:%0a
https://www.google.com${data?.name ? '?name='+data?.name : ''}`
  } else {
    return null;
  }
}