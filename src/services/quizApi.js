import axios from "axios";

const API_URL = "http://localhost:5000/api/quizzes";

// Get all quizzes
export const getQuizzes = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// Get a single quiz by ID
export const getQuizById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

// Create a new quiz
export const createQuiz = async (quiz) => {
  const response = await axios.post(`${API_URL}`, quiz);
  return response.data;
};

// Update a quiz by ID
export const updateQuiz = async (id, updatedQuiz) => {
  const response = await axios.put(`${API_URL}/${id}`, updatedQuiz);
  return response.data;
};

// Delete a quiz by ID
export const deleteQuiz = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};