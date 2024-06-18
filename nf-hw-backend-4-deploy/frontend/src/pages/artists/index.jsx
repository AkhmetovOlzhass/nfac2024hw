import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArtistsCard } from "../../components/ArtistsCard";
import { useAuth } from "../../context/AuthContext";

const Artists = () => {
    const [artists, setArtists] = useState([]);

    const {getUsers} = useAuth();
  
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
        <div className="min-h-screen text-gray-300">
        <div className="bg-custom-section pt-28 md:pl-72 p-8">
        <div className="mb-8">
            <div className="flex items-center justify-between mb-8">
                <Link to="/artists" className="text-2xl font-bold text-white hover:underline">
                    Popular artists
                </Link>
                </div>
                <div className="horizontal-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                {artists.map((artist, index) => (
                    artist.popular ? <ArtistsCard
                    key={index}
                    id={artist._id}
                    title={artist.username}
                    description={artist.description}
                    imageUrl={artist.avatarUrl}
                /> : null
                ))}
                </div>
            </div>
        </div>
      </div>

    );
}

export default Artists;