// export const loginUser = async ({ email, password }) => {
//   const mockUsers = {
//     "admin@example.com": {
//       username: "admin_john",
//       name: "John Admin",
//       email: "admin@example.com",
//       roles: ["admin"],
//       phone: "+1234567890",
//       address: "123 Admin Street, City",
//       bio: "System administrator at Hope Haven",
//       avatar: "https://i.pravatar.cc/150?img=1",
//       token: "mock-admin-token-123"
//     },
//     "care@example.com": {
//       username: "caregiver_jane",
//       name: "Jane Caregiver",
//       email: "care@example.com",
//       roles: ["caregiver"],
//       phone: "+1987654321",
//       address: "456 Care Avenue, Town",
//       bio: "Dedicated child caregiver with 5 years experience",
//       avatar: "https://i.pravatar.cc/150?img=2",
//       token: "mock-caregiver-token-456"
//     },
//     "donor@example.com": {
//       username: "donor_anne",
//       name: "Anne Donor",
//       email: "donor@example.com",
//       roles: ["donor"],
//       phone: "+1122334455",
//       address: "789 Generosity Lane, Village",
//       bio: "Passionate about helping children in need",
//       avatar: "https://i.pravatar.cc/150?img=3",
//       token: "mock-donor-token-789"
//     },
//     "multi@example.com": {
//       username: "jane_super",
//       name: "Jane SuperUser",
//       email: "multi@example.com",
//       roles: ["admin", "caregiver"],
//       phone: "+1123581321",
//       address: "101 Super Lane, City",
//       bio: "Handles admin tasks and cares for kids",
//       avatar: "https://i.pravatar.cc/150?img=4",
//       token: "mock-superuser-token"
//     }
//   };

//   // Match email + password combo
//   const validCredentials = {
//     "admin@example.com": "admin",
//     "care@example.com": "care",
//     "donor@example.com": "donor",
//     "multi@example.com": "multi"
//   };

//   if (mockUsers[email] && validCredentials[email] === password) {
//     return {
//       success: true,
//       user: mockUsers[email]
//     };
//   }

//   return {
//     success: false,
//     message: "Invalid credentials"
//   };
// };
// export const registerUser = async ({ email, password }) => {
//   // Mock registration - in a real app, this would create a new user
//   return {
//     success: true,
//     user: {
//       username: email.split('@')[0], // Generate username from email
//       name: "New User",
//       email,
//       roles: ["donor"], // Default role for new users
//       phone: "",
//       address: "",
//       bio: "",
//       avatar: "https://i.pravatar.cc/150?img=0",
//       token: "mock-new-user-token"
//     }
//   };
// };
export const BASE_URL = "http://localhost:5555"; // Change if deployed

export const loginUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, user: data.user, token: data.token };
    } else {
      return { success: false, message: data.message || "Login failed" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const registerUser = async ({ email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, user: data.user, token: data.token };
    } else {
      return { success: false, message: data.message || "Registration failed" };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};
