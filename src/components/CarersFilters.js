import { useEffect } from 'react'

const CarersFilters = ({ filters, setFilters, carersData, setFilteredCarers }) => {

  // update the state for each input/select
  const handleChange = (event) => {
    const newObj = {
      ...filters,
      [event.target.name]: event.target.value
    }
    setFilters(newObj)
  }

  useEffect(() => {
   // trigger when the carersData are loaded and when a user updates one of the filters
    //if search or specializ. dropdown is updated, this will trigger and update the filteredCarers state
    const regexSearch = new RegExp(filters.searchLocation, 'i')

    const filteredArray = carersData.filter(carer => {
      return regexSearch.test(carer.location) && (carer.specialization === filters.specialization || filters.specialization === 'All')
    })
    console.log(filteredArray)
    setFilteredCarers(filteredArray)

  }, [filters, carersData])


  const specializations = [ ...new Set(carersData.map(carer => carer.specialization))]

  return (
    <div className="filters mb-4 mt-4 d-flex">
      {/* Region dropdown */}
      <select onChange={handleChange} name="specialization" value={filters.specialization}>
        <option value="All">All</option>
        { specializations.map(specialization => <option key={specialization} value={specialization}>{specialization}</option>)}
      </select>
      {/* Search field */}
      <input onChange={handleChange} type="text" name="searchLocation" value={filters.searchLocation} placeholder="Search in location" />
    </div>
  )
}

export default CarersFilters