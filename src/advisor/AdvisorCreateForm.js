import React,{useState} from 'react'

export default function AdvisorCreateForm(props) {
    const [newAdvisor, setNewAdvisor] = useState({})


  const handleChange = (event) => {
    const attributeToChange = event.target.name
    const newValue = event.target.value

    const advisor = {...newAdvisor}
    advisor[attributeToChange] = newValue
    console.log(advisor)
    setNewAdvisor(advisor)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    props.addAdvisor(newAdvisor)
  }
  
  return (
    <div className='form-box'>
        <h1> Add Advisor </h1>
        <form onSubmit={handleSubmit}>
        <div className="">
                <label>Name</label>
                <input type="name" name="name" onChange={handleChange}></input>
            </div>
            <div>
                <label>Email Address</label>
                <input type="email" name="emailAddress" onChange={handleChange}></input>
            </div>
            <div>
                <label>Phone Number</label>
                <input type="number" name="phoneNumber" onChange={handleChange}></input>
            </div>
            <div className='submit'>
                <input type="submit" value="Add Advisor"></input>
            </div>
        </form>
    </div>
  )
}
