import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import API_URL from '../config.js'

import { Box } from "@mui/material"

import catDoctor from '../images/catDoctor.jpeg'

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

  const navigate = useNavigate()

    //go back
    const handleClick = () => {
      navigate(-1)
    }

  return (
<>
      {userData
        ?
        <section className="taskPage">
          
          <Box className="carerInfo">
            <h4><span>{userData.name}</span> 
            <img className="carerImg" loading="lazy" src={userData.image ? userData.image : catDoctor} alt={'profile'} /> <br />
              {userData.location} <br />
              Qualification: {userData.qualification} <br />
              Specialization: {userData.specialization}<br />
              {userData.education && userData.education} <br /> 
              {userData.bio && userData.bio} <br /> 
              
              </h4>
          </Box>
          
            <>
              <div className="btnGroup">
                <button className='navigatebtn' onClick={handleClick}>Go back</button>
                
              </div>

            </>
          

        </section>
        :
        <p>Loading...</p>
      }
      {error && <p>{error}</p>}

    </>
  )
}
export default CaregiverProfile