import { useEffect, useState } from "react"
import axios from "axios"
import API_URL from '../config.js'

import MyCaregiverProfile from './MyCaregiverProfile'

const UserProfile = () => {  
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

          const { data } = await axios.get(`http://127.0.0.1:8000/auth/profile/`)
          setUserData(data)
          console.log(data.content_type)

        } catch (error) {
          console.log(error)
          setError(error.response.data.message)
        }
      }
      getData()
    }, [])




  return (
    <>
      <h1> userprofile </h1>
      {error && {error}}
      {userData
      ?
      userData.content_type === 7? <p> show patient component</p> : <MyCaregiverProfile userData={userData}  />
      :
      <p>show login</p>
      }
      
      
    </>
  )
}
export default UserProfile