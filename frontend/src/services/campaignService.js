import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // FastAPI URL

export const getCampaigns = async (status = "") => {
  try {
    const response = await axios.get(`${API_URL}/campaigns`, {
      params: status ? { status } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    return [];
  }
};
