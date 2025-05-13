import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getAllVideos } from "../Admin/VideoGallery/videoApi";
import MyContext from "../../ContextApi/MyContext";

const VideoListUi = () => {
  const { category } = useParams(); // category ID
  const [videos, setVideos] = useState([]);
  const { api } = useContext(MyContext);
  useEffect(() => {
    const loadVideos = async () => {
      try {
        const allVideos = await getAllVideos(api);
        const filtered = allVideos.filter((vid) => vid.category_v === category);
        console.log(filtered);
        setVideos(filtered);
      } catch (error) {
        console.error("Video fetch error:", error);
        toast.error("❌ Failed to load videos");
      }
    };

    loadVideos();
  }, [api, category]);

  const getYoutubeEmbedUrl = (url) => {
    if (!url || typeof url !== "string") return "";
    const videoId = url.includes("v=") ? url.split("v=")[1].split("&")[0] : "";
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-white max-w-6xl mx-auto mt-20">
      <h1 className="text-3xl font-bold text-center mb-8">{category} Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videos.map((video) => (
          <div key={video.id} className="space-y-2">
            {video.video_link ? (
              <div className="aspect-video w-full">
                <iframe
                  width="100%"
                  height="315"
                  src={getYoutubeEmbedUrl(video.video_link)}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg w-full"
                />
              </div>
            ) : (
              <div className="bg-gray-100 border p-4 text-center text-sm text-gray-600 rounded-md">
                No video link provided.
              </div>
            )}
            <h3 className="text-xl font-semibold">{video.title}</h3>
            <p className="text-gray-600 text-sm">{video.description}</p>
          </div>
        ))}
      </div>
      {videos.length <=0 && <p className="text-center mt-20 text-xl font-bold">No Videos Found</p>}
    </div>
  );
};

export default VideoListUi;
