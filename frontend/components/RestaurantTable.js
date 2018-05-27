import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'

class RestaurantTable extends Component {
  constructor () {
    super()
    this.state = {
      restaurants: []
    }

    render () {
      return (
      <Table >
       <Table.Header>
        <Table.Row>
         <Table.HeaderCell>Id</Table.HeaderCell>
         <Table.HeaderCell>Name</Table.HeaderCell>
         <Table.HeaderCell>Email</Table.HeaderCell>
         <Table.HeaderCell>Action</Table.HeaderCell>
        </Table.Row>
       </Table.Header>
       <Table.Body>
        { this.state.restaurants.map((restaurant, key) => {
                  return (
                     <Table.Row key={key}>
                       <Table.Cell>{restaurant.id}</Table.Cell>
                       <Table.Cell>{restaurant.name}</Table.Cell>
                       <Table.Cell>{restaurant.email}</Table.Cell>
                       <Table.Cell><Link to={'/restaurant/edit/'+restaurant.id}>edit</Link></Table.Cell>
                     </Table.Row>
                   )
                  })
        }
        </Table.Body>
       </Table>
     )
   }
 }
 export default RestaurantTable
