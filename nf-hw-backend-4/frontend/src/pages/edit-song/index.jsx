import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

import axios from 'axios';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';



const EditSong = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [songFile, setSongFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [coverImageFile, setCoverImageFile] = useState(null);


  const songFileInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    if (songFile) formData.append('song', songFile);
    if (coverImageFile) formData.append('coverImage', coverImageFile);

    setUploadStatus('Uploading...');

    try {
      await axios.put(`https://nfac2024hw-production.up.railway.app/api/v5/songs/${id}`, formData);
      setTitle('')
      setSongFile(null);
      setCoverImageFile(null)

      setUploadStatus('Upload successful!');
    } catch (error) {
      console.error('Failed to update song:', error);
    }
  };

  return (
<div className="min-h-screen text-gray-300">
      <div className="bg-custom-section md:pl-72 p-8">
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-gray-300">
        <h1 className="text-green-400 text-3xl font-bold mb-6">Edit Song</h1>
        <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-1/3 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-500 text-white"
            />
          </div>
          <div>
            <p className="mb-2">Выберите файл для обложки песни</p>
            <input
              type="file"
              accept="image/*"
              ref={coverImageInputRef}
              onChange={(e) => setCoverImageFile(e.target.files[0])}
              required
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0 file:text-sm file:font-semibold
                        file:bg-green-500 file:text-white hover:file:bg-green-600"
            />
            {coverImageFile && <span className="text-green-400 ml-2">{coverImageFile.name}</span>}
          </div>
          <div>
            <p className="mb-2">Выберите файл для загрузки песни</p>
            <input
              type="file"
              ref={songFileInputRef}
              onChange={(e) => setSongFile(e.target.files[0])}
              required
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0 file:text-sm file:font-semibold
                        file:bg-green-500 file:text-white hover:file:bg-green-600"
            />
            {songFile && <span className="text-green-400 ml-2">{songFile.name}</span>}
          </div>
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded">
            Update Song
          </button>
          {uploadStatus && <p className="text-green-400 mt-4">{uploadStatus}</p>}
        </form>
      </div>
      </div>
    </div>
  );
};

export default EditSong;