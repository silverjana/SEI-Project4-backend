import { useEffect, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import API_URL from '../config.js'

import { Box } from "@mui/material"

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

//   return (
// <>
//       {userData
//         ?
//         <section className="taskPage">
          
//           <Box>
//             <h4><span>}{userData.na}</span> <br />
//               Service required: {taskData.treatment} - {taskData.frequency} <br />
//               Description: {taskData.description} <br />
//               assigned carer: {taskData.assigned_carer ? taskData.assigned_carer : 'still unassigned'} <br />
//               {isOwner && taskData.possible_carers.length > 0 && !taskData.assigned_carer ? 'Somone will shortly answer to your request!' : 'Start sending requests!'}</h4>
//           </Box>
//           {isOwner === taskData.owner &&
//             <>
//               <div className="btnGroup">
//                 <button className='navigatebtn' onClick={handleClick}>Go back</button>
//                 <Link className='navigatebtn' to={`/tasks/${patientId}/${taskId}/update`} >Edit task</Link>
//               </div>
//               <CaregiversList  isOwner={isOwner} taskData={taskData} onPropose ={onPropose}/>
//               {/* <CaregiversList  isOwner={isOwner} taskData={taskData} onAssign={onAssign}/> */}
              
//             </>
//           }

//         </section>
//         :
//         <LinearProgress color="success" />
//       }
//       {error && <p>{error}</p>}

//     </>
//   )
}
export default CaregiverProfile