// src/pages/VideoList.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import { getAllVideos, deleteVideo } from "./videoApi";
import MyContext from "../../../ContextApi/MyContext";

export default function VideoList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { api } = useContext(MyContext);
  const [videos, setVideos] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        const allVideos = await getAllVideos(api);
        const filtered = allVideos.filter((vid) => vid.category_v === id);
        setVideos(filtered);
      } catch (error) {
        console.error("Video fetch error:", error);
        toast.error("❌ Failed to load videos");
      }
    };

    loadVideos();
  }, [api, id]);

  const handleDelete = async (vidId) => {
    try {
      await deleteVideo(api, vidId);
      setVideos((prev) => prev.filter((v) => v.id !== vidId));
      toast.success("✅ Video deleted");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("❌ Failed to delete video");
    }
  };

  const getEmbedUrl = (link) => {
    if (link.includes("youtube.com/watch?v=")) {
      const videoId = link.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    // Add logic for Vimeo or other platforms if needed
    return link;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-xl font-extrabold tracking-tight text-zinc-800 drop-shadow-sm">
          Video Gallery - {id}
        </h2>
        <button
          onClick={() => navigate(`/admin/video-gallery/${id}/add`)}
          className="cursor-pointer inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-indigo-700 text-white px-5 py-2.5 rounded-xl font-semibold shadow-md transition"
        >
          <PlusCircle className="w-5 h-5" /> Add Video
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((video, index) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition-all border border-gray-200"
          >
            <iframe
              src={getEmbedUrl(video.video_link)}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-48"
            ></iframe>

            <h1 className="pl-5 fonr-semibold">{video.title}</h1>
            <div className="flex justify-between items-center px-4 py-3">
              <span className="text-sm font-medium text-emerald-600">
                ✔ {video.status || "Active"}
              </span>
              <div className="space-x-3">
                <button
                  className="cursor-pointer text-indigo-600 hover:text-indigo-800"
                  onClick={() =>
                    navigate(`/admin/video-gallery/edit/${video.id}`)
                  }
                >
                  ✏️
                </button>
                <button
                  className="cursor-pointer text-red-500 hover:text-red-700"
                  onClick={() => handleDelete(video.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {videos.length > 0 && (
        <div className="text-right mt-4">
          <button
            onClick={() => setVideos([])}
            className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-lg font-semibold shadow"
          >
            🗑️ Delete All Videos
          </button>
        </div>
      )}
    </motion.div>
  );
}
