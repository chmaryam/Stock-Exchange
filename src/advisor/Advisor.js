import React from 'react'
export default function Advisor(props) {
  return (
    <>
    <td>{props.name}</td>
    <td>{props.emailaddress}</td>
    <td><button onClick={() => {props.editView(props._id)}}>Edit</button></td>
    <td><button onClick={() => {props.deleteAdvisor(props._id)}}>Delete</button></td>
    </>
  )
}