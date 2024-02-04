// src/components/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../utils/api';

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSignUpHandle = () => {
    if (email !== null && password !== null && name !== null) {
      api.post('/user', {email, password, name}).then(() => {
        navigate('/login');
      }).catch((err) => {
        console.log(err);
      });
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center">
        <div className=" w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100">
          <h1 className="text-5xl font-semibold">Register</h1>
          <div className="mt-8">
            <div className="flex flex-col">
              <label className="text-lg font-medium">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col mt-4">
              <label className="text-lg font-medium">Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
                placeholder="Enter your email"
                type={"password"}
              />
            </div>
            <div className="mt-8 flex flex-col gap-y-4">
              <button
                onClick={onSignUpHandle}
                className="active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg"
              >
                Register
              </button>
            </div>
            <div className="mt-8 flex justify-center items-center">
              <p className="font-medium text-base">
                Are you already registered?
              </p>
              <button
                onClick={() => navigate("/login")}
                className="ml-2 font-medium text-base text-violet-500"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
