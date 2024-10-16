import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../BookCard/BookCard";
import Loader from "../Loader/Loader";

const RecentlyAdded = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/getRecentBooks");
        setData(response.data.data);
      } catch (err) {
        setError("Failed to fetch recently added books.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="mt-8 px-4">
      <h4 className="text-3xl text-yellow-100">Recently Added Books</h4>
      {loading ? (
        <div className="flex items-center justify-center my-8">
          <Loader />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center my-8">
          {error}
        </div>
      ) : (
        <div className="my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={index}>
                <BookCard data={item} />
              </div>
            ))
          ) : (
            <div className="text-center my-8 text-gray-500">
              No recently added books found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecentlyAdded;
