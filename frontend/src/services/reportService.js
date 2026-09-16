import api from "./api";

export const createReport = async (reportData) => {
  const formData = new FormData();

  formData.append("animalType", reportData.animalType);
  formData.append("problem", reportData.problem);
  formData.append("priority", reportData.priority);
  formData.append("location", reportData.location);
  if (reportData.latitude !== null) {
  formData.append("latitude", reportData.latitude);
}

if (reportData.longitude !== null) {
  formData.append("longitude", reportData.longitude);
}
  formData.append("description", reportData.description);
  formData.append("contactUser", reportData.contactUser);

  reportData.images.forEach((image) => {
    formData.append("images", image);
  });

  const response = await api.post("/reports", formData);

  return response.data;
};

export const getReports=async()=>{
  const response=await api.get("/reports");
  return response.data;
}
export const getReportById=async(id)=>{
  const response=await api.get(`/reports/${id}`);
  return response.data;
}
export const getMyReports = async () => {
  const response = await api.get("/reports/my");
  return response.data;
};
export const assignVolunteer = async (
  reportId,
  volunteerId

) => {
  const response = await api.put(
    `/reports/${reportId}/assign`,
    {
      volunteerId,
    }
  );

  return response.data;
};
export const getAssignedReports = async () => {
  const response = await api.get("/reports/assigned");
  return response.data;
};

export const acceptReport = async (id) => {
  const response = await api.put(`/reports/${id}/accept`);
  return response.data;
};

export const markRescued = async (id) => {
  const response = await api.put(`/reports/${id}/rescue`);
  return response.data;
};
export const updateProgress = async (id, data) => {
  const response = await api.put(
    `/reports/${id}/progress`,
    data
  );

  return response.data;
};
export const rejectReport = async (id) => {
  const response = await api.put(`/reports/${id}/reject`);
  return response.data;
};
export const getCompletedReports = async () => {
  const response = await api.get("/reports/completed");
  return response.data;
};