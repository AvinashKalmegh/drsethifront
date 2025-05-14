import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../../ContextApi/MyContext";
import thumbnail from "../../assets/videogallery.png";
import Loader from "../Loader/Loader";

const VideoGalleryListUi = () => {
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const { api } = useContext(MyContext);

  useEffect(() => {
    const getVideoCategories = async () => {
      const res = await axios.get(`${api}/video-categories/`);
      console.log(res);
      
      setCategories(res.data.filter((cat)=> cat.Status === "Active"));
    };

    getVideoCategories();
  }, []);

  const handleCategoryClick = (title) => {
    setLoading(true);
    setTimeout(() => {
      navigate(`/videos/${title}`);
    }, 300); // optional delay for smoother UX
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen px-4 py-16 bg-white">
      <h1 className="text-3xl font-bold text-center mb-10">VIDEO GALLERY</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.Title)}
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
