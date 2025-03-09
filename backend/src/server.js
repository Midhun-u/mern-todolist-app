import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import {config} from 'dotenv'
import databaseConnection from './configs/db.js'
import authRoute from './routes/auth.route.js'
import todoRoute from './routes/todo.route.js'
const app = express()
const PORT = process.env.PORT || 3000
config()

app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(cors({credentials : true , origin : ["https://midhun-todo-mern.netlify.app" , "http://localhost:3000"]}))

//middleware for authentication
app.use("/auth" , authRoute)

//middleware for todos
app.use("/todo" , todoRoute)

app.listen(PORT , () => {

    console.log(`Server running on ${PORT}`)

    //function for connecting database
    databaseConnection()

})
