import jwt from 'jsonwebtoken'

//function for generate token
const generateToken = async (userId , userName , email , response) => {

    // generate token
    const token = jwt.sign({id : userId , email : email , name : userName} , process.env.JWT_SECRETE , {expiresIn : "1d"})
    response.cookie("token" , token , {
        httpOnly : true,
        secure : true,
        sameSite : "Strict",
        maxAge : 24 * 60 * 60 * 1000
    })

}

export default generateToken