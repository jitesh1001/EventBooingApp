import React, { useState, useContext } from "react";
import { AuthContext } from "../Context/Auth.Context";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const { verifyOtp, otpEmail } = useContext(AuthContext);
  
  const navigate = useNavigate();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await verifyOtp(otp);

    if (res.success) {
      navigate("/");
    } else {
      setError(res.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded shadow w-80">

        <h2 className="text-xl font-bold text-center mb-3">
          Verify OTP
        </h2>

     
      
        {error && (
          <p className="text-red-500 text-center text-xs mb-2">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full p-2 border rounded text-center mb-3"
          />

          <button className="w-full bg-blue-600 text-white p-2 rounded">
            Verify
          </button>
        </form>

      </div>
    </div>
  );
};

export default VerifyOtp;