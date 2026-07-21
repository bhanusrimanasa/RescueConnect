import { useState } from "react";
import { registerUser } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData);

      alert("Registration successful!");

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-96"
      >
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded mb-6"
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded">
          Register
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;