// API configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:9000/api";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/parent/login`,
  CHILD_LOGIN: `${API_BASE_URL}/child/login`,
  SIGNUP: `${API_BASE_URL}/parent/signup`,
  CHILD_SIGNUP: `${API_BASE_URL}/child/signup`,
  CHILD_UPDATE: `${API_BASE_URL}/child`,
  LESSONS: `${API_BASE_URL}/lessons`,
  TOPIC_COMPLETION: `${API_BASE_URL}/user-lessons/topic-completion`,
  // Add other endpoints as needed
};

export default API_BASE_URL;
