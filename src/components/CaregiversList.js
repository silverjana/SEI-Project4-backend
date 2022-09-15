import { useEffect, useState } from "react"
import axios from "axios"
import { LinearProgress } from '@mui/material'
import { Card, Container } from 'react-bootstrap'
import { Link } from "react-router-dom"
import catDoctor from '../images/catDoctor.jpeg'

//? Filter
import CarersFilters from './CarersFilters.js'

const CaregiversList = ({isOwner, taskData, onAssign}) => {

  // DO NOT SCROLL TO TOP

  const [carersData, setCarersData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("Project4Token")
        axios.defaults.headers.common["Authorization"] = token ? `Bearer ${token}` : null

        const { data } = await axios.get(`http://127.0.0.1:8000/carers/`)
        setCarersData(data)
        console.log('DATA', data)

      } catch (error) {
        console.log(error)
        setError(error)
      }
    }
    getData()
  }, [])

//! FILTER ---

const [ filteredCarers, setFilteredCarers ] = useState([])

const [ filters, setFilters ] = useState({
  searchLocation: '',
  specialization:'All',
})


  return (
    <>
      <h1> see all caregivers in a list OK + search options (WIP)</h1>
      
      {error && <p>{error}</p>}

      {carersData && <CarersFilters filters={filters} setFilters={setFilters} carersData={carersData} setFilteredCarers={setFilteredCarers}  />}
      <Container className="carerList">
      {filteredCarers
        ?
        <>
        {/* Changed carersData with filteredCarers.map !! */}
          {filteredCarers.map(carer => {
            const { id, name, qualification, specialization, location, image } = carer
            return (
              <div className="carersDiv"  key={id}>
              <Link to={`/caregivers/${id}`} >
                <Card className="carers-card">
                  <Card.Body>
                    <img className="cardImg" loading="lazy" src={image ? image : catDoctor} alt={name} />
                    <Card.Text className="card-text">{name}, {location} <br /> {qualification} - {specialization} </Card.Text>
                    {isOwner && isOwner === taskData.owner && <button className='deletebtn' value={id} onClick={onAssign}>assign Task</button>
                      }                    
                  </Card.Body>
                </Card>
              </Link>
              </div>
            )
          })}
        </>
        :
        <LinearProgress color="secondary" />
      }
      </Container>
    </>
  )
}
export default CaregiversList