import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/Auth.Context";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
 

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    navigate("/verify");


    try {
    const res = await register(form);

    if (!res.success) {
      navigate("/register", {
        state: { error: res.message }
      });
    }
  } catch (err) {
    navigate("/register", {
      state: { error: "Something went wrong. Please try again." }
    });
  }
};

    








  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-gray-200 px-4">
      
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Create Account 
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            onChange={handleChange}
          />

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold transition">
            Register
          </button>

        </form>

        <p className="text-sm text-center mt-5">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer font-medium"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
};
export default Register