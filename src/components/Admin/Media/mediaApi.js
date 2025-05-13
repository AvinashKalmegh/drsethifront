

import axios from "axios";

// MEDIA CATEGORY
export const getMediaCategories = async (api) => {
  const res = await axios.get(`${api}/media-categories/`);
  return res.data;
};

export const getMediaCategoryById = async (api, id) => {
  const res = await axios.get(`${api}/media-categories/${id}/`);
  return res.data;
};

export const addMediaCategory = async (api, data) => {
  const res = await axios.post(`${api}/media-categories/`, data);
  return res.data;
};

export const updateMediaCategory = async (api, id, data) => {
  const res = await axios.patch(`${api}/media-categories/${id}/`, data);
  return res.data;
};

export const deleteMediaCategory = async (api, id) => {
  const res = await axios.delete(`${api}/media-categories/${id}/`);
  return res.data;
};

// MEDIA GALLERY
export const getAllMedia = async (api) => {
  const res = await axios.get(`${api}/media-gallery/`);
  return res.data;
};

export const getMediaById = async (api, id) => {
  const res = await axios.get(`${api}/media-gallery/${id}/`);
  return res.data;
};

export const addMedia = async (api, formData) => {
  const res = await axios.post(`${api}/media-gallery/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const updateMedia = async (api, id, formData) => {
  const res = await axios.patch(`${api}/media-gallery/${id}/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteMedia = async (api, id) => {
  const res = await axios.delete(`${api}/media-gallery/${id}/`);
  return res.data;
};

export const countMediaByCategory = (media = []) => {
  const countMap = {};
  media.forEach((item) => {
    const cat = item.category || "Uncategorized";
    countMap[cat] = (countMap[cat] || 0) + 1;
  });
  return countMap;
};
