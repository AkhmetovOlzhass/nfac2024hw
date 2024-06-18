import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import defaultImg from '../../assets/default-avatar.png'

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import PlayPauseButton from '../../components/PlayPause'
import { useAuth } from "../../context/AuthContext";

const SearchPage = () => {
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const {getUsers, getAllSongs} = useAuth()

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await getAllSongs();
                console.log(response);
                setSongs(response);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response);
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };
        fetchSongs();

        fetchUsers()
    }, []);

    useEffect(() => {
        if (query.length > 0 && songs) { 
            const results = songs.filter(song =>
                song.title.toLowerCase().startsWith(query.toLowerCase())
            );

            const resultsUsers = users.filter(user =>
                user.username.toLowerCase().startsWith(query.toLowerCase())
            );
            setFilteredResults(results);

            setFilteredUsers(resultsUsers)
        } else {
            setFilteredResults([]);
        }
    }, [query, songs, users]);
  
    return (
        <div className="min-h-screen text-gray-300">
            <div className="bg-custom-section md:pl-72 pt-16 p-8">
                <div className="bg-black min-h-screen p-8 text-white">
                <form className="flex items-center bg-black p-4 rounded-md">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search songs or artists"
                        className="flex-grow p-2 rounded-l-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none"
                    />
                    <button type="submit" className="bg-spotify-green hover:bg-spotify-green-dark text-white px-4 py-2 rounded-r-md transition duration-300">
                        Search
                    </button>
                </form>
                <ul className="mt-4">
                    {filteredResults.map((song) => (
                        <li key={song._id} className="flex items-center bg-gray-800 rounded-lg p-4 mb-2 hover:bg-gray-700 transition duration-300 ease-in-out">
                            <img 
                                src={song.coverUrl || 'default-cover-url.png'} 
                                alt="Cover" 
                                className="w-16 h-16 rounded mr-4"
                            />
                            <PlayPauseButton song={song} />
                            <div className='w-full'>
                                <div className="flex-grow mb-2">
                                    <div className="text-lg font-semibold flex items-center justify-between">
                                        <div>
                                        {song.title} - <Link className=" underline" to={`/user/${song.artistId}`}>{song.artist}</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}

                    {filteredUsers.map((user) => (
                        <li key={user._id} className="flex items-center bg-gray-800 rounded-lg p-4 mb-2 hover:bg-gray-700 transition duration-300 ease-in-out">
                            <img 
                                src={user.avatarUrl || defaultImg} 
                                alt="avatar" 
                                className="w-16 h-16 rounded mr-4"
                            />

                            <div className='w-full'>
                                <div className="flex-grow mb-2">
                                    <div className="text-lg font-semibold flex items-center">
                                        <Link className="underline" to={`/user/${user._id}`}>{user.username}</Link>
                                    </div>
                                </div>

                            </div>
                        </li>

                        
                    ))}
                </ul>
                </div>
            </div>
        </div>
    );
}

export default SearchPage;