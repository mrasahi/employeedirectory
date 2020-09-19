import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ReactTable from "react-table-v6"
import 'react-table-v6/react-table.css'

const App = () => {

  // Employee State
  const [employeeState, setEmployeeState] = useState({
    employees: [],
    // React Table columns
    columns: [
      {
        Header: 'Photo',
        accessor: 'picture',
        Cell: props => <span className='number'>{props.value}</span>,
        filterable: false,
        sortable: false,
        minWidth: 15
      },
      {
        Header: 'Name',
        accessor: 'name',
        Cell: props => <span className='number'>{props.value}</span>,
        filterable: true
      },
      {
        Header: 'Email',
        accessor: 'email',
        Cell: props => <span className='number'>{props.value}</span>,
        filterable: true
      },
      {
        Header: 'Phone',
        accessor: 'phone',
        Cell: props => <span className='number'>{props.value}</span>,
        filterable: true
      },
      {
        Header: 'Address',
        accessor: 'address',
        Cell: props => <span className='number'>{props.value}</span>,
        filterable: true,
      }
    ]
  })

  // // For Debugging
  // employeeState.button = event => {
  //   console.log(employeeState.employees)
  // }

  // On page load function
  useEffect(() => {
    axios.get('https://randomuser.me/api?results=20')
      .then(({ data }) => {
        console.log(data.results)
        setEmployeeState({ ...employeeState, employees: data.results.map(individual => ({
          name: `${individual.name.first} ${individual.name.last}`,
          email: individual.email,
          phone: individual.phone,
          picture: <img src={individual.picture.thumbnail} alt={individual.name.first} />,
          address: `${individual.location.city}, ${individual.location.country}`
        }))
      })
      })
  }, [])

  return (
    <>
      <h1>Employee Directory</h1>
      {/* <button onClick={employeeState.button}>See States</button> */}
      <ReactTable
        data={employeeState.employees}
        columns={employeeState.columns}
        resolveData={data => data.map(row => row)}
        pageSizeOptions={[1, 5, 10, 15, 20]}
        filterable={true}
        defaultFilterMethod={
          (filter, row) => {
          const id = filter.pivotId || filter.id;
          return (
            row[id] !== undefined ?
              String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase())
            :
              true
          );
        }
      }
      />
    </>
  )
}

export default App