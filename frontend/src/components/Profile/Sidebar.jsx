import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHeart, AiFillShopping, AiFillSetting, AiOutlineLogout } from 'react-icons/ai';

const Sidebar = ({ data }) => {
  return (
    <div className='bg-zinc-800 p-6 rounded-lg flex flex-col items-center justify-between h-auto lg:h-[85vh] w-[85vw] sm:w-[50vw] md:w-[35vw] lg:w-[20vw] max-w-xs'>
      {/* User Profile Section */}
      <div className='flex items-center flex-col justify-center'>
        <img src={data.avatar} className='h-[12vh] w-[12vh] lg:h-[14vh] lg:w-[14vh] rounded-full object-cover' alt='User avatar'/>
        <p className='mt-3 text-lg lg:text-xl text-zinc-100 font-semibold'>
          {data.username}
        </p>
        <p className='mt-1 text-sm lg:text-base text-zinc-400 text-center'>{data.email}</p>
        <p className='w-full mt-4 h-[1px] bg-zinc-600 hidden lg:block'></p>
      </div>

      {/* Navigation Links Section */}
      <div className='w-full flex flex-col items-center lg:items-start justify-start mt-4 space-y-2'>
        <Link 
          to="/profile" 
          className='w-full flex items-center justify-center lg:justify-start text-zinc-300 hover:text-white text-base lg:text-lg hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out'>
          <AiFillHeart className='mr-2' /> Favourites
        </Link>
        <Link 
          to="/profile/orderHistory" 
          className='w-full flex items-center justify-center lg:justify-start text-zinc-300 hover:text-white text-base lg:text-lg hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out'>
          <AiFillShopping className='mr-2' /> Order History
        </Link>
        <Link 
          to="/profile/settings" 
          className='w-full flex items-center justify-center lg:justify-start text-zinc-300 hover:text-white text-base lg:text-lg hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors duration-300 ease-in-out'>
          <AiFillSetting className='mr-2' /> Settings
        </Link>
        <button 
          className='w-full flex items-center justify-center lg:justify-start mt-4 bg-blue-600 text-white px-4 py-2 rounded-md text-base lg:text-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out'>
          <AiOutlineLogout className='mr-2' /> Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
