import { useState, useEffect } from "react";
import Song from "../../components/song";
import Modal from "../../components/modal";
import { useService } from "../../context/Service";

const LibraryPage = () => {

    const {getAllSongs, artistId, getPlaylists, getUserById, toggleFavorite, onPlaylistSelect} = useService();

    const [modalOpen, setModalOpen] = useState(false);
    const [songs, setSongs] = useState([]);
    const [currentSongId, setCurrentSongId] = useState(null);
    const [user, setUser] = useState(null);
    const [allPlaylists, setAllPlaylists] = useState([]);

    useEffect(() => {
        const fetchSongs = async () => {
            const songsData = await getAllSongs();
            setSongs(songsData);
          };
    
        fetchSongs();
    
    }, [getAllSongs]);

    useEffect(() => {
        const fetchPlaylistSongs = async () => {
            try {
                const playlists = await getPlaylists();
                setAllPlaylists(playlists);
            } catch (error) {
                console.error("Error fetching playlist songs:", error);
            }
        };

        fetchPlaylistSongs();
    }, [getPlaylists]);

    useEffect(() => {
        const fetchUser = async () => {
          const userData = await getUserById(artistId);
          setUser(userData);
        };
    
        fetchUser();
    
      }, [getUserById]);

    const handleAddToPlaylistClick = (songId) => {
        setModalOpen(true);
        setCurrentSongId(songId);
    };

    const handleToggleFavorite = async (songsId) => {
        const response = await toggleFavorite(songsId)
        if(response){
          setUser(prev => ({ ...prev, favorites: response.data.favorites }));
        }
      }

      const handleOnPlaylistSelect = async (playlistId, songId) => {
        const response = await onPlaylistSelect(playlistId, songId);
        if (response.status === 200) {
          console.log('Song added to playlist successfully');
          setModalOpen(false);
        }
      }

    return(
    <div className="min-h-screen text-gray-300">
        <div className="bg-custom-section md:pl-72 pt-32 p-8">
            <div className="bg-black min-h-screen p-8 text-white">
                <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mt-10 mb-4">Favorites</h2>
                {songs && songs.length > 0 ? (
                <ul>
                    {songs.map((song) => (
                        <Song key={song._id} song={song} isOwner={null} handleDeleteClick={null} handleEditClick={null} handleAddToPlaylistClick={handleAddToPlaylistClick} toggleFavorite={handleToggleFavorite} favorites={user ? user.favorites : null} />
                    ))}
                    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} onPlaylistSelect={handleOnPlaylistSelect} songId={currentSongId}>
                        {allPlaylists} 
                    </Modal>
                </ul>
                ) : (
                <p className="text-center p-8">No songs available</p>
                )}
                </div>
            </div>
        </div>
    </div>
    )
}

export default LibraryPage