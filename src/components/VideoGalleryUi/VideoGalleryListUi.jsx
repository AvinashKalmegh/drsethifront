import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../../ContextApi/MyContext";
import thumbnail from "../../assets/videogallery.png"

const VideoGalleryListUi = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { api } = useContext(MyContext);

  useEffect(() => {
    const getVideoCategories = async () => {
      const res = await axios.get(`${api}/video-categories/`);
      console.log(res)
      setCategories(res.data);
    };

    getVideoCategories();
  }, []);

  return (
    <div className="min-h-screen px-4 py-16 bg-white">
      <h1 className="text-3xl font-bold text-center mb-10">VIDEO GALLERY</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/videos/${cat.Title}`)}
            className="relative cursor-pointer group overflow-hidden rounded-md shadow-md"
          >
            <img
              src={thumbnail || "/default-thumbnail.jpg"}
              alt={cat.title}
              className="w-full h-60 object-cover  group-hover:grayscale-0 transition duration-300"
            />
            <div className="absolute bottom-0 w-full bg-red-600 text-white text-center py-2">
              <h2 className="text-lg font-semibold">{cat.Title}</h2>
              <p className="text-sm">{cat.video_count} Videos</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoGalleryListUi;
