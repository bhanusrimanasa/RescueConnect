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

export const rejectApplication = async (id, rejectionReason) => {
  const response = await api.put(
    `/adoption-applications/${id}/reject`,
    {
      rejectionReason,
    }
  );

  return response.data;
};
export const getMyApplications = async () => {
  const response = await api.get("/adoption-applications/my");
  return response.data;
};
export const volunteerApproveApplication = async (id) => {
  const res = await api.put(
    `/adoption-applications/${id}/volunteer-approve`
  );

  return res.data;
};
export const getVolunteerApprovedApplications = async () => {
  const res = await api.get(
    "/adoption-applications/volunteer-approved"
  );

  return res.data;
};
export const volunteerRejectApplication = async (
  id,
  rejectionReason
) => {
  const res = await api.put(
    `/adoption-applications/${id}/volunteer-reject`,
    {
      rejectionReason,
    }
  );

  return res.data;
};