import React, { useEffect, useState } from 'react';
import { useAudioPlayer } from '../../context/PlayerContext';

const AudioControlPanel = () => {
  const { isPlaying, playTrack, pauseTrack, currentTrack } = useAudioPlayer();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if(isPlaying == true){
        setVisible(true)
    }
  }, [isPlaying])

  const togglePlayPause = () => {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack(currentTrack);
    }
  };

  return (
    <div className={`fixed left-0 right-0 z-[100] bg-gray-900 p-3 flex items-center justify-between shadow-lg transition-all duration-500 ${visible ? 'bottom-0' : '-bottom-24'}`}>
    <div className="flex items-center space-x-4">
        <img src={currentTrack.coverUrl || 'path/to/default/cover.png'} alt="Cover" className="w-14 h-14 rounded-full shadow-md" />
        <div>
            <p className="text-white text-lg font-semibold">{currentTrack.title}</p>
            <p className="text-gray-400 text-sm">{currentTrack.artist}</p>
        </div>
    </div>
    <button
        onClick={togglePlayPause}
        className={`p-2 rounded-full ${isPlaying ? 'bg-green-500 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-800'} transition-colors duration-200`}
    >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white">
        {isPlaying ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m5-3a7 7 0 11-14 0 7 7 0 0114 0z" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197 2.534 3.197 2.534V11.168zM9.804 11.168v5.068l3.197-2.534-3.197-2.534z" />
        )}
        </svg>
    </button>
</div>
  );
};

export default AudioControlPanel;