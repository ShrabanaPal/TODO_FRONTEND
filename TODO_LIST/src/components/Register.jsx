import React from 'react'
import {useForm} from 'react-hook-form'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [password , setPassword] = useState("");
  const [confirmPassword , setConfirmPassword] = useState("");
  const [showPassword , setShowPassword] = useState(false);
  const[loading , setLoading] = useState(false);
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit,
    watch,
    setError, 
    resetField,
    formState: { errors , isSubmitting } 
  } = useForm();

  const delay = (d)=>{
    return new Promise((resolve)=>{
      setTimeout(()=>{
           resolve("success");
      }, d * 1000);
    });
  };

  const handleRegister = async (data ,e)=>{
    e.preventDefault();
    setLoading(true);
    const { username: name, email } = data;
    if(password === confirmPassword){
      await delay(2);
      console.log(data);
      alert("Form submitted successfully");
    }
    else if(password !== confirmPassword){
      resetField("confirmPassword")
    }
    await new Promise((resolve)=>
        setTimeout(resolve,10))
    setLoading(false);               //it will show the loading that the data is submitting

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
      await axios.post('http://localhost:8081/api/auth/register', {
        name,
        email,
        password
      });
      alert("Registration Successful");
      navigate('/login');
    
 };


  return (
    <>
      {isSubmitting && <div> {loading && (<div className='msg'>Loading....</div>)}</div>}
      <div className='containerr'>
        <form action='' method='' onSubmit={handleSubmit(handleRegister)}>
          <div>
            <label htmlFor="username">Username:</label>
          <input {...register("username" , { required:{value:true , messege:"This field is required for further procced"}, minLength:{value:3 , messege:"Min length is 3"}, maxLength:{value:8 , messege:"Max length is 3"} })} placeholder='username' type="text" /><br/>
          {errors.username && <div className='redd'>{errors.username.message}</div>}
          </div>
          <div>
            <label htmlFor="email">Email Address:</label>
            <input {...register("email" , { required:{value:true , messege:"Email is not in right order!!"}, minLength:{value:10 , messege:"Min length is 20"}})} placeholder='email address' type="text" /><br/>
          {errors.email && <div className='redd'>{errors.email.message}</div>}
          </div>

          <label htmlFor="password">Password:</label>
            <input
              {...register("password", { required: { value: true, message: "This field is required for further procced" }, minLength: { value: 3, message: "Min length is 3" } })}
              placeholder='password'
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}/><br/>
          {errors.password && <div className='redd'>{errors.password.message}</div>}

          <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              {...register("confirmPassword", { required: { value: true, message: "Password does not match!!" }, minLength: { value: 3, message: "Min length is 3" } })}
              placeholder='confirm password'
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}/><br/>
          {errors.confirmPassword && <div className='redd'>{errors.confirmPassword.message}</div>}

          <div className="but">
           <button className='btnn' type="button" onClick={() => setShowPassword(!showPassword)}>
           {showPassword ? "Hide Passwords" : "Show Passwords"}
           </button>

          <button className='btnn' type="submit" disabled={isSubmitting}>Register</button>
          </div>
        </form>
      </div>
    </>
  )
}
export default Register
