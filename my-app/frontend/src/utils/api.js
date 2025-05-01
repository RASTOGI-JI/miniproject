// API utility using fetch instead of axios

const BASE_URL = "http://localhost:5000"; // Your backend URL

// Helper function to handle API requests
const apiRequest = async (url, method = 'GET', data = null) => {
  // Prepare headers
  const headers = {
    'Content-Type': 'application/json'
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  // Prepare request options
  const options = {
    method,
    headers,
    mode: 'cors'
  };

  // Add body for non-GET requests
  if (data && method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  try {
    console.log(`Making ${method} request to ${BASE_URL}${url}`);

    // Make the request
    const response = await fetch(`${BASE_URL}${url}`, options);

    // For network errors
    if (!response) {
      throw new Error('Network error - Failed to connect to the server');
    }

    // Try to parse the JSON response
    let responseData;
    try {
      responseData = await response.json();
    } catch (parseError) {
      console.error('Error parsing JSON response:', parseError);
      throw new Error(`Failed to parse server response: ${parseError.message}`);
    }

    // Handle error responses
    if (!response.ok) {
      // Handle authentication errors
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }

      const errorMsg = responseData.msg || responseData.message || `API error (${response.status}): ${response.statusText}`;
      console.error('API Error Response:', response.status, errorMsg, responseData);
      throw new Error(errorMsg);
    }

    return { data: responseData };
  } catch (error) {
    console.error('API Request Failed:', error.message, error);
    // Add more context to the error
    if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
      throw new Error('Network error: Unable to connect to the server. Please check if the backend server is running.');
    }
    throw error;
  }
};

// Auth endpoints
export const register = (userData) => apiRequest('/api/auth/register', 'POST', userData);
export const login = (userData) => apiRequest('/api/auth/login', 'POST', userData);

// Protected endpoints
export const fetchProtectedData = () => apiRequest('/api/protected');

// Other endpoints
export const fetchSomething = async () => {
  try {
    const response = await apiRequest('/something');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
