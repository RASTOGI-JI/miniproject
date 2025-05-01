const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

// Test health endpoint
const testHealth = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    console.log('Health check:', response.data);
    return true;
  } catch (error) {
    console.error('Health check failed:', error.message);
    return false;
  }
};

// Test registration
const testRegister = async () => {
  try {
    const userData = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123'
    };
    
    console.log('Attempting to register user:', userData.email);
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    console.log('Registration successful:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error.response?.data || error.message);
    return null;
  }
};

// Test login
const testLogin = async (email, password) => {
  try {
    const loginData = { email, password };
    console.log('Attempting to login with:', email);
    const response = await axios.post(`${API_URL}/auth/login`, loginData);
    console.log('Login successful:', response.data);
    
    return response.data;
  } catch (error) {
    console.error('Login failed:', error.response?.data || error.message);
    return null;
  }
};

// Test protected route
const testProtected = async (token) => {
  try {
    console.log('Testing protected route with token');
    const response = await axios.get(`${API_URL}/protected`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('Protected route access successful:', response.data);
    
    return true;
  } catch (error) {
    console.error('Protected route access failed:', error.response?.data || error.message);
    return false;
  }
};

// Run all tests
const runTests = async () => {
  console.log('=== Starting API Tests ===');
  
  // Test health endpoint
  const healthOk = await testHealth();
  if (!healthOk) {
    console.error('Health check failed. Make sure the server is running.');
    return;
  }
  
  // Test registration
  const registrationData = await testRegister();
  if (!registrationData) {
    console.error('Registration test failed. Cannot continue.');
    return;
  }
  
  // Test login with registered user
  const loginData = await testLogin(registrationData.user.email, 'password123');
  if (!loginData) {
    console.error('Login test failed. Cannot continue.');
    return;
  }
  
  // Test protected route
  await testProtected(loginData.token);
  
  console.log('=== API Tests Completed ===');
};

// Run the tests
runTests();
