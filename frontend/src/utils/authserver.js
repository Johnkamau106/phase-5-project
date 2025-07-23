import { BASE_URL } from "./api"; // assuming this is where login/register is

export const getAllUsers = async () => {
  try {
    const res = await fetch(`${BASE_URL}/api/users`);
    const data = await res.json();
    if (res.ok) return data;
    else throw new Error(data.message || "Failed to fetch users");
  } catch (err) {
    throw err;
  }
};

export const createUser = async (user) => {
  try {
    const res = await fetch(`${BASE_URL}/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (res.ok) return data;
    else throw new Error(data.message || "Failed to create user");
  } catch (err) {
    throw err;
  }
};

export const updateUser = async (userId, user) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    if (res.ok) return data;
    else throw new Error(data.message || "Failed to update user");
  } catch (err) {
    throw err;
  }
};

export const deleteUser = async (userId) => {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete user");
  } catch (err) {
    throw err;
  }
};
