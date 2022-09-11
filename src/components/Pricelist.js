import { Button, Container } from "@mui/material"
import * as React from 'react'



const Pricelist = () => {

  return (
    <Container>
      <h1> Pricelist: 1 chocolate bar/h </h1>
      
        <table class="table table-hover">
        <caption>Pricelist</caption>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">Type of service</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Homecare</td>
              <td>from 20£/hour</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Nurse</td>
              <td>from 35£/hour</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Radiology</td>
              <td>from 100£/visit</td>
            </tr>
            <tr>
              <th scope="row">4</th>
              <td>Blood sample collection</td>
              <td>from 40£/visit</td>
            </tr>
          </tbody>
        </table>

        <Button variant="outlined" type='submit' className='navigatebtn' href="/">Back to Home</Button>

    </Container>
  )
}
export default Pricelist