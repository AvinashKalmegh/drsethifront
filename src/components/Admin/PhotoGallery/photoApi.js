import axios from "axios";

// Get all photos (optionally filter by category if backend supports it)
export const fetchPhotos = async (api) => {
  const response = await axios.get(`${api}/gallery/`);
  return response.data;
};

// src/api/photoApi.js
export const fetchPhotosByCategory = async (api, category) => {
  const response = await axios.get(`${api}/gallery/?category=${encodeURIComponent(category)}`);
  return response.data;
};


// Get photo by ID (for edit view)
export const getPhotoById = async (api, id) => {
  const response = await axios.get(`${api}/gallery/${id}/`);
  return response.data;
};

// Add a new photo
export const createPhoto = async (api, formData) => {
  const response = await axios.post(`${api}/gallery/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Update an existing photo
export const updatePhoto = async (api, id, formData) => {
  const response = await axios.patch(`${api}/gallery/${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Delete a photo by ID
export const deletePhoto = async (api, id) => {
  const response = await axios.delete(`${api}/gallery/${id}/`);
  return response.data;
};
