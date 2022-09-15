import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import API_URL from '../config.js'
import { Box } from "@mui/material"
import { Button } from "react-bootstrap"
import {LinearProgress} from "@mui/material"

import { getToken, getPayload } from '../helpers/auth'

import CaregiversList from "./CaregiversList.js"

const SingleTask = () => {

  const { taskId, patientId } = useParams()

  const [taskData, setTaskData] = useState(null)
  const [error, setError] = useState('')
  const [isOwner, setIsOwner] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
  const payload = getPayload()
  //console.log('payload:', payload)
  setIsOwner(payload.user)
  }, [])

  useEffect(() => {
    const getData = async () => {
      try {
        const token = getToken()
        axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null

        const { data } = await axios.get(`http://127.0.0.1:8000/tasks/${taskId}/`)
        setTaskData(data)
        console.log('DATA', data)

      } catch (error) {
        console.log(error)
        setError(error.code)
      }
    }
    getData()
  }, [taskId])

  //go back
  const handleClick = () => {
    navigate(-1)
  }


  // //! assign carer to task
  // const [message, setMessage] = useState('')

  // const onAssign = async (event) => {
  //   event.preventDefault()
  //   const req =  event.target.value
  //   console.log(req)
  //   try {
  //     // API request -> Put req
  //     const res = await axios.put(`http://127.0.0.1:8000/tasks/assign/${taskId}/`, {id: req})
  //     //save the response
  //     setMessage(res.data)
  //     console.log(" res ", res.data)
  //     //go to 
  //     //navigate(`/tasks/${patientId}/${taskId}`)

  //   } catch (error) {
  //     console.log(error)
  //     setError(error.message)
  //   }
  // }

  //! propose task to carer
  const [message, setMessage] = useState('')

  const onPropose = async (event) => {
    event.preventDefault()
    const req =  event.target.value
    console.log('carerid ',req)
    console.log('taskid:', taskId)
    try {
      // API request -> Put req
      const res = await axios.put(`http://127.0.0.1:8000/tasks/propose/${taskId}/`, {id: req})
      //save the response
      setMessage(res.data)
      console.log(" res ", res.data)
      //go to 
      //navigate(`/tasks/${patientId}/${taskId}`)

    } catch (error) {
      console.log(error)
      setError(error.message)
    }
  }

  return (
    <>
      <h1> See single task as owner OK + invited logged in professional </h1>
      {taskData
        ?
        <>
          <button className='btn oksubmit' onClick={handleClick}>Click here to go back</button>
          <Box>
            <p>{taskData.status} task created on {taskData.created_at.split('T')[0]}. <br />
              Service required: {taskData.treatment} - {taskData.frequency} <br />
              Description: {taskData.description} <br />
              assigned carer: {taskData.assigned_carer ? taskData.assigned_carer : 'still unassigned'} <br />
              {isOwner && taskData.possible_carers > 0 ? 'Somone will shortly answer to your request!' : 'Start sending requests!'}</p>
          </Box>
          {isOwner === taskData.owner &&
            <>
              <Button className='navigatebtn' href={`/tasks/${patientId}/${taskId}/update`} >Edit task</Button>
              
              <CaregiversList  isOwner={isOwner} taskData={taskData} onPropose ={onPropose}/>
              {/* <CaregiversList  isOwner={isOwner} taskData={taskData} onAssign={onAssign}/> */}
              
            </>
          }

        </>
        :
        <LinearProgress color="success" />
      }
      {error && <p>{error}</p>}

    </>
  )
}
export default SingleTask