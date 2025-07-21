// src/utils/api.js (or auth.js)
export const loginUser = async ({ email, password }) => {
  // Mock user database with complete profile information
  const mockUsers = {
    "admin@example.com": { 
      username: "admin_john",
      name: "John Admin",
      email: "admin@example.com",
      roles: ["admin"],
      phone: "+1234567890",
      address: "123 Admin Street, City",
      bio: "System administrator at Hope Haven",
      avatar: "https://i.pravatar.cc/150?img=1",
      token: "mock-admin-token-123"
    },
    "care@example.com": {
      username: "caregiver_jane",
      name: "Jane Caregiver",
      email: "care@example.com",
      roles: ["caregiver"],
      phone: "+1987654321",
      address: "456 Care Avenue, Town",
      bio: "Dedicated child caregiver with 5 years experience",
      avatar: "https://i.pravatar.cc/150?img=2",
      token: "mock-caregiver-token-456"
    },
    "donor@example.com": {
      username: "donor_anne",
      name: "Anne Donor",
      email: "donor@example.com",
      roles: ["donor"],
      phone: "+1122334455",
      address: "789 Generosity Lane, Village",
      bio: "Passionate about helping children in need",
      avatar: "https://i.pravatar.cc/150?img=3",
      token: "mock-donor-token-789"
    }
  };

  // Check credentials (in real app, this would be server-side)
  if (mockUsers[email] && 
     ((email === "admin@example.com" && password === "admin") ||
      (email === "care@example.com" && password === "care") ||
      (email === "donor@example.com" && password === "donor"))) {
    return { 
      success: true, 
      user: mockUsers[email] 
    };
  }
  return { 
    success: false, 
    message: "Invalid credentials" 
  };
};

export const registerUser = async ({ email, password }) => {
  // Mock registration - in a real app, this would create a new user
  return { 
    success: true,
    user: {
      username: email.split('@')[0], // Generate username from email
      name: "New User",
      email,
      roles: ["donor"], // Default role for new users
      phone: "",
      address: "",
      bio: "",
      avatar: "https://i.pravatar.cc/150?img=0",
      token: "mock-new-user-token"
    }
  };
};