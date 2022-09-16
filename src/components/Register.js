import { useState } from "react"
import { useNavigate } from 'react-router-dom'

import { Container } from "@mui/material"
import { Button, Box, TextField, Stack, FormLabel } from "@mui/material"

import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import UploadImage from "./UploadImage";

import { API_URL } from '../config'

import axios from "axios"

const Register = () => {

  const navigate = useNavigate()

  //select which user to register as
  const [type, setType] = useState(parseInt('7'))

  const changeType = event => {
    setType(parseInt(event.target.value))
    //console.log(type)
  }

  // -- PATIENT DATA --

  //get / set patient data values
  const [patientData, setPatientData] = useState({
    //required
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    meta: {
      name: "",
      date_of_birth: "",
      gender: "",
      //nullable:
      health_status: "",
      allergies: "",
      contact: "",
      emergency_contact: "",
      em_contact_relationship: "",
      //required
      location: "",
      is_medic: false
    }
  })

  const handlePatientChange = (event) => {
    const newObj = {
      ...patientData
    }
    console.log('before', newObj)
    const name = event.target.name
    if (name === 'password' || name === 'email' || name === 'password_confirmation' || name === 'username') {
      newObj[name] = event.target.value
    } else {
      newObj.meta[name] = event.target.value
    }
    console.log(newObj)
    setPatientData(newObj)
    console.log(event.target)
    setError('')
  }

  const onPatientSubmit = async (event) => {
    event.preventDefault()
    console.log('submitted patient', patientData)

    try {
      //API req POST to register
      await axios.post(`http://127.0.0.1:8000/auth/register/${type}/`, patientData)
      //go to 
      navigate("/login")

    } catch (error) {
      console.log(error.response)
      setError('Please check your input', error.response.data)
    }

  }

  //  --  CAREGIVER  --  

  //--- import picture from upload --

  const [imageData, setImageData] = useState('')
  console.log('image:', imageData.image)

  //get / set patient data values
  const [carerData, setCarerData] = useState({
    //required
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
    meta: {
      name: "",
      qualification: "", //enum 
      specialization: "", //enum
      //nullable:
      image: imageData.image,
      bio: "",
      education: "",

      //required
      location: "",
      //is_medic: false
    }
  })

  const handleCarerChange = (event) => {
    const newObj = {
      ...carerData
    }

    const name = event.target.name
    if (name === 'password' || name === 'email' || name === 'password_confirmation' || name === 'username') {
      newObj[name] = event.target.value
    } else {
      newObj.meta[name] = event.target.value
    }
    console.log(newObj)
    setCarerData(newObj)
    console.log(event.target)
    setError('')
  }


  const onCarerSubmit = async (event) => {
    event.preventDefault()
    try {
      //API req POST to register
      console.log('carer data just before sending', carerData)
      await axios.post(`http://127.0.0.1:8000/auth/register/${type}/`, carerData)
      //go to 
      navigate("/login")

    } catch (error) {
      console.log(error)
      setError(error.response)
    }
  }

  // -- ERRORS --

  const [error, setError] = useState('')






  return (
    <section className="authPage">
      <h2> Register as user or as healthcare professional:</h2>
      <div className="regButtons">
        <Button variant="outlined" color="secondary" value='7' onClick={changeType}>User</Button>
        <Button variant="outlined" color="secondary" value='8' onClick={changeType}>Healthcare professional</Button>
      </div>
      {type === 8
        ?
        <Container className="authform"> <h3>Healthcare Professional Registration:</h3>

          <form className="form" onSubmit={onCarerSubmit}>
            <Stack spacing={2}>
              <TextField required error={error ? true : false} className="form-input" variant="filled" name='name' label="Name" value={carerData.name} onChange={handleCarerChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" name='username' label="Username" value={carerData.username} onChange={handleCarerChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" name='email' label="Email" value={carerData.email} onChange={handleCarerChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" type="password" name='password' label="Password" value={carerData.password} onChange={handleCarerChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" type="password" name='password_confirmation' label="Confirm Password" value={carerData.password_confirmation} onChange={handleCarerChange} />
              <FormLabel>Qualification</FormLabel>
              <RadioGroup required row name="row-radio-buttons-group" onChange={handleCarerChange} value={carerData.meta.qualification}>
                <FormControlLabel value="homecare" name="qualification" control={<Radio color="secondary" />} label="Homecare" />
                <FormControlLabel value="technician" name="qualification" control={<Radio color="secondary" />} label="Technician" />
                <FormControlLabel value="nurse" name="qualification" control={<Radio color="secondary" />} label="Nurse" />
                <FormControlLabel value="doctor" name="qualification" control={<Radio color="secondary" />} label="Doctor" />
              </RadioGroup>
              <FormLabel >Specialization</FormLabel>
              <RadioGroup required row name="row-radio-buttons-group" onChange={handleCarerChange} value={carerData.meta.specialization}>
                <FormControlLabel value="homecare" name="specialization" control={<Radio color="secondary" />} label="Homecare" />
                <FormControlLabel value="phlebotomist" name="specialization" control={<Radio color="secondary" />} label="Phlebotomist" />
                <FormControlLabel value="x_rays" name="specialization" control={<Radio color="secondary" />} label="X-rays" />
                <FormControlLabel value="nurse" name="specialization" control={<Radio color="secondary" />} label="Nurse" />
                <FormControlLabel value="ENT" name="specialization" control={<Radio color="secondary" />} label="Otolaryngologist" />
              </RadioGroup>

              {/* <TextField className="form-input" variant="filled" name='image' label="Image CLOUDINARY" value={carerData.meta.image} onChange={handleCarerChange} /> */}

              <UploadImage name='image' setCarerData={setCarerData} carerData={carerData} />

              <TextField multiline rows={2} className="form-input" variant="filled" name='bio' label="About you" value={carerData.meta.bio} onChange={handleCarerChange} />

              <TextField className="form-input" variant="filled" name='education' label="Education" value={carerData.meta.education} onChange={handleCarerChange} />

              <TextField required error={error ? true : false} className="form-input" variant="filled" name='location' label="Area" value={carerData.meta.location} onChange={handleCarerChange} />

              {error && <div className='error-mex'>{error}</div>}
              <input type="submit" value="Register" className='submitbtn' />
            </Stack>
          </form>
        </Container>
        :
        <Container className="authform"><h3>User Registration:</h3>
          <form className="form" onSubmit={onPatientSubmit}>
            <Stack>
              <TextField required error={error ? true : false} className="form-input" variant="filled" name='name' label="Name" value={patientData.meta.name} onChange={handlePatientChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" name='username' label="Username" value={patientData.meta.username} onChange={handlePatientChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" name='email' label="Email" value={patientData.email} onChange={handlePatientChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" type="password" name='password' label="Password" value={patientData.password} onChange={handlePatientChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" type="password" name='password_confirmation' label="Confirm Password" value={patientData.password_confirmation} onChange={handlePatientChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" type='date' name='date_of_birth' label="Date of birth" value={patientData.meta.date_of_birth} onChange={handlePatientChange} />
              <FormLabel required id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup row name="row-radio-buttons-group" onChange={handlePatientChange} value={patientData.meta.gender}>
                <FormControlLabel value="female" name="gender" control={<Radio color="secondary" />} label="Female" />
                <FormControlLabel value="male" name="gender" control={<Radio color="secondary" />} label="Male" />
                <FormControlLabel value="other" name="gender" control={<Radio color="secondary" />} label="Other" />
              </RadioGroup>

              <TextField multiline rows={3} className="form-input" variant="filled" name='health_status' label="Health status" value={patientData.meta.health_status} onChange={handlePatientChange} />
              <TextField multiline rows={2} className="form-input" variant="filled" name='allergies' label="Evt. Allergies" value={patientData.meta.allergies} onChange={handlePatientChange} />

              <TextField className="form-input" variant="filled" name='contact' label="Contact number" value={patientData.meta.contact} onChange={handlePatientChange} />
              <TextField className="form-input" variant="filled" name='emergency_contact' label="Emergency Contact" value={patientData.meta.emergency_contact} onChange={handlePatientChange} />
              <TextField className="form-input" variant="filled" name='em_contact_relationship' label="Emergency Contact Relationship" value={patientData.meta.em_contact_relationship} onChange={handlePatientChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" name='location' label="Address - city and neighbourhood" value={patientData.meta.location} onChange={handlePatientChange} />

              {error && <div className='error-mex'>{error}</div>}
              <button type='submit' className='submitbtn' >Register</button>
            </Stack>
          </form>
        </Container>
      }

    </section>
  )
}
export default Register