import axios from "axios";

const API_BASE = "http://localhost:8000/api/offices/";

export const getOffices = () => axios.get(API_BASE);

export const createOffice = (data) => {
  const formData = new FormData();
  formData.append("branch_name", data.branch_name);
  formData.append("address", data.address);
  formData.append("user_id", data.user_id);

  return axios.post(API_BASE, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const updateOffice = (id, data) => {
  const formData = new FormData();
  formData.append("branch_name", data.branch_name);
  formData.append("address", data.address);

  return axios.patch(`${API_BASE}${id}/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteOffice = (id) => axios.delete(`${API_BASE}${id}/`);
