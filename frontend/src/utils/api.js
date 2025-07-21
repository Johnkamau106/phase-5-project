
const API_URL = 'http://localhost:5000/api';

export const loginUser = async (credentials) => {
  console.log('Mocking login for:', credentials.email);
  // Simulate a successful login without a backend
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({
        success: true,
        user: {
          email: credentials.email,
          name: 'Test User',
          roles: ['donor'],
        },
      });
    }, 500);
  });
};
