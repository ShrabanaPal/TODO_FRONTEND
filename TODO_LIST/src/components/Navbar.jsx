import React from 'react';
import { NavLink } from 'react-router-dom';
const Navbar = () => {
  return (
    <div>
      <nav className=''>
        <div className='logo'>My-TODO_LIST</div>
        <ul>
         <li>
           <NavLink className={({ isActive }) => isActive ? "red" : ""} to="/register">Register</NavLink>
         </li>
         <li>
           <NavLink className={({ isActive }) => isActive ? "red" : ""} to="/login">Login</NavLink>
         </li>
         <li>
           <NavLink className={({ isActive }) => isActive ? "red" : ""} to="/todos">Todos</NavLink>
         </li>
         <li>
           <NavLink className={({ isActive }) => isActive ? "red" : ""} to="/logout">Logout</NavLink>
         </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar