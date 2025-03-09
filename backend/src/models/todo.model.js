import { Schema  , model , SchemaTypes} from "mongoose"

const todoSchema = new Schema({
    task : {
        type : String,
        required : true
    },
    done: {
        type : Boolean,
        default : false
    },
    userId : {
        type : SchemaTypes.ObjectId,
        ref : "User"
    }
})

const Todo = model("Todos" , todoSchema)

export default Todo