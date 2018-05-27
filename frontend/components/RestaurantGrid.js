import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import './App.css'
import Header from './Header'
import axios from 'axios'
import { Button, Form, Table, Container } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { restaurantActions } from '../actions'

class RestaurantGrid extends Component {
  constructor (props) {
    super()
    this.state = {
      restaurants: []
    }
    this.props = props
    console.log(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClick () {
    this.props.actions.fetchRestaurants()//.then(response => this.setState({restaurants: response.data}))
    // axios.get('http://localhost:3000/restaurants')
    //     .then(response => this.setState({restaurants: response.data}))
    //     //.then(response => console.log(response))
  }

  handleClear () {
    this.setState({restaurants: []  })
  }

  handleSubmit(event) {
   event.preventDefault();
   let name = event.target.name.value
   console.log(name)
  axios.get('http://localhost:3000/restaurantByName?name='+ name, { "name" : name } )
     .then(response => this.setState({restaurants: response.data}))
 }

  render () {
    return (
      <Container>
      <Header />
       <Button primary className='button' onClick={this.handleClick}>Show all restaurants</Button>
       <Button secondary><Link to={'/restaurant/create'}>Add New Restaurant</Link></Button>
       <br/><br/>
       <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label htmlFor="name">Enter the name to search</label>
          <input id="name" type="text" name="name" />
        </Form.Field>
        <Button type='submit'>Filter by name</Button>
       </Form>
       <br/>
       <Table celled padded>
        <Table.Header>
         <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Token</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
         </Table.Row>
        </Table.Header>
        <Table.Body>
         { this.props.restaurants.map((restaurant, key) => {
                   return (
                      <Table.Row key={key}>
                        <Table.Cell>{restaurant.id}</Table.Cell>
                        <Table.Cell>{restaurant.name}</Table.Cell>
                        <Table.Cell>{restaurant.email}</Table.Cell>
                        <Table.Cell>{restaurant.token}</Table.Cell>
                        <Table.Cell><Link to={'/restaurant/edit/'+restaurant.id}>edit</Link></Table.Cell>
                      </Table.Row>
                    )
                   })
         }
         </Table.Body>
        </Table>
       </Container>
    )
  }
}
const mapStateToProps = ({restaurant}) => restaurant
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      Object.assign(
        {},
        restaurantActions
      ),
      dispatch
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RestaurantGrid)
