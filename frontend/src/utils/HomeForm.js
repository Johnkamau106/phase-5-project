import { useState } from "react";
import { BASE_URL } from "../utils/api";

const HomeForm = ({ home, onSave }) => {
  const [formData, setFormData] = useState(
    home || {
      name: "",
      location: "",
      capacity: 20,
      // ... other fields
    }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = home
        ? `${BASE_URL}/api/homes/${home.id}`
        : `${BASE_URL}/api/homes`;
      const method = home ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save");
      const result = await response.json();
      onSave(result);
    } catch (error) {
      console.error("Error saving home:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Your form fields here */}
      <button type="submit">Save</button>
    </form>
  );
};
