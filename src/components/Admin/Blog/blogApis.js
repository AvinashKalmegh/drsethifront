import axios from 'axios';


export const fetchBlogs = async (API_BASE) => {
  const response = await axios.get(`${API_BASE}/blogs/`);
  return response.data;
};

export const fetchRecentBlogs = async (API_BASE) => {
  const response = await axios.get(`${API_BASE}/blogs/recent/`);
  return response.data;
};

export const getBlogById = async (API_BASE,id) => {
  const response = await axios.get(`${API_BASE}/blogs/${id}/`);
  return response.data;
};

export const createBlog = async (API_BASE,formData) => {
  const response = await axios.post(`${API_BASE}/blogs/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const updateBlog = async (API_BASE,id, formData) => {
  const response = await axios.patch(`${API_BASE}/blogs/${id}/`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data;
};

export const deleteBlog = async (API_BASE,id) => {
  const response = await axios.delete(`${API_BASE}/blogs/${id}/`);
  return response.data;
};
