import apiClient from "./apiClient";

// Auth APIs

export const loginUser = async (credentials) => {
  const response = await apiClient.post("/auth/login", credentials);
  return response.data;
};

export const registerUser = async (adminData) => {
  const response = await apiClient.post("/auth/register", adminData);
  return response.data;
};




// Lead APIs

export const createLead = async (leadData) => {
  const response = await apiClient.post("/leads", leadData);
  return response.data;
};

export const getAllLeads = async () => {
  const response = await apiClient.get("/leads");
  return response.data;
};

export const getLeadById = async (id) => {
  const response = await apiClient.get(`/leads/${id}`);
  return response.data;
};

export const searchLeads = async (query) => {
  const response = await apiClient.get(`/leads/search?q=${query}`);
  return response.data.leads;
};

export const updateLeadStatus = async (id, status) => {
  const response = await apiClient.patch(`/leads/${id}/status`, {
    status,
  });
  return response.data;
};

export const deleteLead = async (id) => {
  const response = await apiClient.delete(`/leads/${id}`);
  return response.data;
};