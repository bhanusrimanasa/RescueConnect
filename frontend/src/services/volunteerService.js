import api from "./api";

export const becomeVolunteer = async (formData) => {
  const response = await api.post("/volunteers", formData);
  return response.data;
};