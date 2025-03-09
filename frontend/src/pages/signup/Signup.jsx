import React, { useState } from 'react'
import {useNavigate} from 'react-router'
import './Signup.css'
import { sign } from '../../services/api'
import {toast} from 'react-hot-toast'

const Signup = () => {

  const [userData , setUserData] = useState({
    userName : "",
    email : "",
    password : ""
  })
  const navigate = useNavigate()

  //function for sign
  const handleSign = async () => {

    if(userData.userName && userData.email && userData.password){

      try{

        if(userData.password.length >= 6){
  
          const result = await sign(userData.userName , userData.email , userData.password)

          if(result.sign){
            toast.success(result.message)
            navigate("/")
          }

        }else{

          toast.error("Password must be atleast 6 letters")
 
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

    <>
      <div className='sign-form-container'>
        <div className='sign-form'>
          <h2>Sign Up</h2>
          <div className='input-section-one input-section'>
            <label htmlFor="name">Username</label>
            <input type="text" id='name' required placeholder='Username'
            onChange={(event) => setUserData({...userData , userName : event.target.value})}/>
          </div>
          <div className='input-section-two input-section'>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' required placeholder='Email'
            onChange={(event) => setUserData({...userData , email : event.target.value})}/>
          </div>
          <div className='input-section-three input-section'>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' required placeholder='Password'
            onChange={(event) => setUserData({...userData, password : event.target.value})}/>
          </div>
          <div className='button-section'>
            <button className='sign-button' onClick={handleSign}>Sign up</button>
            <button className='login' onClick={() => navigate("/login")}>Login</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signup
