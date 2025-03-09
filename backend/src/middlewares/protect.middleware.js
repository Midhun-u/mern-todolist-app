import jwt from 'jsonwebtoken'
import User from '../models/user.model.js'


//protect middleware
const protectMiddleware = async (request , response , next) => {

    const {token} = request.cookies

    if(token){

        //verify token
        const user = jwt.verify(token , process.env.JWT_SECRETE)

        if(user){
            
            const userDetails = await User.findOne({_id : user.id})
            request.user = userDetails

            next()
        }else{
            response.status(400).json({auth : false})
            console.log("Invalid token")
        }

    }else{

        response.status(400).json({auth : false})

    }

}

export default protectMiddleware