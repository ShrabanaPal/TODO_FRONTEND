// import { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar'
import Todos from './components/Todos'
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout';
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)
  // const [todos, setTodos] = useState([]);

  const router = createBrowserRouter([
    
    {
     path:"/register",
     element: <><Navbar/> <Register/></>
  
   },

  {
    path: "/login",
    element: <><Navbar/> <Login/></>
  },

  {
    path:"/todos",
    element: <><Navbar/> <Todos/></>

  },

  {
    path: "/logout",
    element: <><Navbar/> <Register/></>
  }

  ]);
    

  return (
    <>
      <RouterProvider router={router} />

    </>
  )
}

export default App

//clear command in terminal in vs-code is --->cls
