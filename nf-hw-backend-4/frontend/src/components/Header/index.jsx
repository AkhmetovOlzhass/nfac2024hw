import React from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import { Link } from "react-router-dom";

import { useService } from "../../context/Service";
import { useNavigate } from "react-router-dom";
import logoutImg from '../../assets/logout.svg'

const Header = () => {

  const navigate = useNavigate();
  const { authToken, username, artistId, logout } = useService();

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleGoForward = () => {
    navigate(1);
  };

  return (
    <header className="fixed left-0 top-0 md:ml-64 w-full md:w-[calc(100%-256px)] bg-[#0A0A0A]/90 flex items-center justify-between p-4 z-40">
      <div>
        <div className="hidden md:flex items-center gap-2 text-2xl">
          <RiArrowLeftSLine onClick={handleGoBack} className="p-2 box-content hover:cursor-pointer bg-main-gray rounded-full" />
          <RiArrowRightSLine onClick={handleGoForward} className="p-2 box-content hover:cursor-pointer bg-main-gray rounded-full" />
        </div>
      </div>

        {!authToken ? (
            <div className="flex items-center gap-6">
              <Link to="/signup" className="hover:text-white transition-colors">
                Sign Up
              </Link>
              <Link
                to="/signin"
                className="py-2 md:py-3 px-4 rounded-full text-side-bub bg-white font-medium hover:scale-105 transition-transform text-black"
              >
                Sign In
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              Hello, <Link to={`/user/${artistId}`}>{username}</Link>
              <div className=" cursor-pointer" onClick={() => logout()}> <img className=" w-4 ml-4" src={logoutImg} alt="logout" /> </div>
            </div>
          )}
    </header>
  );
};

export default Header;
