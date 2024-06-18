import React, { useEffect, useRef } from 'react';
import { useAudioPlayer } from '../../context/PlayerContext';

const AudioPlayer = () => {
  const { currentTrackUrl, isPlaying, pauseTrack } = useAudioPlayer();
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    
    const playAudio = () => {
      if (isPlaying) {
        audio.play().catch(error => console.error('Error playing the track:', error));
      } else {
        audio.pause();
      }
    };

    audio.addEventListener('canplay', playAudio);
    audio.addEventListener('pause', pauseTrack);

    return () => {
      audio.removeEventListener('canplay', playAudio);
      audio.removeEventListener('pause', pauseTrack);
    };
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.src = currentTrackUrl;
    if (isPlaying) {
      audioRef.current.play().catch(error => console.error('Error auto-playing the track:', error));
    }
  }, [currentTrackUrl]);

  return (
    <audio ref={audioRef} controls style={{ width: '100%', position: 'fixed', zIndex: 100, bottom: 0 }}>
      Your browser does not support the audio element.
    </audio>
  );
};

export default AudioPlayer;