import React, { useState } from 'react'
import {Container,Form,Button} from "react-bootstrap"

export default function SignUp(props) {

    const [newUser,setNewUser] = useState({})

    const changeHandler = (e) => {
        const user = {...newUser}
        user[e.target.name] = e.target.value
        setNewUser(user)
        console.log(user)
    }

    const registerHandler = () => {
        props.register(newUser)
    }

  return (
    <div className='up-form'>
        <h1>Sign Up</h1>
        <Container>
        <Form.Group>
            <Form.Label>First Name</Form.Label>
            <Form.Control name="firstName" type='text' onChange={changeHandler} required/>
        </Form.Group>

        <Form.Group>
            <Form.Label>Last Name</Form.Label>
            <Form.Control name="lastName" type='text' onChange={changeHandler} required/>
        </Form.Group>

        <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control name="emailAddress" type='email' onChange={changeHandler} required/>
        </Form.Group>

        <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control name="password" type='password' onChange={changeHandler} required/>
        </Form.Group>

        <Form.Group>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control name="phoneNumber" type='text' onChange={changeHandler} required/>
        </Form.Group>

        <Button variant="primary" onClick={registerHandler}>Register</Button>
    </Container>
    </div>
  )
}
