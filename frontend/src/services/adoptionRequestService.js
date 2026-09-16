import api from "./api";

export const getPendingRequests = async () => {
  const response = await api.get("/adoption-requests/pending");
  return response.data;
};
export const getVolunteerApprovedRequests = async () => {
  const res = await api.get(
    "/adoption-requests/volunteer-approved"
  );

  return res.data;
};
export const approveRequest = async (id) => {
  const response = await api.put(`/adoption-requests/${id}/approve`);
  return response.data;
};

export const rejectRequest = async (
  id,
  rejectionReason
) => {
  const response = await api.put(
    `/adoption-requests/${id}/reject`,
    {
      rejectionReason,
    }
  );

  return response.data;
};

export const createAdoptionRequest = async (formData) => {
  const response = await api.post(
    "/adoption-requests",
    formData
  );

  return response.data;
};
export const volunteerApproveRequest = async (id) => {
  const res = await api.put(
    `/adoption-requests/${id}/volunteer-approve`
  );

  return res.data;
};

export const volunteerRejectRequest = async (
  id,
  rejectionReason
) => {
  const response = await api.put(
    `/adoption-requests/${id}/volunteer-reject`,
    {
      rejectionReason,
    }
  );

  return response.data;
};
export const adminApproveRequest = async (id) => {
  const res = await api.put(`/adoption-requests/${id}/approve`);
  return res.data;
};

export const adminRejectRequest = async (id) => {
  const res = await api.put(`/adoption-requests/${id}/reject`);
  return res.data;
};