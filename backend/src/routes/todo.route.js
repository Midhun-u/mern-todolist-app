import {Router} from "express"
import protectMiddleware from "../middlewares/protect.middleware.js"
import {createTodo , getTodos , updateTodo , deleteTodo} from '../controllers/todo.controller.js'
const router = Router()

//route for creating todo
router.post("/createTodo" , protectMiddleware , createTodo)

//route for get todos
router.get("/getTodos" , protectMiddleware , getTodos)

//route for update todos
router.put("/updateTodo/:id" , protectMiddleware , updateTodo)

//route for delete todo
router.delete("/deleteTodo/:id" , protectMiddleware , deleteTodo)

export default router