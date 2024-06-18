import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArtistsCard } from "../ArtistsCard";
import "./Artistsection.css";
import { useService } from "../../context/Service";

export const Artistsection = ({ title }) => {

  const [artists, setArtists] = useState([]);

  const {getUsers} = useService();

  useEffect(() => {
    const fetchUsers = async () => {
        try {
            const response = await getUsers();
            setArtists(response);
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    fetchUsers()
}, []);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-8">
        <Link to="/artists" className="text-2xl font-bold text-white hover:underline">
          Popular artists
        </Link>
        <Link
          to="/artists"
          className="text-sm font-bold tracking-[2px] hover:underline"
        >
          Show all
        </Link>
      </div>
      <div className="horizontal-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {artists && artists.map((artist, index) => (
          artist.popular && index < 6 ? <ArtistsCard
          key={index}
          id={artist._id}
          title={artist.username}
          description={artist.description}
          imageUrl={artist.avatarUrl}
        /> : null
        ))}
      </div>
    </div>
  );
};
