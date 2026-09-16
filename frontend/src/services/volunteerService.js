import api from "./api";

export const becomeVolunteer = async (formData) => {
  const response = await api.post("/volunteers", formData);
  return response.data;
};

export const updateVolunteerLocation = async (
  latitude,
  longitude,
  isAvailable = true
) => {
  const response = await api.put("/volunteers/location", {
    latitude,
    longitude,
    isAvailable,
  });

  return response.data;
};

export const getNearbyVolunteers = async (reportId) => {
  const response = await api.get(`/volunteers/nearby/${reportId}`);
  return response.data;
};

// Admin: Get all volunteer applications
export const getAllVolunteers = async () => {
  const response = await api.get("/volunteers/admin/all");
  return response.data;
};

// Admin: Update volunteer application status (Approved / Rejected)
export const updateVolunteerStatus = async (volunteerId, status) => {
  const response = await api.put(`/volunteers/admin/status/${volunteerId}`, {
    status,
  });
  return response.data;
};