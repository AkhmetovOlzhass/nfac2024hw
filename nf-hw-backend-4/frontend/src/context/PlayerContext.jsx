import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import AudioControlPanel from '../components/AdioControlPanel';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext';

const AudioPlayerContext = createContext();
const socket = io('https://nfac2024hw-production.up.railway.app');

export const useAudioPlayer = () => useContext(AudioPlayerContext);

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrackUrl] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const {artistId} = useAuth();

  const playTrack = (song) => {
    setCurrentTrackUrl(song);
    setIsPlaying(true);
    socket.emit('updateTrack', { userId: artistId, track: song.title, artist: song.artist });
  };

  const pauseTrack = () => {
    audioRef.current.pause();
    setIsPlaying(false);
    socket.emit('updateTrack', { userId: artistId, track: null, artist: null });
  };

  useEffect(() => {
    const audio = audioRef.current;

    audio.src = currentTrack.url;
    audio.addEventListener('canplay', () => audio.play());

    return () => {
      audio.removeEventListener('canplay', () => audio.play());
    };
  }, [currentTrack]);

  useEffect(() => {
    if (isPlaying && currentTrack) {
      audioRef.current.play();
    }
  }, [isPlaying, currentTrack]);

  return (
    <AudioPlayerContext.Provider value={{ playTrack, pauseTrack, isPlaying, currentTrack }}>
      {children}
      <AudioControlPanel />
    </AudioPlayerContext.Provider>
  );
};