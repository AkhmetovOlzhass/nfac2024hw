import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useService } from '../../context/Service';

const AddSong = () => {
  const [songs, setSongs] = useState([]);
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const {username, artistId, createSong} = useService();

  const fileInputRef = useRef(null);
  const coverImageInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', username);
    formData.append('song', file);
    formData.append('coverImage', coverImage);
    formData.append('artistId', artistId);
    setUploadStatus('Wait please...');

    try {
      const response = createSong(formData);
      setSongs([...songs, response.data]);
      setTitle('');
      setFile(null);
      setCoverImage(null);
      setUploadStatus('File uploaded successfully!');

      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      if (coverImageInputRef.current) {
        coverImageInputRef.current.value = null;
      }
    } catch (error) {
      console.error('Upload failed:', error);
      setUploadStatus('Failed to upload file.');
    }
  };

  return (

    <div className="min-h-screen text-gray-300">
      <div className="bg-custom-section md:pl-72 p-8">
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-gray-300">
        <h1 className="text-green-400 text-3xl font-bold mb-6">Song Upload</h1>
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
              onChange={(e) => setCoverImage(e.target.files[0])}
              required
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0 file:text-sm file:font-semibold
                        file:bg-green-500 file:text-white hover:file:bg-green-600"
            />
            {coverImage && <span className="text-green-400 ml-2">{coverImage.name}</span>}
          </div>
          <div>
            <p className="mb-2">Выберите файл для загрузки песни</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => setFile(e.target.files[0])}
              required
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0 file:text-sm file:font-semibold
                        file:bg-green-500 file:text-white hover:file:bg-green-600"
            />
            {file && <span className="text-green-400 ml-2">{file.name}</span>}
          </div>
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded">
            Upload Song
          </button>
          {uploadStatus && <p className="text-green-400 mt-4">{uploadStatus}</p>}
        </form>
      </div>
      </div>
    </div>

    
  );
};

export default AddSong;