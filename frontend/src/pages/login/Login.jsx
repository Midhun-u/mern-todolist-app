import React, { useState } from 'react'
import {useNavigate} from 'react-router'
import {toast} from 'react-hot-toast'
import {login} from '../../services/api'
import './Login.css'

const Login = () => {

  const [userData , setUserData] = useState({
    email : "",
    password : ""
  })
  const navigate = useNavigate()

  const handleLogin = async () => {

    if(userData.email && userData.password){

      try{

        const result = await login(userData.email , userData.password)

        if(result.login){

          toast.success(result.message)
          navigate("/")
        }else{
          toast.error(result.message)
        }

      }catch(error){

        const errorMessage = error.response.data.message
        if(errorMessage){
          toast.error(errorMessage)
        }else{
          toast.error("Something went wrong")
        }
      }

    }else{
      toast.error("All fields are required")
    }

  }

  return (

    <div className='login-form-container'>
      <div className='login-form'>
        <h2>Login</h2>
        <div className='login-input-one input'>
          <label htmlFor="login-email">Email</label>
          <input type="email" required placeholder='Email'
          onChange={(event) => setUserData({...userData , email : event.target.value})}/>
        </div>
        <div className='login-input-two input'>
          <label htmlFor="login-password">Password</label>
          <input type="Password" required placeholder='Password'
          onChange={(event) => setUserData({...userData , password : event.target.value})}/>
        </div>
        <div className='login-buttons'>
          <button className='login-button' onClick={handleLogin}>Login</button>
          <button className='sign-button' onClick={() => navigate("/sign")}>Sign</button>
        </div>
      </div>
    </div>

  )
}

export default Login
