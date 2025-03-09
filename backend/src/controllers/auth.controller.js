import User from "../models/user.model.js"
import generateToken from "../configs/generateToken.js"

//controller for sign
export const sign = async (request , response) => {

    try{

        const {userName , email , password} = request.body

        if(userName && email && password){

            const userExists = await User.exists({email : email}) // check user already exist

            if(userExists){
                response.status(400).json({message : "Email already exists"})
            }else{

                if(password.length < 6){
                    response.status(400).json({message : "Password must atleast 6 letters"})
                }else{

                    const newUser = await User.create({
                        userName : userName,
                        email : email,
                        password : password
                    })

                    //function for generating token
                    generateToken(newUser._id , newUser.userName , newUser.email , response)

                    response.status(201).json({message : "Account created" , sign : true})
                }

            }

        }else{
            response.status(400).json({message : "All fields are required"})
        }

    }catch(error){

        console.log("sign controller error : " + error)
        response.status(500).json({error : "Server error"})

    }

}

//controller for login
export const login = async (request , response) => {

    try{

        const {email , password} = request.body

        if(email && password){

            const user = await User.findOne({email : email}) //check user signed

            if(user){

                const checkPassword = await user.comparePassword(password) //check password correct

                if(checkPassword){

                    //function for generating token
                    generateToken(user._id , user.userName , user.email , response)

                    response.status(200).json({message : "Login success" , login : true})

                }else{
                    response.status(400).json({message : "Password is incorrect"})
                }

            }else{
                response.status(400).json({message : "Email is not registered"})
            }


        }else{
            response.status(400).json({message : "All fields are required"})
        }

    }catch(error){

        console.log("login controller error : " + error)
        response.status(500).json({error : "Server error"})
    }
    
}

//controller for logout
export const logout = (request , response) => {

    try{

        response.clearCookie("token") //clearing cookies
        response.status(200).json({logout : true})

    }catch(error){

        console.log("logout controller error : " + error)
        response.status(500).json({error : "Server error"})

    }

}