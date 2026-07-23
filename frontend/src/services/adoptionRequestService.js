import api from "./api";

export const getPendingRequests = async () => {
  const response = await api.get("/adoption-requests");
  return response.data;
};

export const approveRequest = async (id) => {
  const response = await api.put(`/adoption-requests/${id}/approve`);
  return response.data;
};

export const rejectRequest = async (id) => {
  const response = await api.put(`/adoption-requests/${id}/reject`);
  return response.data;
};

export const createAdoptionRequest = async (data) => {
  const response = await api.post("/adoption-requests", data);
  return response.data;
};