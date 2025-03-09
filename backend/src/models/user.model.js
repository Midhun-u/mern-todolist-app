import {Schema , model} from 'mongoose'
import {genSalt , hash , compare} from 'bcryptjs'

const userSchema = new Schema({
    userName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    }
})

//hashing password before saving
userSchema.pre("save" , async function(next){

    try{

        const salt = await genSalt(10) //generate salt
        this.password = await hash(this.password , salt)
        next()

    }catch(error){
        console.log("password hashing error : " + error)
    }

})


//method for comparing password
userSchema.methods.comparePassword = async function(userPassword){

    return await compare(userPassword , this.password)

}

const User = model("User" , userSchema)

export default User