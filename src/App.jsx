import react, { useEffect, useState } from 'react';
import { CiEdit } from "react-icons/ci";
import Navbar from './components/Navbar';
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';


const App = () => {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  // const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  // const toggleFinished = (e) => {
  //   setShowFinished(!showFinished)
  // }
  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const addHandler = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompeleted: false }])
    setTodo("")
    console.log(todos)
    saveToLocalStorage()
  }
  const changeHandler = (e) => {
    setTodo(e.target.value)
  }
  const checkBoxHandler = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompeleted = !newTodos[index].isCompeleted;
    setTodos(newTodos)
    saveToLocalStorage()
  }
  const editHandler = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)

    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLocalStorage()
  }
  const deletetHandler = (e, id) => {

    console.log(`the id ${id}`)
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    console.log(index)

    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLocalStorage()
  }

  return (
    <>
      <Navbar />
      <div className='mx-auto my-5 rounded-xl p-5 bg-violet-300 min-h-[80vh] w-1/2'>

        <div className="addtodo flex flex-col gap-2">
          <h1 className='text-2xl  font-bold my-5 text-center'>Todo List App</h1>
          <input type="text" className='w-full rounded-sm p-0.6 ' onChange={changeHandler} value={todo} />
          <button className='bg-violet-700 hover:bg-violet-800 p-1 text-sm font-bold text-white
          rounded-md mx-6 disabled:bg-violet-400 ' disabled={todo.length <= 2} onClick={addHandler}>Save</button>
        </div>
        {/* <input type="checkbox" onChange={toggleFinished} checked={showFinished} /> Show Finished */}
        <h1 className='text-2xl font-bold my-2  '>Your Todos</h1>
        <div className='todos'>
          {todos.length === 0 && <div className='my-3'>No Todo Here</div>}
          {todos.map(item => {

            return <div key={item.id} className='todo flex w-full my-3 justify-between '>
              <div className='flex gap-5'>
                <input onChange={checkBoxHandler} type="checkbox" checked={todo.isCompeleted} name={item.id} id="" />
                <div className={item.isCompeleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className='buttons flex h-full'>
                <button className='bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold text-white
          rounded-md mx-4' onClick={(e) => editHandler(e, item.id)}><CiEdit /></button>
                <button className='bg-violet-800 hover:bg-violet-950 p-2 text-sm font-bold text-white
          rounded-md' onClick={(e) => deletetHandler(e, item.id)}><AiFillDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
