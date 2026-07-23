import api from "./api";
export const createApplication = async (animalId, data) => {
  const response = await api.post(
    `/adoption-applications/${animalId}`,
    data
  );

  return response.data;
};

export const getApplications = async () => {
  const response = await api.get("/adoption-applications");
  return response.data;
};

export const approveApplication = async (id) => {
  const response = await api.put(
    `/adoption-applications/${id}/approve`
  );

  return response.data;
};

export const rejectApplication = async (id) => {
  const response = await api.put(
    `/adoption-applications/${id}/reject`
  );

  return response.data;
};
export const getMyApplications = async () => {
  const response = await api.get("/adoption-applications/my");
  return response.data;
};