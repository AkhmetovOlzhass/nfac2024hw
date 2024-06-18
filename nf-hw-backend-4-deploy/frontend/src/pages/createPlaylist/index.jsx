import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';



const CreatePlaylist = () => {
    const {artistId} = useAuth();
  const [playlistName, setPlaylistName] = useState('');
  const [playlistDescr, setPlaylistDescr] = useState('');
  const [playlistCover, setPlaylistCover] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');


  const playlistCoverFileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('playlistName', playlistName);
    formData.append('playlistDescr', playlistDescr);
    formData.append('userId', artistId);
    if (playlistCover) formData.append('playlistCover', playlistCover);

    setUploadStatus('Uploading...');

    try {
      await axios.post(`http://localhost:5000/api/v5/songs/playlist`, formData);
      setPlaylistName('')
      setPlaylistDescr('');
      setPlaylistCover(null)

      setUploadStatus('Upload successful!');
    } catch (error) {
      console.error('Failed to update song:', error);
    }
  };

  return (
<div className="min-h-screen text-gray-300">
      <div className="bg-custom-section md:pl-72 p-8">
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-gray-300">
        <h1 className="text-green-400 text-3xl font-bold mb-6">Create PlayList</h1>
        <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-1/3 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Playlist Name"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-500 text-white"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Playlist Description"
              value={playlistDescr}
              onChange={(e) => setPlaylistDescr(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-500 text-white"
            />
          </div>
          <div>
            <p className="mb-2">Выберите файл для обложки альбома</p>
            <input
              type="file"
              accept="image/*"
              name="playlistCover"
              ref={playlistCoverFileInputRef}
              onChange={(e) => setPlaylistCover(e.target.files[0])}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0 file:text-sm file:font-semibold
                        file:bg-green-500 file:text-white hover:file:bg-green-600"
            />
            {playlistCover && <span className="text-green-400 ml-2">{playlistCover.name}</span>}
          </div>

          
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded">
            Create Playlist
          </button>
          {uploadStatus && <p className="text-green-400 mt-4">{uploadStatus}</p>}
        </form>
      </div>
      </div>
    </div>
  );
};

export default CreatePlaylist;