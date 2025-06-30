import React from "react";
import { useState , useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";


const Todos = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

    useEffect(() => {
      let todosString = localStorage.getItem("todos");
      if (todosString) {
     let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos)
      }
    }, []); 

    const saveChanges = ()=>{
      localStorage.setItem("todos", JSON.stringify(todos));
    }

  const handleEdit = (e , id) => {
    const todoToEdit = todos.find((item) =>
      item.id === id);
    if (todoToEdit) {
      setTodo(todoToEdit.todo); //this will set the todo state to the todo item which is being edited

      let newTodos = todos.filter((item)=>{
        return item.id !== id;
      });
      setTodos(newTodos); 
    }
    saveChanges(); //save changes to local storage after editing
  };

  const handleDelete = (e) => {
    let newTodos = todos.filter((item) => {
      return item.id !== e; //this will filter out the todo item with the id passed
    });
    setTodos(newTodos); 
    
    // let confirm = window.confirm("Are you sure you want to delete this todo?");
    // if (confirm) {
    //   setTodos(newTodos); //if user confirms, we will update the todos state with the newTodos array
    // }
    saveChanges(); //save changes to local storage after deleting
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]); //todo 's are there inside the todos array
    setTodo(""); //after adding the todo, we will clear the input field
    saveChanges(); //save changes to local storage after adding
  };

  const handleChange = (e) => {
    setTodo(e.target.value); //this will set the value of todo to the input field
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    console.log(`${id}`);
    console.log(e, e.target);
    let index = todos.findIndex((item) => {
      return item.id === id;
    });

    if (index !== -1) {
      let newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted; //this will toggle the isCompleted property of the todo item
      setTodos(newTodos); //this will update the todos state with the newTodos array
      console.log(newTodos, todos);
    }
  };

  return (

    <div className="container">
      <div className="up">
      <div className="addTodo">
        <h1>Add a todo</h1>
        <input onChange={handleChange} value={todo} type="text" />
        <button disabled={todo.length<=2} onClick={handleAdd} className="btn">Add Task</button>
      </div>
      </div>

      <h2>My Todos</h2>

      <div className="todos">
      {todos.length === 0 && <p>No todos available. Please add a todo.</p>
      }
        {todos.map((item) => {
          return (
            <div key={item.id} className="todo">

              <input
                name={item.id}
                onChange={handleCheckbox}
                type="checkbox"
                className={`check ${item.isCompleted ? "line-through" : ""}`}/>

              <div className='write' style={{ textDecoration: item.isCompleted ? 'line-through' : 'none' }}>{item.todo}</div>

              <div className="button">
                <button onClick={(e)=>{handleEdit( e, item.id)}} className="btn"><FaEdit /></button>
                <button onClick={()=>{handleDelete(item.id)}} className="btn"><RiDeleteBin5Fill /></button>
              </div>
            </div>
            );
        })}
        
      </div>
    </div>
  );
};

export default Todos;

//here we have two different state
//todos --> useState([]) --> which holds all the list of todos
//todo --> useState("") --> it is an input text which can be deleted or edited anytime
