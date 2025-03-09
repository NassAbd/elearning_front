import axios from "axios";

const API_URL = process.env.REACT_APP_COURSES_API_URL || "https://elearningback-production.up.railway.app/api/courses";
console.log("API_URL : ", API_URL);

// Get all courses
export const getCourses = async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data; // Assure-toi que c'est bien un tableau !
    } catch (error) {
      console.error("Erreur lors de la récupération des cours :", error);
      return [];
    }
  };

// Get a single course by ID
export const getCourseById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create a new course
export const createCourse = async (course) => {
    const response = await axios.post(`${API_URL}`, course);
    return response.data;
};

// Update a course by ID
export const updateCourse = async (id, updatedCourse) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedCourse);
    return response.data;
};

// Delete a course by ID
export const deleteCourse = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
};