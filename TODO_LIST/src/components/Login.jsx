import React from 'react'
import {useForm} from 'react-hook-form'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const delay = (d) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("success");
      }, d * 1000);
    });
  };

  const handleLogin = async (data, e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await delay(2);
      console.log(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert("Form submitted successfully");
      setLoading(false);

      const res = await axios.post('http://localhost:8081/api/auth/login', {
        email: data.email,
        password: data.password
      });

      if (res.status === 200) {
        alert("Login successful!");
        // Optionally store user data in localStorage
        // localStorage.setItem("user", JSON.stringify(res.data));
        navigate('/todos');
      }
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
      setLoading(false);
    }
  };



  return (
    <>
    {isSubmitting && <div> {loading && (<div className='msg'>Loading....</div>)}</div>}
      <div className='containerr'>
        <form action='' method='' onSubmit={handleSubmit(handleLogin)}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              {...register("username", {
                required: { value: true, message: "This field is required for further proceed" },
                minLength: { value: 3, message: "Min length is 3" },
                maxLength: { value: 8, message: "Max length is 8" }
              })}
              placeholder='username'
              type="text"
            /><br />
            {errors.username && <div className='red'>{errors.username.message}</div>}
          </div>
          <div>
            <label htmlFor="email">Email Address:</label>
            <input
              {...register("email", {
                required: { value: true, message: "Email is not in right order!!" },
                minLength: { value: 10, message: "Min length is 10" }
              })}
              placeholder='email address'
              type="text"
            /><br />
            {errors.email && <div className='red'>{errors.email.message}</div>}
          </div>
          <label htmlFor="password">Password:</label>
          <input
            {...register("password", {
              required: { value: true, message: "Password is required!!" },
              minLength: { value: 3, message: "Min length is 3" }
            })}
            placeholder='password'
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          /><br />
          {errors.password && <div className='red'>{errors.password.message}</div>}

          <div className="but">
            <button className='btn' type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "Hide Password" : "Show Password"}
            </button>
            <button className='btn' type="submit" disabled={isSubmitting}>Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login 
