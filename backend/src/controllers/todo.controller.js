import Todo from "../models/todo.model.js"

//controller for create todo
export const createTodo = async (request , response) => {

    try{

        const {task} = request.body
        const {_id : userId} = request.user

        if(task){

            const newTask = await Todo.create({
                task : task,
                userId : userId
            })

            if(newTask){
                response.status(201).json({message : "Todo created"})
            }else{
                response.status(400).json({message : "Todo is not created"})
            }

        }else{

            response.status(400).json({message : "Task is required"})

        }

    }catch(error){

        console.log("createTodo controller error : " + error)
        response.status(500).json({error : "Server error"})

    }

}

//controller for send todos
export const getTodos = async (request , response) => {

    const {_id : userId} = request.user

    try{

        const todos = await Todo.find({userId : userId})
        response.status(200).json(todos)


    }catch(error){

        console.log("createTodo controller error : " + error)
        response.status(500).json({error : "Server error"})

    }

}

//controller for update todo
export const updateTodo = async (request , response) => {

    try{

        const {id} = request.params
        const {value} = request.body

        if(id){

            await Todo.findByIdAndUpdate(id , {done : value})
            response.status(200).json({message : "Todo updated"})

        }


    }catch(error){

        console.log("createTodo controller error : " + error)
        response.status(500).json({error : "Server error"})

    }
}

//controller for delete todo
export const deleteTodo = async (request , response) => {

    try{

        const {id} = request.params

        await Todo.deleteOne({_id : id})

        response.status(200).json({message : "Todo deleted"})

    }catch(error){

        console.log("createTodo controller error : " + error)
        response.status(500).json({error : "Server error"})

    }

}