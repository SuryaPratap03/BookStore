import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';

const Favourites = () => {
  const [data, setData] = useState([]);

  // Set up headers for the request
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  // Fetch favorite books on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:1000/api/v1/getFavouriteBooks', {
          headers,
        });
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching favourite books:', error);
      }
    };
    fetchFavorites();
  }, []);
  
  const onRemove=(bookid)=>{
    setData(data.filter((book)=>book._id!=bookid))
  }

  return (
    <div className="flex flex-col items-center bg-zinc-900 p-6 rounded-lg text-white max-h-[90vh] overflow-y-auto">
      <h1 className="text-2xl font-semibold mb-2">Favourites</h1>

      {/* Placeholder for favourite items */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {data && data.length > 0 ? (
          data.map((item) => (
            <BookCard data={item} key={item._id} favourites={true} onremove={onRemove}/>
          ))
        ) : (
          <p className="text-lg text-gray-500">You currently have no favourites.</p>
        )}
      </div>
    </div>
  );
};

export default Favourites;
