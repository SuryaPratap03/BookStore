import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourites ,onremove,Cart}) => {
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id,
  };

  const navigate = useNavigate();

  const removeFav = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        "http://localhost:1000/api/v1/removeBookFromFavourite",
        {},
        { headers }
      );
      
      // Use navigate to refresh or redirect after removal
      onremove(data._id) // Redirect to profile
    } catch (error) {
      console.error("Error removing from favourites:", error);
    }
  };


  const removeCart = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1//removeFromCart/${data._id}`,
        {},
        { headers }
      );
      
      // Use navigate to refresh or redirect after removal
      onremove(data._id) // Redirect to profile
    } catch (error) {
      console.error("Error removing from Cart:", error);
    }
  };

  return (
    <div className="bg-zinc-800 rounded-lg p-4 flex flex-col h-full min-h-[350px] max-h-[400px] transition-transform duration-300 hover:scale-105">
      {/* Link to book details */}
      <Link to={`/viewBookDetails/${data._id}`}>
        {/* Image Container */}
        <div className="bg-zinc-900 rounded-md flex items-center justify-center h-[25vh] overflow-hidden">
          <img
            src={data.url}
            alt={data.title}
            className="h-full w-auto max-h-[25vh] object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="mt-4 text-xl font-semibold truncate">{data.title}</h2>

        {/* Author */}
        <p className="mt-2 text-zinc-400 font-semibold truncate">by {data.author}</p>

        {/* Price */}
        <p className="mt-2 text-zinc-200 font-semibold text-xl">₹ {data.price}</p>
      </Link>

      {/* Remove from favourites button */}
      {favourites && (
        <button
          onClick={removeFav}
          className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
        >
          Remove From Favourites
        </button>
      )}

      {/* Remove from Cart button */}
      {Cart && (
        <button
          onClick={removeCart}
          className="mt-4 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors duration-300"
        >
          Remove From Cart
        </button>
      )}
    </div>
  );
};

export default BookCard;
