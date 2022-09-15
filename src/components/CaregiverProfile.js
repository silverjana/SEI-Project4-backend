import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import API_URL from '../config.js'
import { Button } from "@mui/material"

const CaregiverProfile = () => {  
  //when coming back to page, scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const { carerId } = useParams()

  const [userData, setUserData] = useState(null)
  const [error, setError] = useState('')


  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("Project4Token")
        axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null

        const { data } = await axios.get(`http://127.0.0.1:8000/carers/${carerId}/`)
        setUserData(data)
        console.log('DATA', data)

      } catch (error) {
        console.log(error)
        setError(error.response.data.message)
      }
    }
    getData()
  }, [])

  return (
    <>
      <h1> see caregiver profile as logged in user ( any) </h1>
      {error && <p>{error}</p>}
      {userData 
      ? 
      <p>DATA IS HERE!</p> 
      :
      <p>Loading...</p>}
    </>
  )
}
export default CaregiverProfile