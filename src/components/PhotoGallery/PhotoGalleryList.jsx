import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MyContext from "../../ContextApi/MyContext";
import { toast } from "react-toastify";
import { fetchPhotos } from "../Admin/PhotoGallery/photoApi";
import photogallery from "../../assets/photogallery.jpg"

const PhotoGalleryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
    const {api, imgapi} = useContext(MyContext)

  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${api}/categories/`);
      setCategories(res.data);
    //   console.log(res.data)
    } catch (error) {
      console.warn("Could not load categories");
    }
  };

  fetchCategories();
}, []);

 useEffect(() => {
  const fetchCategoriesAndPhotos = async () => {
    try {
      const [photos] = await Promise.all([
        fetchPhotos(api)
      ]);

      const categoryPhotoCounts = photos.reduce((acc, photo) => {
        const cat = photo.category;
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
      }, {});

      setCategories((prevCategories) =>
        prevCategories.map((cat) => ({
          ...cat,
          photo_count: categoryPhotoCounts[cat.Title] || 0
        }))
      );

    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories or photos");
    }
  };

  fetchCategoriesAndPhotos();
}, [api]);


  return (
    <div className="min-h-screen px-4 py-16 bg-white">
      <h1 className="text-3xl font-bold text-center mb-10">PHOTO GALLERY</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/photos/${cat.Title}`)}
            className="relative cursor-pointer group overflow-hidden rounded-md shadow-md"
          >
            <img
              src={photogallery}
              alt={cat.title}
              className="w-full h-60 object-cover  group-hover:grayscale-0 transition duration-300"
            />
            <div className="absolute bottom-0 w-full bg-red-600 text-white text-center py-2">
              <h2 className="text-lg font-semibold">{cat.Title}</h2>
              <p className="text-sm">{cat.photo_count} Photos</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PhotoGalleryList;
