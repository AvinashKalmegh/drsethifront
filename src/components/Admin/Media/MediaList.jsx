// src/pages/MediaList.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import { getAllMedia, deleteMedia, getMediaById, updateMedia } from "./mediaApi";
import MyContext from "../../../ContextApi/MyContext";

export default function MediaList() {
  const { id,mediaCategory } = useParams();
  const navigate = useNavigate();
  const { api, imgapi } = useContext(MyContext);
  const [media, setMedia] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const loadMedia = async () => {
      try {
        const allMedia = await getAllMedia(api);
        const filtered = allMedia.filter((item) => item.category === mediaCategory);
        setMedia(filtered);
        console.log("mediaaaaa",filtered)
      } catch (error) {
        console.error("Media fetch error:", error);
        toast.error("❌ Failed to load media");
      }
    };
    loadMedia();
  }, [api, id]);

  const handleDelete = async (itemId) => {
    try {
      await deleteMedia(api, itemId);
      setMedia((prev) => prev.filter((m) => m.id !== itemId));
      toast.success("✅ Media deleted");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("❌ Failed to delete media");
    }
  };

return (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="p-6 space-y-6"
  >
    <div className="flex justify-between items-center">
      <h2 className="text-3xl font-bold text-indigo-800">
        📸 Media Gallery - {mediaCategory}
      </h2>
      <button
        onClick={() => navigate(`/admin/media-gallery/add/${mediaCategory}`)}
        className="cursor-pointer flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 text-white px-4 py-2 rounded-lg shadow font-semibold"
      >
        <PlusCircle className="w-5 h-5" /> Add Media
      </button>
    </div>

    <div className="overflow-x-auto shadow rounded-lg">
      <table className="min-w-full bg-white text-sm border border-gray-200">
        <thead className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <tr>
            <th className="px-4 py-3 text-left">#</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Created On</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {media.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-6 text-gray-500">
                No media found in this category.
              </td>
            </tr>
          ) : (
            media.map((item, index) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{index + 1}</td>
                <td className="px-4 py-3 font-semibold text-gray-800">{item.title}</td>
                <td className="px-4 py-3">
                  <img
                    src={`${imgapi}/${item.photo_upload}`}
                    alt="media"
                    className="h-12 w-20 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-3 text-sm text-gray-700">
                  {new Date(item.created_at).toLocaleDateString()}{" "}
                  <span className="text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleTimeString()}
                  </span>
                </td>
                <td className="px-4 py-3 space-x-3 text-lg">
                  <button
                    onClick={() => navigate(`/admin/media-gallery/edit/${item.id}`)}
                    className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="cursor-pointer text-red-600 hover:text-red-800"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  </motion.div>
);

}
