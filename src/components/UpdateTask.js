import { TextField, Container, Button, FormLabel } from '@mui/material'
import * as React from 'react'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'

import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Slider from "@mui/material/Slider"
import TextareaAutosize from "@mui/material/TextareaAutosize"
import Box from "@mui/material/Box"
import { useParams } from "react-router-dom"

import { API_URL } from "../config" 




const UpdateTask = () => {

  //when coming back to page, scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  let { patientId, taskId } = useParams()

  const [data, setData] = useState({
    description: "",
    start_date: "",
    frequency: "",
    treatment: "",
    status: 'new',

  })

  const navigate = useNavigate()

  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [oldData, setOldData] = useState(null)

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
    console.log(event.target)
    setError('')
  }


  //!get old task data

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("Project4Token")
        axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null

        const { data } = await axios.get(`http://127.0.0.1:8000/tasks/${taskId}/`)
        setOldData(data)
        console.log('DATA', data)

      } catch (error) {
        console.log(error)
        setError(error.code)
      }
    }
    getData()
  }, [taskId])


  //setData with the old review spread -> is the value/shows in text fields

  useEffect(() => {
    async function setplaceholder() {
      console.log("old data", oldData)
      const oldTask = await oldData
      console.log('oldtask', oldTask)
      const { description, start_date, frequency, treatment } = await oldTask
      //console.log(title)
      setData({ description, start_date, frequency, treatment })
    }
    setplaceholder();
  }, [oldData])



  const onSubmit = async (event) => {

    event.preventDefault()

    try {
      // API request -> Put req
    const res = await axios.put(`http://127.0.0.1:8000/tasks/${taskId}`, data)
  
    //save the response
    setMessage(res.data)
    console.log(" res ", res.data)
    //go to 
    navigate(`/tasks/${patientId}/${taskId}`)


    } catch (error) {
      console.log(error)

      setError(error.message)

    //   //! error on forms
    //   //helperText={error ? "Incorrect entry" : false}
    //   //error={error ? true : false }
    }
  }
  return (
    <>
      <Container className="authform">
        <h1> create a new task as a logged in patient </h1>
        <form className="form" onSubmit={onSubmit}>
          {error && <div className='error-mex'>{error}</div>}
          <TextField multiline error={error ? true : false} rows={3} className="form-input" variant="filled" name='description' label="Description" value={data.description} onChange={handleChange} />
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
          <Button variant="outlined" type='submit' className='submitbtn'>Update</Button>
          {message && <button className='okmessage'>{message}</button>}
        </form>
      </Container>

    </>
  )
}


export default UpdateTask