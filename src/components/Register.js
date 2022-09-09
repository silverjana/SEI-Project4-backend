import { useState } from "react"
//import { Link, useNavigate } from 'react-router-dom'

import { Container } from "@mui/material"
import { Button, Box, TextField, InputAdornment, Stack } from "@mui/material"


import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const Register = () => {
  //select which user to register as
  const [type, setType] = useState(parseInt('7'))

  const changeType = event => {
    setType(parseInt(event.target.value))
    //console.log(type)
  }
  //get / set data values
  const [data, setData] = useState({
    //rrquired
    name: "",
    email: "",
    password: "",
    password_confirmed: "",
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
  })

  const handleChange = (event) => {
    console.log(event.target)
  }

  const [error, setError] = useState('')


  const onSubmit = () => {
    console.log('submitted')
  }


  return (
    <Box className="FormPage">
      <h1> register </h1>
      <Button variant="outlined" color="secondary" value='7' onClick={changeType}>User</Button>
      <Button variant="outlined" color="secondary" value='8' onClick={changeType}>healthcare professional</Button>

      {type === 8
        ?
        <Container className="authform"> <h2>Healthcare Professional Registration</h2>

          <form className="form" onSubmit={onSubmit}>
            <Stack spacing={2}>
              <TextField required error={error ? true : false} className="form-input" variant="filled" name='name' label="Name" value={data.name} onChange={handleChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" name='email' label="Email" value={data.email} onChange={handleChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" type="password" name='password' label="Password" value={data.password} onChange={handleChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" type="password" name='password_confirmed' label="Confirm Password" value={data.password_confirmed} onChange={handleChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" name='date_of_birth' label="Date of birth" value={data.date_of_birth} onChange={handleChange} />
              <RadioGroup row name="row-radio-buttons-group">
                <FormControlLabel value="female" control={<Radio color="secondary" />} label="Female" />
                <FormControlLabel value="male" control={<Radio color="secondary" />} label="Male" />
                <FormControlLabel value="other" control={<Radio color="secondary" />} label="Other" />
              </RadioGroup>
              <TextField multiline rows={3} className="form-input" variant="filled" name='health_status' label="Health status" value={data.health_status} onChange={handleChange} />
              <TextField multiline rows={2} className="form-input" variant="filled" name='allergies' label="Evt. Allergies" value={data.allergies} onChange={handleChange} />

              <TextField className="form-input" variant="filled" startAdornment={<InputAdornment position="start">$</InputAdornment>} name='contact' label="Contact number" value={data.contact} onChange={handleChange} />
              <TextField className="form-input" variant="filled" name='emergency_contact' label="Emergency Contact" value={data.emergency_contact} onChange={handleChange} />
              <TextField className="form-input" variant="filled" name='em_contact_relationship' label="Emergency Contact Relationship" value={data.em_contact_relationship} onChange={handleChange} />
              <TextField className="form-input" variant="filled" name='location' label="Address" value={data.location} onChange={handleChange} />

              {error && <div className='error-mex'>{error}</div>}
              <input type="submit" value="Register" className='submitbtn' />
            </Stack>
          </form>
        </Container>
        :
        <Container className="authform"><h2>User Registration</h2>
          <form className="form" onSubmit={onSubmit}>
            <Stack spacing={2}>
              <TextField required error={error ? true : false} className="form-input" variant="filled" name='name' label="Name" value={data.name} onChange={handleChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" name='email' label="Email" value={data.email} onChange={handleChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" type="password" name='password' label="Password" value={data.password} onChange={handleChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" type="password" name='password_confirmed' label="Confirm Password" value={data.password_confirmed} onChange={handleChange} />
              <TextField required error={error ? true : false} className="form-input" variant="filled" name='date_of_birth' label="Date of birth" value={data.date_of_birth} onChange={handleChange} />
              <RadioGroup row name="row-radio-buttons-group">
                <FormControlLabel value="female" control={<Radio color="secondary" />} label="Female" />
                <FormControlLabel value="male" control={<Radio color="secondary" />} label="Male" />
                <FormControlLabel value="other" control={<Radio color="secondary" />} label="Other" />
              </RadioGroup>
              <TextField multiline rows={3} className="form-input" variant="filled" name='health_status' label="Health status" value={data.health_status} onChange={handleChange} />
              <TextField multiline rows={2} className="form-input" variant="filled" name='allergies' label="Evt. Allergies" value={data.allergies} onChange={handleChange} />

              <TextField className="form-input" variant="filled" startAdornment={<InputAdornment position="start">$</InputAdornment>} name='contact' label="Contact number" value={data.contact} onChange={handleChange} />
              <TextField className="form-input" variant="filled" name='emergency_contact' label="Emergency Contact" value={data.emergency_contact} onChange={handleChange} />
              <TextField className="form-input" variant="filled" name='em_contact_relationship' label="Emergency Contact Relationship" value={data.em_contact_relationship} onChange={handleChange} />
              <TextField className="form-input" variant="filled" name='location' label="Address" value={data.location} onChange={handleChange} />

              {error && <div className='error-mex'>{error}</div>}
              <input type="submit" value="Register" className='submitbtn' />
            </Stack>
          </form>
        </Container>
      }



    </Box>
  )
}
export default Register