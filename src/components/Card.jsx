import React, { useContext } from "react";
import MyContext from "../ContextApi/MyContext";
import { useNavigate } from "react-router-dom";

const Card = ({ books, category }) => {
  const { imgapi } = useContext(MyContext);
  const navigate = useNavigate();

  return (
    <section className="text-center py-10 px-4">
      <h2 className="text-2xl font-bold text-red-600 mb-6">{category}</h2>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        {books.map((book, index) => (
          <div
            key={index}
            className="group bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="overflow-hidden rounded-lg">
              <img
                src={`${imgapi}/${book.photo_upload}`}
                alt={`Book ${index + 1}`}
                className="mx-auto w-full  object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <h3 className="mt-4 font-semibold group-hover:text-red-600 transition-colors duration-300">
              {book.title}
            </h3>
            <p className="text-sm mt-2">{book.introduction}</p>
            <button
              onClick={() => navigate(`/media/${book.id}`)}
              className="mt-4 text-red-600 border border-red-600 px-4 py-1 rounded-full text-sm hover:bg-red-600 hover:text-white transition-colors duration-200"
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
