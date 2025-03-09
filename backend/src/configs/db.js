import {connect} from 'mongoose'

const databaseConnection = async () => {

    try{

        await connect(process.env.MONGODB_URL)
        console.log("Database connected")

    }catch(error){
        console.log(error)
    }

}

export default databaseConnection