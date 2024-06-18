import { Route, Routes } from "react-router-dom";
import { Home } from "../pages/home";
import { Signup } from "../pages/signup";
import { Signin } from "../pages/singin";
import { AuthProvider } from "../context/AuthContext";
import {PlayerProvider} from  "../context/PlayerContext";
import PublicRoute from "./publicRoute";
import AddSong from "../pages/addSong";
import UserDetails from "../pages/user";
import EditSong from "../pages/edit-song";
import EditUser from "../pages/edit-user";
import SearchPage from "../pages/searchPage";
import CreatePlaylist from "../pages/createPlaylist";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Playlist from "../pages/playlist";
import PlaylistAll from "../pages/PlaylistAll"
import Favorites from "../pages/favorites"
import Artists from "../pages/artists"
import LibraryPage from "../pages/libraryPage";
import Playlists from "../pages/playlists";
import { ServiceProvider } from "../context/Service";

export const RouteList = () => {


  return (
    <AuthProvider>
      <ServiceProvider>
        <PlayerProvider>
          <Header />
          <Sidebar />
          <Routes>
            <Route path="" element={<Home/>} />
            <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
            <Route path="/signin" element={<PublicRoute><Signin /></PublicRoute>} />
            <Route path="/addSong" element={<AddSong/>} />
            <Route path="/user/:id" element={<UserDetails />} />
            <Route path="/editSong/:id" element={<EditSong />} />
            <Route path="/editUser/:id" element={<EditUser />} />
            <Route path="/createPlaylist" element={<CreatePlaylist />} />
            <Route path="/playlist/:id" element={<Playlist />} />
            <Route path="/playlist/all" element={<PlaylistAll />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/playlists" element={<Playlists />} />

            <Route path="/searchPage" element={<SearchPage />} />
          </Routes>
        </PlayerProvider>
      </ServiceProvider>
    </AuthProvider>
  );
};
