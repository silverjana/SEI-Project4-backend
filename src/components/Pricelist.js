import { Button, Container } from "@mui/material"
import * as React from 'react'
import { Link } from "react-router-dom"


const Pricelist = () => {

  return (
    <section className="pricesPage">
      <h2>Pricelist</h2>
      
      <table className="table">
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
            <tr>
              <th scope="row">5</th>
              <td>Doctor</td>
              <td>from 50£/visit</td>
            </tr>
          </tbody>
        </table>

        <Link className='navigatebtn' to="/">Back to Home</Link>

    </section>
  )
}
export default Pricelist