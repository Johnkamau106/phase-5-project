export const loginUser = async ({ email, password }) => {
  // Replace this with your real API call
  if (email === "admin@example.com" && password === "admin") {
    return { success: true, user: { username: "admin", roles: ["admin"] } };
  }
  if (email === "care@example.com" && password === "care") {
    return { success: true, user: { username: "caregiver", roles: ["caregiver"] } };
  }
  if (email === "donor@example.com" && password === "donor") {
    return { success: true, user: { username: "donor", roles: ["donor"] } };
  }
  return { success: false, message: "Invalid credentials" };
};

export const registerUser = async ({ email, password }) => {
  // Replace this with your real API call
  return { success: true };
};