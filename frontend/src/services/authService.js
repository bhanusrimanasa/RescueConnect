import api from "./api";

export const registerUser = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};
export const getMe = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};
export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};
export const updateProfile = async (formData) => {
  const response = await api.put("/auth/profile", formData);

  return response.data.user;
};
export const becomeVolunteer = async () => {
  const response = await api.put("/auth/volunteer");
  return response.data;
};
export const changePassword = async (passwordData) => {
  const response = await api.put(
    "/auth/change-password",
    passwordData
  );

  return response.data;
};