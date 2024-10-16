import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GrLanguage } from "react-icons/gr";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [loading, setLoading] = useState(true); // Loading state

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
  };
  
  const handleFavourite = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/addBookToFavourite",
      {},
      {
        headers,
      }
    );
    alert(response.data.message);
  };

  const handleCart = async () => {
    const response = await axios.put(
      "http://localhost:1000/api/v1/addToCart",
      {},
      {
        headers,
      }
    );
    alert(response.data.message);
  };
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/v1/getBookById/${id}`
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book details", error);
      } finally {
        setLoading(false); // Stop loading when data is fetched
      }
    };
    fetchBookDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center bg-zinc-900 h-screen text-white text-xl">
        Loading...
      </div>
    ); // Loading state
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center bg-zinc-900 h-screen text-white text-xl">
        No data available
      </div>
    ); // No data state
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white px-4 py-6 md:px-8">
      <div className="flex flex-col md:flex-row items-center gap-8 w-full max-w-6xl">
        {/* Book image container */}
        <div className="bg-zinc-800 rounded-md flex items-center justify-center h-[50vh] md:h-[60vh] w-full md:w-[40%] relative">
          <img
            src={data.url}
            alt={data.title}
            className="h-full max-h-[50vh] md:max-h-[60vh] object-contain"
          />
          {isLoggedIn === true && role === "user" && (
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <button
                className="bg-white rounded-full text-2xl p-2 text-red-700 flex items-center justify-center hover:bg-gray-300 transition duration-200 ease-in-out"
                onClick={handleFavourite}
              >
                <FaHeart />
              </button>
              <button className="bg-white rounded-full text-2xl p-2 text-blue-500 flex items-center justify-center hover:bg-gray-300 transition duration-200 ease-in-out"
               onClick={handleCart}>
                <FaShoppingCart />
              </button>
            </div>
          )}
          {isLoggedIn === true && role === "admin" && (
            <div className="absolute top-4 right-4 flex flex-col space-y-2">
              <button className="bg-white rounded-full text-2xl p-2 text-red-700 flex items-center justify-center hover:bg-gray-300 transition duration-200 ease-in-out">
                <FaEdit />
              </button>
              <button className="bg-white rounded-full text-2xl p-2 text-blue-500 flex items-center justify-center hover:bg-gray-300 transition duration-200 ease-in-out">
                <MdDelete />
              </button>
            </div>
          )}
        </div>

        {/* Book details */}
        <div className="p-4 w-full md:w-[60%] flex flex-col">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{data.title}</h1>
          <h2 className="text-2xl md:text-3xl mb-2">By {data.author}</h2>
          <p className="text-base md:text-lg mb-4">{data.desc}</p>
          <p className="text-base md:text-lg flex items-center gap-2 mb-4">
            <GrLanguage className="text-lg md:text-xl text-gray-400" />{" "}
            {/* Language Icon */}
            <span className="font-bold">Language:</span> {data.language}
          </p>
          <p className="text-base md:text-lg mb-2">
            <span className="font-bold">Price:</span> ${data.price}
          </p>
          <p className="text-base md:text-lg">
            <span className="font-bold">Published:</span> {data.publishedDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewBookDetails;
