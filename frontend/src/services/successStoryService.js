import axios from "axios";

const API_URL = "http://localhost:5000/api/success-stories";

export const createSuccessStory = async (formData) => {
  const response = await axios.post(API_URL, formData, {
    withCredentials: true,
  });

  return response.data;
};

export const getPendingSuccessStories = async () => {
  const response = await axios.get(`${API_URL}/pending`, {
    withCredentials: true,
  });

  return response.data;
};

export const approveSuccessStory = async (id) => {
  const response = await axios.put(
    `${API_URL}/${id}/approve`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const rejectSuccessStory = async (id) => {
  const response = await axios.put(
    `${API_URL}/${id}/reject`,
    {},
    {
      withCredentials: true,
    }
  );

  return response.data;
};

export const getApprovedSuccessStories = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};