import React from 'react'
import {useState , useEffect} from 'react'
import {getTodos , addTodo , updateTodo , deleteTodo} from '../../services/api'
import {useNavigate} from 'react-router'
import './Home.css'

const Home = () => {

  const [todos, setTodos] = useState([])
  const [input , setInput] = useState("")
  const navigate = useNavigate()

  useEffect(() => {

    //fetching todos
    (async() => {

      try{

        const result = await getTodos()
        setTodos(result)

      }catch(error){

        const auth = error.response.data.auth
        
        if(!auth){
          navigate("/login")
        }
      }

    })()
  } , [todos])

  //function add todo
  const handleAdd = async () => {

    try{

      if(input){

        await addTodo(input)
        
        setTodos((preTodos) => {
          return {...preTodos}
        })

        setInput("")

      }

    }catch(error){
      const auth = error.response.data.auth

      if(!auth){
        navigate("/login")
      }
    }

  }

  //function for update todo
  const handleUpdate = async (id , value) => {

    try{

      await updateTodo(id , value)

      setTodos((preTodos) => {
        return {...preTodos}
      })

    }catch(error){
      const auth = error.response.data.auth

      if(!auth){
        navigate("/login")
      }
    }

  }

  //function delete todo
  const handleDelete = async(id) => {

    try{

      await deleteTodo(id)

      setTodos((preTodos) => {
        return {...preTodos}
      })

    }catch(error){
      const auth = error.response.data.auth

      if(!auth){
        navigate("/login")
      }
    }

  }

  return (

    <>
      <div className='todo-container'>
        <h1>Todo List</h1>
        <div className='todo-section'>
          <div className='todo-input'>
            <input type="text" placeholder='Enter you task'
            onChange={(event) => setInput(event.target.value)} value={input}/>
            <button onClick={handleAdd}>Add</button>
          </div>
          <div className='todo-items'>
            {
              todos.length > 0
              ?
              todos.map((todo , index) => (
                <>
                  <ul className='todo-item-section' key={todo._id}>
                    <li className='radio-button'>
                      {
                        todo.done
                        ?
                        <input type="radio" checked onClick={() => handleUpdate(todo._id , false)}/>
                        :
                        <input type="radio" onClick={() => handleUpdate(todo._id , true)}/>
                      }
                    </li>
                    <li className='todo-task'>
                      <span style={todo.done ? {textDecoration : "line-through" , color : "orange"} : null}>{todo.task}</span>
                    </li>
                    <li className='delete-button'>
                      <svg onClick={() => handleDelete(todo._id)} style={{fill : "black"}} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                    </li>
                  </ul>
                </>
              ))
              :
              null
            }
          </div>
        </div>
      </div>
    </>

  )
}

export default Home
