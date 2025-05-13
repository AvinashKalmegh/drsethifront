// src/pages/PhotoList.jsx
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { fetchPhotosByCategory ,fetchPhotos, deletePhoto } from "./photoApi";
import MyContext from "../../../ContextApi/MyContext";
import { toast } from "react-toastify";

export default function PhotoList() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const { api, imgapi } = useContext(MyContext);

  const {category} = useParams();

  useEffect(() => {
    if (!category) return;
    fetchPhotosByCategory(api, category)
      .then(setPhotos)
      .catch(() => console.error("Failed to fetch photos"));
  }, [category]);

  const handleDelete = async (id) => {
    try {
      await deletePhoto(api, id);
      setPhotos((prev) => prev.filter((photo) => photo.id !== id));
      toast.success("🗑️ Photo deleted successfully");
    } catch (error) {
      toast.error("❌ Failed to delete photo");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-3xl font-extrabold tracking-tight text-zinc-800 drop-shadow-sm">
          📸 Photo Gallery - {category}
        </h2>
        <button
          onClick={() => navigate(`/admin/photo-gallery/add/${category}`)}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition"
        >
          <PlusCircle className="w-5 h-5" /> Add Photo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all border border-gray-200"
          >
            <img
              src={`${imgapi}/${photo.photo_upload}`}
              alt="Gallery Preview"
              className="w-full h-48 object-cover"
            />
            <div className="flex justify-between items-center px-4 py-3">
              <span className="text-sm font-medium text-emerald-600">
                🏷️ {photo.category}
              </span>
              <div className="space-x-3">
                <button
                  className="text-indigo-600 hover:text-indigo-800"
                  onClick={() => navigate(`/admin/photo-gallery/edit/${photo.id}`)}
                >
                  ✏️
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(photo.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
