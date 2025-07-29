import { BASE_URL } from "./api";

export const getAllUsers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/users`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch users");
    }

    // Backend returns array directly, so we use the response directly
    const users = await res.json();
    return Array.isArray(users) ? users : [];
  } catch (err) {
    console.error("API Error:", err);
    throw err;
  }
};
export const createUser = async ({ email, password, role }) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Optional: Authorization header if protected route
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password, role }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, user: data };
    } else {
      return {
        success: false,
        message: data.message || "User creation failed",
      };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Optional: Authorization header if protected route
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const data = await getAllUsers();
    const validUsers = Array.isArray(data) ? data : [];
    setUsers(validUsers);
    onUserCountChange && onUserCountChange(validUsers.length);

    if (response.ok) {
      return { success: true, user: data };
    } else {
      return {
        success: false,
        message: data.message || "User update failed",
      };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};
export const deleteUser = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Optional: Authorization header if protected route
        // "Authorization": `Bearer ${token}`,
      },
    });

    if (response.ok) {
      return { success: true };
    } else {
      const data = await response.json();
      return {
        success: false,
        message: data.message || "User deletion failed",
      };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
};
