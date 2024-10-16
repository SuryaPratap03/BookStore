import React from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard/BookCard";

const AllBooks = () => {
  const [Data, setData] = useState();

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v1/getAllBooks"
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-900 text-yellow-100 px-4 md:px-8 lg:px-16 py-8">
      <h4 className="text-4xl font-bold mb-8 text-center">All Books</h4>

      {/* Loader */}
      {!Data && (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      )}

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Data &&
          Data.length > 0 &&
          Data.map((items, i) => {
            return (
              <div key={i} className="hover:scale-105 transform transition duration-300">
                <BookCard data={items} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default AllBooks;
