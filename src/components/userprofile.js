import { useEffect, useState } from "react"
import axios from "axios"
import API_URL from '../config.js'
import { Button } from "@mui/material"

import MyCaregiverProfile from './MyCaregiverProfile'
import MyPatientProfile from "./MyPatientProfile.js"

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
      userData.content_type === 7 ? <MyPatientProfile userData={userData}  /> : <MyCaregiverProfile userData={userData}  />
      :
      <p>Plerase log in to see this page <Button className='navigatebtn' href='/login'>Click here to log in</Button></p>
      }
      
      
    </>
  )
}
export default UserProfile