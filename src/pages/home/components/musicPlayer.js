import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";

import Song1 from './../../../assets/musics/song1.mp3';
import Song2 from './../../../assets/musics/song2.mp3';
import Song3 from './../../../assets/musics/song3.mp3';
import Song4 from './../../../assets/musics/song4.mp3';

const MusicPlayer = (props) => {
  let { firstPlay } = props;
  const [show, setShow] = useState(false);
  const [close, setClose] = useState(false);
  const [isFirstPlay, setIsFirstPlay] = useState(false);
  const [currentSong, setCurrentSong] = useState(null);
  const [titleSong, setTitleSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  let audio1 = useRef(new Audio(Song1)).current;
  let audio2 = useRef(new Audio(Song2)).current;
  let audio3 = useRef(new Audio(Song3)).current;
  let audio4 = useRef(new Audio(Song4)).current;

  audio1.onended = () => {
    audio1.currentTime = 0;
    audio1.pause();
    audio2.play();
    setCurrentSong('2');
  }
  audio2.onended = () => {
    audio2.currentTime = 0;
    audio2.pause();
    audio3.play();
    setCurrentSong('3');
  };
  audio3.onended = () => {
    audio3.currentTime = 0;
    audio3.pause();
    audio4.play();
    setCurrentSong('4');
  };
  audio4.onended = () => {
    audio4.currentTime = 0;
    audio4.pause();
    audio1.play();
    setCurrentSong('1');
  };

  useEffect(() => {
    if (firstPlay) {
      setIsFirstPlay(true);
    }
  }, [firstPlay]);

  useEffect(() => {
    if (isFirstPlay) {
      onPlay(true);
      setIsFirstPlay(false)
;    }
  }, [isFirstPlay]);

  useEffect(() => {
    if (currentSong) {
      if (currentSong === '1') {
        setTitleSong(`1. I'll be there`);
      } else if (currentSong === '2') {
        setTitleSong(`2. Can't help falling in love `);
      } else if (currentSong === '3') {
        setTitleSong(`3. Beautiful in white`);
      } else if (currentSong === '4') {
        setTitleSong(`4. Let it be me`);
      }
    }
  }, [currentSong]);

  const onPlay = (first = false) => {
    if(first) {
      setCurrentSong('1');
      audio1.currentTime = 0;
      audio1.play();
      audio2.currentTime = 0;
      audio2.pause();
      audio3.currentTime = 0;
      audio3.pause();
      audio4.currentTime = 0;
      audio4.pause();
      setIsPlaying(true);
    } else {
      if (currentSong === '1') {
        setCurrentSong('1');
        setIsPlaying(true);
        audio1.play();
      } else if (currentSong === '2') {
        setCurrentSong('2');
        setIsPlaying(true);
        audio2.play();
      } else if (currentSong === '3') {
        setCurrentSong('3');
        setIsPlaying(true);
        audio3.play();
      } else if (currentSong === '4') {
        setCurrentSong('4');
        setIsPlaying(true);
        audio4.play();
      }
    }
  }

  const onPause = () => {
    if (currentSong === '1') {
      setIsPlaying(false);
      audio1.pause();
    } else if (currentSong === '2') {
      setIsPlaying(false);
      audio2.pause();
    } else if (currentSong === '3') {
      setIsPlaying(false);
      audio3.pause();
    } else if (currentSong === '4') {
      setIsPlaying(false);
      audio4.pause();
    }
  }

  const onStop = () => {
    if (currentSong === '1') {
      setIsPlaying(false);
      audio1.currentTime = 0;
      audio1.pause();
    } else if (currentSong === '2') {
      setIsPlaying(false);
      audio2.currentTime = 0;
      audio2.pause();
    } else if (currentSong === '3') {
      setIsPlaying(false);
      audio3.currentTime = 0;
      audio3.pause();
    } else if (currentSong === '4') {
      setIsPlaying(false);
      audio4.currentTime = 0;
      audio4.pause();
    }
  }

  const onPrevSong = () => {
    onStop();
    if (currentSong === '1') {
      setIsPlaying(true);
      setCurrentSong('4');
      audio4.currentTime = 0;
      audio4.play();
    } else if (currentSong === '2') {
      setIsPlaying(true);
      setCurrentSong('1');
      audio1.currentTime = 0;
      audio1.play();
    } else if (currentSong === '3') {
      setIsPlaying(true);
      setCurrentSong('2');
      audio2.currentTime = 0;
      audio2.play();
    } else if (currentSong === '4') {
      setIsPlaying(true);
      setCurrentSong('3');
      audio3.currentTime = 0;
      audio3.play();
    }
  }

  const onNextSong = () => {
    onStop();
    if (currentSong === '1') {
      setIsPlaying(true);
      setCurrentSong('2');
      audio2.currentTime = 0;
      audio2.play();
    } else if (currentSong === '2') {
      setIsPlaying(true);
      setCurrentSong('3');
      audio3.currentTime = 0;
      audio3.play();
    } else if (currentSong === '3') {
      setIsPlaying(true);
      setCurrentSong('4');
      audio4.currentTime = 0;
      audio4.play();
    } else if (currentSong === '4') {
      setIsPlaying(true);
      setCurrentSong('1');
      audio1.currentTime = 0;
      audio1.play();
    }
  }

  return (
    <div className={`w-[200px] flex flex-col transition-all duration-500 ease-in-out border border-dark-pink fixed ${close ? '-bottom-32' : show ? '-bottom-24' : 'bottom-5 desktop:bottom-20'} right-24 desktop:right-36 z-[60] rounded bg-light-pink shadow-lg p-3 text-dark-pink`}>
      <div className="w-full flex flex-col gap-3 relative">
        <div
          className="w-[30px] h-[20px] bg-light-pink rounded border border-dark-pink flex items-center justify-center absolute -top-5 right-8 cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <i className={`text-xs transition-all duration-300 ease-in-out fa-solid fa-angle-down ${show ? 'rotate-[0deg]' : 'rotate-[-180deg]'}`}></i>
        </div>
        <div
          className="w-[30px] h-[20px] bg-light-pink rounded border border-dark-pink flex items-center justify-center absolute -top-5 right-0 cursor-pointer"
          onClick={() => {
            setClose(true);
            onStop();
          }}
        >
          <i className="text-xs fa-solid fa-xmark"></i>
        </div>
        <div className="w-full flex border-b border-b-dark-pink py-2">
          <Marquee play={true} className="text-dark-pink font-bold text-xs">{titleSong??'-'}</Marquee>
        </div>
        <div className="w-full flex flex-row justify-center gap-3">
          <div
            className="w-[30px] h-[30px] rounded-full border border-dark-pink flex items-center justify-center cursor-pointer"
            onClick={() => onPrevSong()}
          ><i className="fa-solid fa-backward"></i></div>
          {isPlaying ? (
            <div
              className="w-[30px] h-[30px] rounded-full border border-dark-pink flex items-center justify-center cursor-pointer"
              onClick={() => onPause()}
            ><i className="fa-solid fa-pause"></i></div>
          ) : (
            <div
              className="w-[30px] h-[30px] rounded-full border border-dark-pink flex items-center justify-center cursor-pointer"
              onClick={() => onPlay()}
            ><i className="fa-solid fa-play"></i></div>
          )}
          <div
            className="w-[30px] h-[30px] rounded-full border border-dark-pink flex items-center justify-center cursor-pointer"
            onClick={() => onStop()}
          ><i className="fa-solid fa-stop"></i></div>
          <div
            className="w-[30px] h-[30px] rounded-full border border-dark-pink flex items-center justify-center cursor-pointer"
            onClick={() => onNextSong()}
          ><i className="fa-solid fa-forward"></i></div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;