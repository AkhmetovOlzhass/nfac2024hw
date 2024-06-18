import React, { useEffect, useState } from "react";

import { useLocation } from 'react-router-dom'
import { PlaylistsCard } from "../../components/PlaylistCard";
import { useService } from "../../context/Service";

const PlaylistAll = () => {

    const location = useLocation()
    const { type } = location.state;
    
    const {getPlaylists} = useService();

    const [playlists, setPlaylists] = useState([]);
  
    useEffect(() => {
      const fetchPlaylists = async () => {
        try {
          const playlists = await getPlaylists();
          setPlaylists(playlists);
        } catch (error) {
          console.error("Error fetching playlists:", error);
        }
      };
  
      fetchPlaylists();
  
    }, []);

    return(
        <div className="min-h-screen text-gray-300">
            <div className="bg-custom-section md:pl-72 pt-32 p-8">
                <div className="bg-black min-h-screen p-8 text-white">
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-2xl font-bold text-white hover:underline">
                            {type}
                            </p>
                        </div>
                        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                            {playlists && playlists.map((playlist, index) => (
                            playlist.playlistType == type ? <PlaylistsCard
                            key={playlist._id}
                            id={playlist._id}
                            title={playlist.title}
                            description={playlist.description}
                            imageUrl={playlist.coverUrl}
                            /> : null
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PlaylistAll;