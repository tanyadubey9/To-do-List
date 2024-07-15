import { useState, useEffect } from 'react'
import Navbar from './Components/Navbar'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])
  
  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (params) => {
    setshowFinished(!showFinished )
  }
  

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
    saveToLS()
  }

  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckBox = (e) => {
    const id = e.target.name
    const newTodos = todos.map(item => {
      if(item.id === id){
        return {...item, isCompleted: !item.isCompleted}
      }
      return item
    })
    setTodos(newTodos)
    saveToLS()
  }
  
  return (
    <>
      <Navbar />
      <div className="flex justify-center m-4">
        <div className="p-4 flex flex-col bg-violet-100 w-full min-h-[80vh] md:w-3/4 lg:w-1/2 xl:w-1/3 rounded shadow">
          <div className="text-2xl font-bold p-2 text-center">
            <h1>iTask - Manage your todos at one place</h1>
          </div>
          <div className="flex flex-col gap-6">
            <span className='text-center md:text-start'>
              <h2 className='text-lg font-bold my-2'>Add a Todo</h2>
              <input onChange={handleChange} value={todo} type="text" className='rounded-2xl w-full md:w-3/4 lg:w-4/5 p-1 border' />
              <button onClick={handleAdd} disabled={todo.length<=3} className='m-3 p-2 rounded-full bg-violet-500 hover:bg-violet-800 disabled:bg-violet-400 text-white text-xs font-bold'>Save</button>
            </span>
            <div className='flex gap-3 items-center'>
              <input onChange={toggleFinished} type="checkbox" checked={showFinished} name="" id="" />
              Show Finished
            </div>
          </div>
          <div className="h-full">
            <h2 className='text-lg font-bold my-2'>Your Todos</h2>
            <div className=''>
              {todos.length === 0 && <div className='m-4'>No Todos to display</div>}
              {todos.map(item => {
                return (showFinished || !item.isCompleted) && <div key={item.id} className='flex justify-between items-center flex-wrap bg-white p-2 mb-1 rounded shadow'>
                  <div className='flex items-baseline gap-2 w-3/5'>
                    <input onChange={handleCheckBox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                    <span className={`${item.isCompleted ? "line-through" : ""} break-all`}>{item.todo}</span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <button onClick={(e) => handleEdit(e, item.id)} className='p-2 rounded-full bg-violet-500 hover:bg-violet-800 text-white text-xs font-bold'><FaEdit /></button>
                    <button onClick={(e) => handleDelete(e, item.id)} className='p-2 rounded-full bg-violet-500 hover:bg-violet-800 text-white text-xs font-bold'><AiFillDelete /></button>
                  </div>
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
