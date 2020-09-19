import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactTable from "react-table-v6"
import 'react-table-v6/react-table.css'

const App = () => {

  // Employee State
  const [employeeState, setEmployeeState] = useState({
    employees: [],
    columns: [{
      Header: 'Name',
      accessor: 'name' // String-based value accessors!
    },
    {
      Header: 'Email',
      accessor: 'email',
      // Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
    },
    {
      Header: 'Phone',
      accessor: 'phone' // String-based value accessors!
    },
    {
      Header: 'Address',
      accessor: 'address' // String-based value accessors!
    }]

  })

  employeeState.button = event => {
    console.log(employeeState.employees)
  }


  useEffect(() => {
    axios.get('https://randomuser.me/api?results=20')
      .then(({ data }) => {
        console.log(data.results)
        // let employees = data.results.map(employee => ({
        //   name: `${employee.name.first} ${employee.name.last}`,
        //   email: employee.email,
        //   phone: employee.phone,
        //   address: `${employee.location.city}, ${employee.location.country}`
        // }))
        // setEmployeeState({ employees })
        setEmployeeState({ employees: data.results.map(individual => ({
          name: `${individual.name.title} ${individual.name.first} ${individual.name.last}`,
          email: individual.email,
          phone: individual.phone,
          // picture: individual.picture.thumbnail,
          address: `${individual.location.city}, ${individual.location.country}`
        }))
      })
      })
  }, [])

  return (
    <>
      <h1>Employee Directory</h1>
      <button onClick={employeeState.button}>See States</button>
      <ReactTable
        data={employeeState.employees}
        columns={employeeState.columns}
      />
    </>
  )
}

export default App