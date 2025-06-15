import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

const getAuthHeaders = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// CORRECTED getTasks function signature and logic
export const getTasks = async (filters = {}, token) => { // Now expects filters first, then token
  try {
    // Construct query parameters from the filters object
    const queryParams = new URLSearchParams(filters).toString();
    const url = `${backendUrl}/api/tasks${queryParams ? `?${queryParams}` : ''}`; // Add query string if filters exist

    const res = await axios.get(url, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error; // Re-throw to allow component to catch
  }
};

export const getCategories = async (token) => {
  try {
    const res = await axios.get(`${backendUrl}/api/tasks/categories`, getAuthHeaders(token));
    return res.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
export const createTask = async (task, token) => {
  await axios.post(`${backendUrl}/api/tasks`, task, getAuthHeaders(token));
};

export const updateTask = async (id, updates, token) => {
  await axios.put(`${backendUrl}/api/tasks/${id}`, updates, getAuthHeaders(token));
};

export const deleteTask = async (id, token) => {
  await axios.delete(`${backendUrl}/api/tasks/${id}`, getAuthHeaders(token));
};