import React, { useEffect, useState } from "react";
import Sidebar from "../components/Profile/Sidebar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../components/Loader/Loader";

const Profile = () => {
  const [Profile, setProfile] = useState();
  const isLoggedIn = useSelector((e) => e.auth.isLoggedIn);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/getUserInfo",
        { headers }
      );
      setProfile(response.data);
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4 text-white">
      {!Profile && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}
      {Profile && (
        <>
          <div className="w-full md:w-1/4 lg:w-1/5">
            <Sidebar data={Profile} />
          </div>
          <div className="w-full md:w-3/4 lg:w-4/5 p-4">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;
