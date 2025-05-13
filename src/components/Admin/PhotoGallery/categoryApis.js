import axios from "axios";

// ✅ Add a new category
export const addCategory = async (apiBase, data) => {
  const response = await axios.post(`${apiBase}/categories/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// ✅ Fetch all categories
export const getCategories = async (apiBase) => {
  const response = await axios.get(`${apiBase}/categories/`);
  return response.data;
};

// ✅ Update an existing category
export const updateCategory = async (apiBase, id, data) => {
  const response = await axios.patch(`${apiBase}/categories/${id}/`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// ✅ Delete a category
export const deleteCategory = async (apiBase, id) => {
  const response = await axios.delete(`${apiBase}/categories/${id}/`);
  return response.data;
};
