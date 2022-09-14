import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import API_URL from '../config.js'
import { Box } from "@mui/material"
import { Button } from "react-bootstrap"

const SingleTask = () => {

  const { taskId, patientId } = useParams()

  const [taskData, setTaskData] = useState(null)
  const [error, setError] = useState('')
  let isOwner = false


  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("Project4Token")
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

  useEffect(() => {
    async function getOwner() {
      const owner = await taskData.owner
      if (patientId === await owner) {
        isOwner = true
      }
    }
    getOwner()
  }, [])

  //! assign carer to task
  const [message, setMessage] = useState('')

  const onAssign = async (event) => {

    event.preventDefault()
    console.log(event)

    try {
      // API request -> Put req
      const res = await axios.add(`http://127.0.0.1:8000/tasks/${taskId}`, event.data)

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
          <Button className='navigatebtn' href={`/tasks/${patientId}/${taskId}/update`} >Edit task</Button>
          <Button className='deletebtn' onClick={onAssign}>assign Task</Button>
          <Box>
            <p>{taskData.status} task created on {taskData.created_at.split('T')[0]}. <br />
              Service required: {taskData.treatment} - {taskData.frequency} <br />
              Description: {taskData.description} <br />
              assigned carer: {taskData.assigned_carer ? taskData.assigned_carer : 'still unassigned'} <br />
              {isOwner && taskData.possible_carers > 0 ? 'Somone will shortly answer to your request!' : 'Start sending requests!'}</p>
          </Box>
          {isOwner &&
            <>
              <p> show list of carers to assign</p>
              <Button className='navigatebtn' href={`/tasks/${patientId}/${taskId}/update`} >Edit task</Button>
            </>
          }

        </>
        :
        <p>loading...</p>
      }
      {error && <p>{error}</p>}

    </>
  )
}
export default SingleTask