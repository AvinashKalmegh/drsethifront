import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MyContext from "../../ContextApi/MyContext";

const PhotoListUi = () => {
  const { category } = useParams();
  const [photos, setPhotos] = useState([]);

  const { api, imgapi } = useContext(MyContext);

  useEffect(() => {
    const fetchPhotosByCategory = async (api, category) => {
      const response = await axios.get(
        `${api}/gallery/?category=${encodeURIComponent(category)}`
      );
      console.log(response.data)
      return response.data;
    };
    if (!category) return;
    fetchPhotosByCategory(api, category)
      .then(setPhotos)
      .catch(() => console.error("Failed to fetch photos"));
  }, [category]);

  return (
    <div className="min-h-screen px-4 py-10 bg-white">
      <h1 className="text-3xl font-bold text-center mb-8">Gallery</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {photos.length>0 && photos.map((photo) => (
          <img
            key={photo.id}
            src={`${imgapi}${photo.photo_upload}`}
            alt={photo.caption || "Photo"}
            className="w-full h-48 object-cover rounded-lg shadow-md hover:scale-105 transition"
          />
        ))}
      </div>
        {photos.length <=0 && <p className="text-center mt-20 text-xl">No photos found</p>}
    </div>
  );
};

export default PhotoListUi;
