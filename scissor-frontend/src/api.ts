import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const registerUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, { email, password });
  return response.data;
};

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const shortenUrl = async (originalUrl: string, customUrl: string | undefined, authToken: string) => {
  const response = await axios.post(
    `${API_URL}/api/shorten`,
    { originalUrl, customUrl },
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );
  return response.data;
};

export const getUrlAnalytics = async (code: string, authToken: string) => {
  const response = await axios.get(`${API_URL}/api/${code}/analytics`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};

export const getUserUrls = async (authToken: string) => {
  const response = await axios.get(`${API_URL}/api/urls`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return response.data;
};
