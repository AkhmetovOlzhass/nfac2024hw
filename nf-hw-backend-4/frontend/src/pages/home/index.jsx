import React from "react";
import { Artistsection } from "../../components/Artistsection";
import { Playlistsection } from "../../components/PlaylistSection";
import "./Home.css";
import { Footer } from "../../components/footer";

export const Home = () => {



  return (
    <div className="min-h-screen text-gray-300">
      <div className="bg-custom-section pt-28 md:pl-72 p-8">
        <Artistsection></Artistsection>
        <Playlistsection type={'Chill Vibes'}></Playlistsection>
        <Playlistsection type={'Top Hits'}></Playlistsection>
        <Playlistsection type={'Workout Mix'}></Playlistsection>
        <Playlistsection type={'Party Time'}></Playlistsection>
        <Playlistsection type={'Classical Essentials'}></Playlistsection>
        <Playlistsection type={'Indie Hits'}></Playlistsection>
        <Footer></Footer>
      </div>
    </div>
  );
};
