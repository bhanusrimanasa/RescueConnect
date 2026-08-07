import api from "./api";

export const createReport = async (reportData) => {
  const response = await api.post("/reports", reportData);
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