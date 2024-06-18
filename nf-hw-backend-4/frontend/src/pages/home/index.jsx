import React, { useState } from "react";
import { Artistsection } from "../../components/Artistsection";
import Header from "../../components/Header";
import { Playlistsection } from "../../components/PlaylistSection";
import Sidebar from "../../components/Sidebar";
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
        {/* <Playlistsection></Playlistsection>
        <Playlistsection></Playlistsection>
        <Playlistsection></Playlistsection> */}
        <Footer></Footer>
      </div>
    </div>
  );
};
