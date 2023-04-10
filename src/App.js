import React, { useState,useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom"
import Axios from 'axios'
import jwt_decode from 'jwt-decode'

// Imported Components
import SignUp from './user/SignUp'
import SignIn from './user/SignIn'

export default function App() {

  const [IsAuth,setIsAuth] = useState(false)
  const [user,setUser] = useState({})

  useEffect(() => {
    let token = localStorage.getItem("token")
    if(token != null){
      let user = jwt_decode(token)

      if (user){
        setIsAuth(true)
        setUser(user)
      }
      else if (!user){
        localStorage.removeItem("token")
        setIsAuth(false)

      }
    }
  }, [])

  const registerHandler = (user) => {
    Axios.post("auth/signup",user)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  }

  const loginHandler = (cred) => {
    Axios.post("auth/Signin", cred)
    .then(res => {
      console.log(res.data.token)
      // save the token into local storage
      let token = res.data.token
      if(token != null){
        // "key",value
        localStorage.setItem("token",token)
        let user = jwt_decode(token)
        setIsAuth(true)
        setUser(user)
      }
    })
    .catch(err => {
      console.log(err)
    })
    
  }
  const logoutHandler = (e) => {
    e.preventDefualt()
    localStorage.removeItem("token")
    setIsAuth(false)
    setUser(null)
  }

  return (
    <div>
        <Router>
        <div>
          <nav>
            <div>
              <Link to="/">Home</Link> &nbsp;
              <Link to="/signup">Signup</Link> &nbsp;
              <Link to="/signin">Signin</Link> &nbsp;
              <Link to="/logout" onClick={logoutHandler}>logout</Link> &nbsp;
            </div>
          </nav>
        </div>

        <div>
          <Routes>
              <Route path="/" element={<SignIn login={loginHandler}/>}/>
              <Route path="/signup" element={<SignUp register={registerHandler} />}/>
              <Route path="/signin" element={<SignIn login={loginHandler}></SignIn>}/>
              </Routes>
              </div>
            </Router>
    </div>
  )
}