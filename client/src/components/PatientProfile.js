import { useEffect, useState } from "react"
import axios from "axios"
import API_URL from '../config.js'

const PatientProfile = () => {  
    //when coming back to page, scroll to top
    useEffect(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }, [])

    const [userData, setUserData] = useState('')
    const [error, setError] = useState('')


    useEffect(() => {
      const getData = async () => {
        try {
          const token = localStorage.getItem("Project4Token")
          axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null

          const { data } = await axios.get(`http://127.0.0.1:8000/patients/`)
          setUserData(data)
        } catch (error) {
          console.log(error)
          setError(error.response.data.message)
        }
      }
      getData()
    }, [])

  return (
    <>
      <h1> PatientProfile: see as owner / logged in professional </h1>
      
      
    </>
  )
}
export default PatientProfile