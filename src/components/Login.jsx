/* eslint-disable react/no-unescaped-entities */
// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if(email !== null && password !== null) {
      api.post('/user/login', {email, password}).then((res) => {
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/kanban');
      }).catch((err) => {
        console.log(err);
      });
    }
}

  return (
    <div className="flex w-full h-screen">
      <div className="w-full flex items-center justify-center">
      <div className=' w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-100'>
            <h1 className='text-5xl font-semibold'>Login</h1>
            <div className='mt-8'>
                <div className='flex flex-col'>
                    <label className='text-lg font-medium'>Email</label>
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder="Enter your email"
                        />
                        
                </div>
                <div className='flex flex-col mt-4'>
                    <label className='text-lg font-medium'>Password</label>
                    <input 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder="Enter your password"
                        type={"password"}
                    />
                </div>
                <div className='mt-8 flex flex-col gap-y-4'>
                    <button 
                        onClick={handleLogin}
                        className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>Login</button>
                </div>
                <div className='mt-8 flex justify-center items-center'>
                    <p className='font-medium text-base'>Don't have an account?</p>
                    <button 
                        onClick={() => navigate('/register')}
                        className='ml-2 font-medium text-base text-violet-500'>Register</button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
