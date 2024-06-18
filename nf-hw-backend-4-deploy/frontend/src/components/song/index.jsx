import PlayPauseButton from '../../components/PlayPause';

const Song = ({song, isOwner, handleDeleteClick, handleEditClick, handleAddToPlaylistClick, toggleFavorite, favorites }) => {
    const isFavorite = favorites ? favorites.includes(song._id) : null
    return (
        <>
            <li key={song._id} className="flex items-center bg-gray-800 rounded-lg p-4 mb-2 hover:bg-gray-700 transition duration-300 ease-in-out">
            <img 
                src={song.coverUrl || 'default-cover-url.png'} 
                alt="Cover" 
                className="w-16 h-16 rounded mr-4"
            />
            <PlayPauseButton song={song} />
            <div className='w-full'>
                <div className="flex-grow mb-2">
                    <div className="text-lg font-semibold flex items-center justify-between">{song.title} - {song.artist}
                        <div>
                        {isOwner ? <button
                            onClick={() => handleEditClick(song._id)}
                            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded transition duration-300"
                            >
                            Edit
                            </button> : null}
                                {isOwner ? <button
                                    onClick={() => handleDeleteClick(song._id)}
                                    className="ml-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded transition duration-300"
                                    >
                                Delete
                            </button> : null}
                            <button onClick={() => handleAddToPlaylistClick(song._id)} className="bg-blue-500 hover:bg-blue-700 ml-4 text-white font-bold py-2 px-4 rounded">
                                Add to Playlist
                            </button>
                            <button 
                                    onClick={() => toggleFavorite(song._id)} 
                                    className={`ml-4 px-4 py-2 ${isFavorite ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-500 hover:bg-gray-600'} text-white font-bold rounded transition duration-300`}
                                    >
                                    {isFavorite ? '❤️' : '🤍'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </li>
        </>
    )
}

export default Song