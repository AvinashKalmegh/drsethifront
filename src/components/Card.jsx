import React, { useContext } from "react";
import MyContext from "../ContextApi/MyContext";
import { useNavigate } from "react-router-dom";

const Card = ({ books, category }) => {
  const { imgapi } = useContext(MyContext);
  const navigate = useNavigate();

  return (
    <section className="text-left py-10 px-4">
      {category == "BOOKS" && (
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center my-8">
            <div className="relative w-full h-px bg-gray-300">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-400 rounded-full"></span>
              <span className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-gray-400 rounded-full"></span>
            </div>
            <div className="absolute left-1/2 -translate-x-1/2 bg-white px-4">
              <h2 className="text-2xl font-bold text-red-600">{category}</h2>
            </div>
          </div>
        </div>
      )}

      <div className="text-sm max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <div className="cursor-pointer group bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col text-sm">
            <div className="overflow-hidden rounded-lg">
              <img
                src={`${imgapi}/${book.photo_upload}`}
                alt={`Book ${index + 1}`}
                className="mx-auto w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="text-left mt-4 font-semibold text-red-600 group-hover:text-red-600 transition-colors duration-300">
              {book.title}
            </h3>
            <p className="text-left text-sm mt-2">{book.introduction}</p>

            {/* Spacer pushes the button to the bottom */}
            <div className="flex-grow" />

            <button
              onClick={() => navigate(`/media/${book.id}`)}
              className="mt-4 text-red-600 border border-red-600 px-1 py-1 rounded-full text-sm hover:bg-red-600 hover:text-white transition-colors duration-200 w-1/3 m-auto"
            >
              Read More →
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Card;
