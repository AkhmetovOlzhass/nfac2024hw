import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';



const EditUser = () => {
  const { id } = useParams();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  
  const navigate = useNavigate();

  const {artistId} = useAuth()

  useEffect(() => {
    if(artistId && id != artistId){
        navigate(`/`);
    }
  }, [artistId])

  const avatarFileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('description', description);
    if (avatar) formData.append('avatar', avatar);

    setUploadStatus('Uploading...');

    try {
      await axios.put(`https://nfac2024hw-production.up.railway.app/api/v5/users/${id}`, formData);

      localStorage.setItem('username', username);

      setUsername('')
      setEmail('');
      setDescription('');
      setAvatar(null)



      setUploadStatus('Upload successful!');
    } catch (error) {
      console.error('Failed to update song:', error);
    }
  };

  return (
<div className="min-h-screen text-gray-300">
      <div className="bg-custom-section md:pl-72 p-8">
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-gray-300">
        <h1 className="text-green-400 text-3xl font-bold mb-6">Edit Profile</h1>
        <form onSubmit={handleSubmit} className="bg-gray-900 p-8 rounded-lg shadow-lg w-1/3 space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-500 text-white"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-500 text-white"
            />
          </div>
          <div>
            <textarea
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 placeholder-gray-500 text-white"
            />
          </div>
          <div>
            <p className="mb-2">Выберите файл для аватара пользователя</p>
            <input
              type="file"
              accept="image/*"
              ref={avatarFileInputRef}
              onChange={(e) => setAvatar(e.target.files[0])}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0 file:text-sm file:font-semibold
                        file:bg-green-500 file:text-white hover:file:bg-green-600"
            />
            {avatar && <span className="text-green-400 ml-2">{avatar.name}</span>}
          </div>


          
          <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded">
            Update Profile
          </button>
          {uploadStatus && <p className="text-green-400 mt-4">{uploadStatus}</p>}
        </form>
      </div>
      </div>
    </div>
  );
};

export default EditUser;