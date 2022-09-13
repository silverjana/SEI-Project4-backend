import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import API_URL from '../config.js'

const SingleTask = () => {  

  const { taskId } = useParams()

  const [taskData, setTaskData] = useState(null)
  const [error, setError] = useState('')


  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("Project4Token")
        axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null

        const { data } = await axios.get(`http://127.0.0.1:8000/tasks/${taskId}`)
        setTaskData(data)
        console.log('DATA', taskData)

      } catch (error) {
        console.log(error)
        setError(error.code)
      }
    }
    getData()
  }, [taskId])

  return (
    <>
      <h1> See single task as owner / invited + logged in professional </h1>
      <p>-</p>
      {error && <p>{error}</p>}
      
    </>
  )
}
export default SingleTask