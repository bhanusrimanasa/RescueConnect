import api from "./api";

export const getAllAdoptions = async (filters = {}) => {
  const response = await api.get("/adoptions", {
    params: filters,
  });

  return response.data;
};

export const getAdoptionById = async (id) => {
  const response = await api.get(`/adoptions/${id}`);
  return response.data;
};

export const createAdoption = async (data) => {
  const response = await api.post("/adoptions", data);
  return response.data;
};

export const updateAdoption = async (id, data) => {
  const response = await api.put(`/adoptions/${id}`, data);
  return response.data;
};

export const deleteAdoption = async (id) => {
  const response = await api.delete(`/adoptions/${id}`);
  return response.data;
};
export const getPendingAdoptions = async () => {
  const res = await api.get("/adoptions/pending");
  return res.data;
};

export const approveAdoptionListing = async (id, approvalStatus) => {
  const res = await api.put(
    `/adoptions/${id}/approval`,
    { approvalStatus }
  );

  return res.data;
};