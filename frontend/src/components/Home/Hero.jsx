import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="h-[75vh] flex flex-col-reverse md:flex-row items-center justify-center px-4 md:px-8 lg:px-16 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900">
      {/* Text Section */}
      <div className="w-full md:w-3/6 flex flex-col items-center md:items-start justify-center text-center md:text-left space-y-4 md:space-y-6">
        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-yellow-100 leading-tight">
          Discover Your Next Great Read
        </h1>
        <p className="text-lg md:text-xl text-zinc-300">
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books.
        </p>
        <div className="mt-4">
          <Link to={'/allBooks'}>
            <button className="text-yellow-100 text-lg md:text-xl font-semibold border border-yellow-100 px-8 md:px-10 py-3 hover:bg-yellow-100 hover:text-zinc-900 transition-colors duration-300 rounded-full">
              Discover Books
            </button>
          </Link>
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full md:w-3/6 mb-8 md:mb-0 flex justify-center">
        <img
          src="https://th.bing.com/th?id=OIP.8gS_MaUBpQYmH9K0FVOh1AHaDx&w=350&h=178&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
          alt="hero"
          className="w-10/12 md:w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Hero;
