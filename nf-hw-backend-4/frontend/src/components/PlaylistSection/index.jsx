import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlaylistsCard } from "../PlaylistCard";
import { useService } from "../../context/Service";

export const Playlistsection = ({ type }) => {

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

  let hasMatchingPlaylists = null;
  if(playlists){
    hasMatchingPlaylists = playlists.some(playlist => playlist.playlistType === type);
  }



  if (!hasMatchingPlaylists) {
    return null;
  }

  const countByType = {};
  
  return(
    <div className="mb-8">
      <div className="flex items-center justify-between mb-8">
        <Link to="/playlist/all" state={{ type: type }} className="text-2xl font-bold text-white hover:underline">
          {type}
        </Link>
        <Link
          to="/playlist/all" state={{ type: type }}
          className="text-sm font-bold tracking-[2px] hover:underline"
        >
          Show all
        </Link>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {playlists && playlists.map((playlist) => {
          if (!countByType[playlist.playlistType]) {
            countByType[playlist.playlistType] = 0;
          }
          if (playlist.playlistType === type && countByType[playlist.playlistType] < 6) {
            countByType[playlist.playlistType]++;
            return (
              <PlaylistsCard
                key={playlist._id}
                id={playlist._id}
                title={playlist.title}
                description={playlist.description}
                imageUrl={playlist.coverUrl}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  )

};
