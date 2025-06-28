import { Campaign } from "@/types";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001",
});

export const login = async (email: string, password: string) => {
  const response = await api.get(`/users?email=${email}&password=${password}`);
  if (response.data.length > 0) {
    return { token: "mock-jwt-token" }; // Mock JWT
  }
  throw new Error("Invalid credentials");
};

export const getCampaigns = async (): Promise<Campaign[]> => {
  const response = await api.get("/campaigns");
  return response.data;
};

export const getCampaign = async (id: string) => {
  const response = await api.get(`/campaigns/${id}`);
  return response.data;
};

export const createCampaign = async (campaign: Omit<Campaign, 'id'>) => {
  const response = await api.post('/campaigns', {
    ...campaign,
    id: Math.random().toString(36).substring(2), // Generate random ID
  });
  return response.data;
};