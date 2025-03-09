import axios from 'axios'

const auth_URL = "http://localhost:3000/auth"
const todo_URL = "http://localhost:3000/todo"

axios.defaults.withCredentials = true

export const sign = async (userName , email , password) => {

    const response = await axios.post(auth_URL + "/sign" , {userName , email , password})
    const result = await response.data

    return result
}

export const login = async (email , password) => {

    const response = await axios.post(auth_URL + "/login" , {email , password})
    const result = await response.data

    return result

}

export const getTodos = async () => {

    const response = await axios.get(todo_URL + "/getTodos")
    const result = await response.data

    return result

}

export const addTodo = async (task) => {

    const response = await axios.post(todo_URL + "/createTodo" , {task : task})
    const result = await response.data

    return result

}

export const updateTodo = async (id , value) => {

    const response = await axios.put(todo_URL + `/updateTodo/${id}` , {value : value})
    const result = await response.data

    return result

}

export const deleteTodo = async (id) => {

    const response = await axios.delete(todo_URL + `/deleteTodo/${id}`)
    const result = await response.data

    return result

}