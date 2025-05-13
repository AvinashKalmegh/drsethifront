// src/pages/video/videoApi.js
import axios from "axios";

// ===== VIDEO GALLERY APIs =====

// Get all videos
export const getAllVideos = async (api) => {
  const res = await axios.get(`${api}/videos/`);
  return res.data;
};

// Get single video by ID
export const getVideoById = async (api, id) => {
  const res = await axios.get(`${api}/videos/${id}/`);
  return res.data;
};

// Add a new video
export const addVideo = async (api, data) => {
  const res = await axios.post(`${api}/videos/`, data);
  return res.data;
};

// Update an existing video
export const updateVideo = async (api, id, data) => {
  const res = await axios.patch(`${api}/videos/${id}/`, data);
  return res.data;
};

// Delete a video
export const deleteVideo = async (api, id) => {
  const res = await axios.delete(`${api}/videos/${id}/`);
  return res.data;
};

// ===== VIDEO CATEGORY APIs =====

// Get all video categories
export const getVideoCategories = async (api) => {
  const res = await axios.get(`${api}/video-categories/`);
  return res.data;
};

// Get a single category
export const getVideoCategoryById = async (api, id) => {
  const res = await axios.get(`${api}/video-categories/${id}/`);
  return res.data;
};

// Add a new video category
export const addVideoCategory = async (api, data) => {
  const res = await axios.post(`${api}/video-categories/`, data);
  return res.data;
};

// Update a video category
export const updateVideoCategory = async (api, id, data) => {
  const res = await axios.patch(`${api}/video-categories/${id}/`, data);
  return res.data;
};

// Delete a video category
export const deleteVideoCategory = async (api, id) => {
  const res = await axios.delete(`${api}/video-categories/${id}/`);
  return res.data;
};

// ===== Helper: Count videos per category (frontend logic) =====
export const countVideosByCategory = (videos = []) => {
  const countMap = {};
  videos.forEach((video) => {
    const cat = video.category_v || "Uncategorized";
    countMap[cat] = (countMap[cat] || 0) + 1;
  });
  return countMap;
};
