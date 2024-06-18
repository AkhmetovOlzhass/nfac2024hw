import React from 'react';
import { RiPlayFill, RiPauseFill } from "react-icons/ri";
import { useAudioPlayer } from '../../context/PlayerContext';
import { io } from 'socket.io-client';
import { useAuth } from '../../context/AuthContext';

const socket = io('http://localhost:5000');



const PlayPauseButton = ({ song }) => {
  const { playTrack, pauseTrack, isPlaying } = useAudioPlayer();
  const {artistId} = useAuth();
  
  const handlePlayPause = () => {
    if (isPlaying) {
      pauseTrack();
      socket.emit('updateTrack', { userId: artistId, track: null, artist: null });
    } else {
      playTrack(song);
      socket.emit('updateTrack', { userId: artistId, track: song.title, artist: song.artist });
    }
  };

  return (
    <div onClick={handlePlayPause} className="bg-main-lg rounded-lg p-4 hover:bg-main-lgHover transition-all group w-30">
      <div className="mb-0 relative flex justify-start items-center">
        <button className="p-3 text-3xl bg-main-green rounded-full text-gray absolute -left-16 -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 ease-out bg-[#65D46E] text-black">
          {isPlaying ? <RiPauseFill className='w-4 h-4' /> : <RiPlayFill className='w-4 h-4' />}
        </button>
      </div>
    </div>
  );
};

export default PlayPauseButton;