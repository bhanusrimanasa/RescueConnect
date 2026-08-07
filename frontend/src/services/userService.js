import api from "./api";

export const getVolunteers = async () => {
  const response = await api.get("/users/volunteers");
  return response.data;
};