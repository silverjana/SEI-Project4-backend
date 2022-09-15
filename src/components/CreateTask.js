import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { TextField, Container, Button, FormLabel } from '@mui/material'
import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import axios from 'axios';

const CreateTask = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  //get patient id 
  const {patientId} = useParams()

  const navigate = useNavigate()
  const [error, setError] = useState('')

  const [data, setData] = useState({
    description: "",
    start_date: "",
    frequency: "",
    treatment: "",
    status: 'new',
    
  })

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
    console.log(event.target)
    setError('')
  }

  const [message, setMessage] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      //! added auth
      const token = localStorage.getItem("Project4Token")
      axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null

      // API request -> POST req
      console.log('request to send',data)
      const res = await axios.post(`http://127.0.0.1:8000/tasks/`, data)
      //save the response
      setMessage(res.statusText)
      //WAIT and go to 
      console.log(res)
      const taskId = res.data.id
      //setTimeout(navigate(`/tasks/${taskId}`), 5000)
      navigate(`/tasks/${patientId}/${taskId}`)


    } catch (error) {
      console.log(error)
      setError(error.response.data.message)
    }



      //! error on forms
      //helperText={error ? "Incorrect entry" : false}
      //error={error ? true : false }
    }

  

  return (
    <>
      <Container className="authform">
        <h1> create a new task as a logged in patient </h1>
        <form className="form" onSubmit={onSubmit}>
          {error && <div className='error-mex'>{error}</div>}
          <TextField multiline rows={3} className="form-input" variant="filled" name='description' label="Description" value={data.description} onChange={handleChange} />
          <TextField required error={error ? true : false} className="form-input" variant="filled" type='date' name='start_date' label="Start date" value={data.start_date} onChange={handleChange} />
          <FormLabel required id="demo-radio-buttons-group-label">Frequency</FormLabel>
          <RadioGroup row name="row-radio-buttons-group" onChange={handleChange} value={data.frequency}>
            <FormControlLabel value="once" name="frequency" control={<Radio color="secondary" />} label="once" />
            <FormControlLabel value="daily" name="frequency" control={<Radio color="secondary" />} label="daily" />
            <FormControlLabel value="weekly" name="frequency" control={<Radio color="secondary" />} label="weekly" />
          </RadioGroup>

          <FormLabel required id="demo-radio-buttons-group-label">Type of care</FormLabel>
          <RadioGroup row name="row-radio-buttons-group" onChange={handleChange} value={data.treatment}>
            <FormControlLabel value="homecare" name="treatment" control={<Radio color="secondary" />} label="Homecare" />
            <FormControlLabel value="phlebotomist" name="treatment" control={<Radio color="secondary" />} label="Blood sample collection" />
            <FormControlLabel value="x_rays" name="treatment" control={<Radio color="secondary" />} label="X-rays" />
            <FormControlLabel value="nurse" name="treatment" control={<Radio color="secondary" />} label="Nurse" />
            <FormControlLabel value="ENT" name="treatment" control={<Radio color="secondary" />} label="Ears, nose and throat" />
          </RadioGroup>
          <Button variant="outlined" type='submit' className='submitbtn'>Create</Button>
          {message && <button className='okmessage'>{message}</button>}
        </form>
      </Container>

    </>
  )
}
export default CreateTask