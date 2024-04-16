import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import _ from 'lodash';

import { formatDate } from './../../../helper';

import Header from './header';

import Default from './../../../assets/images/defaul-img.png';

import Right from './../../../assets/svgs/right.svg';

const useOutsideClick = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const handleClick = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref]);

  return ref;
};

const ReservationSection = React.forwardRef((props, ref) => {
  let { data, name, onSubmit } = props;
  const reservationSlice = useSelector(({ reservation }) => reservation);
  const fullNameRef = useRef();
  const emailRef = useRef();
  const commentRef = useRef();
  const participantOption = [
    {label: 'Hanya saya saja', value: 1},
    {label: '2 Orang', value: 2},
    {label: '3 Orang', value: 3},
    {label: 'Lebih dari 3 Orang', value: 4},
  ];

  const handleClickParticipantOutside = () => {
    setActiveParticipantList(false);
  };

  const selectRef = useOutsideClick(handleClickParticipantOutside);

  const [valueParticipant, setValueParticipant] = useState(0);
  const [activeParticipantList, setActiveParticipantList] = useState(false);

  const [fullname, setFullname] = useState(name??'');
  const [email, setEmail] = useState('');
  const [participant, setParticipant] = useState({label: 'Pilih jumlah yang hadir', value: 0})
  const [attendance, setAttendance] = useState(0);
  const [comment, setComment] = useState('');
  const [errorFullname, setErrorFullname] = useState(`&nbsp;`);
  const [errorEmail, setErrorEmail] = useState(`&nbsp;`);
  const [errorParticipant, setErrorParticipant] = useState(`&nbsp;`);
  const [errorAttendance, setErrorAttendance] = useState(`&nbsp;`);
  const [errorComment, setErrorComment] = useState(`&nbsp;`);

  useEffect(() => {
    setActiveParticipantList(false);
  }, [])

  useEffect(() => {
    selectValueParticipant()
  }, [valueParticipant]);

  useEffect(() => {
    let {
      isLoading,
      isSuccess
    } = reservationSlice;

    if (!isLoading && isSuccess) resetForm();

  }, [reservationSlice]);

  useEffect(() => {
    if(name && !fullname) setFullname(name);
  }, [name]);

  const resetForm = () => {
    setErrorFullname(`&nbsp;`);
    setErrorEmail(`&nbsp;`);
    setErrorParticipant(`&nbsp;`);
    setErrorAttendance(`&nbsp;`);
    setErrorComment(`&nbsp;`);

    setFullname(name??'');
    setEmail('');
    setParticipant({label: 'Select Participant', value: 0})
    setAttendance(0);
    setComment('');
  }

  const validateForm = () => {
    setErrorFullname(`&nbsp;`);
    setErrorEmail(`&nbsp;`);
    setErrorParticipant(`&nbsp;`);
    setErrorAttendance(`&nbsp;`);
    setErrorComment(`&nbsp;`);

    let fullnameRegex = /^[A-Za-z\s]*$/;
    let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let result = {
      isError: false,
      data: {
        fullname: fullname,
        email: email,
        participant: participant?.value,
        attendance: attendance === 1 ? 1 : attendance === 2 ? 2 : 0,
        comment: comment
      }
    }

    if (!fullname) {
      result.isError = true;
      setErrorFullname('Nama lengkap wajib diisi');
    } else if (fullname?.length > 50) {
      result.isError = true;
      setErrorFullname('Nama lengkap maksimal 50 karakter');
    } else if (!fullnameRegex.test(fullname)) {
      result.isError = true;
      setErrorFullname('Format nama lengkap tidak valid (<span class="font-bold italic">Only huruf and spasi</span>)');
    }

    if (!email) {
      result.isError = true;
      setErrorEmail('Email wajib diisi');
    } else if (email?.length > 50) {
      result.isError = true;
      setErrorEmail('Email maksimal 30 karakter');
    } else if (!emailRegex.test(email)) {
      result.isError = true;
      setErrorEmail('Format email tidak valid');
    }

    if (!participant?.value) {
      result.isError = true;
      setErrorParticipant('Jumlah yang hadir wajib diisi');
    }

    if (!attendance) {
      result.isError = true;
      setErrorAttendance('Kehadiran wajib diisi');
    }

    if (!comment) {
      result.isError = true;
      setErrorComment('Komentar wajib diisi');
    }else if (comment?.length > 230) {
      result.isError = true;
      setErrorComment('Komenta maksimal 230 karakter');
    }

    return result;
  }

  const renderListParticipant = () => {
    return participantOption?.map((item, index) => {
      return <span key={index} className={`cursor-point ${valueParticipant === item?.value ? 'bg-dark-pink text-white' : ''} hover:bg-dark-pink hover:text-white flex items-center p-1 rounded`} onClick={() => {
        setValueParticipant(item?.value)
        setActiveParticipantList(!activeParticipantList)
      }}>{item?.label}</span>;
    });
  }

  const selectValueParticipant = () => {
    if (valueParticipant) {
      let filtered = _.first(participantOption?.filter((item) => item?.value === valueParticipant));
      if (filtered) {
        setParticipant(filtered);
      } else {
        setValueParticipant(0);
        setParticipant({label: 'Select Participant', value: 0});
      }
    } else {
      setValueParticipant(0);
      setParticipant({label: 'Select Participant', value: 0});
    }
  }

  return (
    <div ref={ref} className={`w-full min-h-screen tablet-lg:h-screen desktop:h-auto flex flex-col items-center relative `}>
      <Header
        title={'Reservation'}
        textColor={'text-light-pink'}
        zIndex={'z-[1]'}
      />

      {data?.reservation_bg ? (
        <img src={data?.reservation_bg} className="w-full h-full absolute top-0 left-0 object-cover opacity-40" alt="bg"/>
      ) : (
        <img src={Default} className="w-full h-full absolute top-0 left-0 object-cover opacity-40" alt="bg"/>
      )}

      <div className="w-full h-full absolute top-0 left-0 bg-black opacity-30" />

      <div className="w-full desktop:w-[750px] h-full flex flex-col px-5 pb-5 tablet:pb-20 tablet:mt-10 desktop:mt-0 tablet:px-20 desktop:px-5 z-[1]">
        <div className="w-full h-fit px-10 flex flex-col items-center text-center mb-10 tablet:mb-15 desktop:mb-10 text-light-pink font-bold text-sm desktop:text-lg">
          <span>Harap isi form reservasi sebelum</span>
          <span className="mb-10 tablet:mb-15 desktop:mb-10">{formatDate(data?.event_ceremonial_date).month} {formatDate(data?.event_ceremonial_date).date}, {formatDate(data?.event_ceremonial_date).year}</span>
          <span>Kami sangat mengharapkan kehadiran anda</span>
        </div>
        
        <div className="w-full h-fit tablet:h-full flex flex-col items-center justify-between bg-light-pink rounded-md p-5 tablet:p-10 text-dark-pink shadow-lg gap-5 desktop:gap-5 relative">
          <img src={Right} className="h-full absolute right-0 top-0" alt="shape" />
          <span className="font-bold text-xl z-[1]">FORM RESERVASI</span>

          <div className="w-full flex flex-col z-[1]">
            <div
              className="font-bold cursor-pointer w-fit"
              onClick={() => fullNameRef?.current?.focus()}
            >Nama lengkap <span className="text-red-500">*</span></div>
            <input ref={fullNameRef} name="full_name" type="text" className="h-[30px] px-2 outline-none rounded" placeholder="Isi nama lengkap anda disini" autoComplete="off" maxLength={50} value={fullname} onChange={(e) => setFullname(e?.currentTarget?.value)}/>
            <span className="text-red-500 text-xs mt-1" dangerouslySetInnerHTML={{__html: errorFullname}}></span>
          </div>

          <div className="w-full flex flex-col z-[1]">
            <div
              className="font-bold cursor-pointer w-fit"
              onClick={() => emailRef?.current?.focus()}
            >Email <span className="text-red-500">*</span></div>
            <input ref={emailRef} name="email" type="email" className="h-[30px] px-2 outline-none rounded" placeholder="Isi email anda disini" autoComplete="off" maxLength={50} value={email} onChange={(e) => setEmail(e?.currentTarget?.value)}/>
            <span className="text-red-500 text-xs mt-1" dangerouslySetInnerHTML={{__html: errorEmail}}></span>
          </div>

          <div className="w-full flex flex-col z-[2]">
            <div className="font-bold w-fit" >Jumlah yang hadir <span className="text-red-500">*</span></div>
            <div className="w-full h-[30px] px-2 flex flex-row justify-center bg-white rounded cursor-pointer relative">
              <div
                ref={selectRef}
                className="w-full h-fit flex flex-row items-center"
                onClick={() => setActiveParticipantList(!activeParticipantList)}
              >
                <span className={`w-full whitespace-nowrap text-ellipsis flex flex-row items-center pt-1 ${participant?.value ? 'text-dark-pink' : 'text-[#9CA3B0]'}`}>{participant?.label}</span>
                {participant?.value ? (
                  <span
                    className="flex flex-row items-center ml-2 cursor-pointer"
                    onClick={() => {
                      setValueParticipant(0);
                      setParticipant({label: 'Select Participant', value: 0})
                    }}
                  ><i className="fa-solid fa-xmark"></i>
                  </span>
                ) : null}
                <span className="flex flex-row items-center ml-2"><i className="fa-solid fa-chevron-down"></i></span>
              </div>
              <div className={`w-full absolute left-0 top-[40px] bg-white p-2 rounded ${!activeParticipantList ? 'hidden': 'flex'} flex-col text-xs gap-1 shadow-lg`}>
                {renderListParticipant()}
              </div>
            </div>
            <span className="text-red-500 text-xs mt-1" dangerouslySetInnerHTML={{__html: errorParticipant}}></span>
          </div>

          <div className="w-full flex flex-col z-[1]">
            <div
              className="font-bold cursor-pointer w-fit"
              onClick={() => setAttendance(1)}
            >Kehadiran <span className="text-red-500">*</span></div>
            <div className="w-full flex flex-col">
              <div
                className="w-fit flex flex-row items-center gap-2"
                onClick={() => setAttendance(1)}
              >
                <input type="radio" className="cursor-pointer" val={1} onChange={() => setAttendance(1)} checked={attendance===1}/>
                <span className="mt-1 cursor-pointer">Ya, Saya akan hadir</span>
              </div>
              <div
                className="w-fit flex flex-row items-center gap-2"
                onClick={() => setAttendance(2)}
              >
                <input type="radio" className="cursor-pointer" val={2} onChange={() => setAttendance(2)} checked={attendance===2}/>
                <span className="mt-1 cursor-pointer">Maaf, Saya tidak bisa hadir</span>
              </div>
            </div>
            <span className="text-red-500 text-xs mt-1" dangerouslySetInnerHTML={{__html: errorAttendance}}></span>
          </div>

          <div className="w-full flex flex-col z-[1]">
            <div
              className="font-bold cursor-pointer w-fit"
              onClick={() => commentRef?.current?.focus()}
            >Komentar <span className="text-red-500">*</span></div>
            <textarea ref={commentRef} name="textarea" className="min-h-[90px] max-h-[90px] h-[90px] px-2 pt-1 outline-none rounded" placeholder="Isi komentar anda disini" autoComplete="off" maxLength={230} value={comment} onChange={(e) => setComment(e?.currentTarget?.value)} />
            <span className="text-red-500 text-xs mt-1" dangerouslySetInnerHTML={{__html: errorComment}}></span>
          </div>

          <div className="w-full flex flex-col desktop:flex-row gap-5 z-[1]">
            <div
              className="w-full desktop:w-1/3 transition-all duration-300 ease-in-out flex items-center justify-center text-center py-4 rounded-md font-bold shadow-lg cursor-pointer bg-white desktop:bg-transparent hover:bg-white"
              onClick={() => resetForm()}
            >RESET</div>
            <div
              className="w-full transition-all duration-300 ease-in-out flex items-center justify-center text-center py-4 rounded-md font-bold shadow-lg cursor-pointer bg-white desktop:bg-transparent hover:bg-white"
              onClick={() => {
                if (onSubmit) {
                  let result = validateForm();
                  return onSubmit(result);
                } else {
                  return {}
                }
              }}
            >KIRIM</div>
          </div>

        </div>
      </div>

    </div>
  )
})

export default ReservationSection;