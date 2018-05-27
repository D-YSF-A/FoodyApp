import React, { Component } from 'react'

import axios from 'axios'
import AppHeader from './Header'
import { Button, Form, Container, Header, Message } from 'semantic-ui-react'


class RestaurantDetail extends Component {
  constructor () {
    super()
    this.state = {
      restaurant: {
        name: '',
        email: '',
        password: ''
      },
      errorName: '',
      errorEmail: '',
      errorPassword: ''
    }
    this.getRestaurantById = this.getRestaurantById.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeRestaurantById = this.removeRestaurantById.bind(this)
  }
  componentWillMount () {
    if(this.props.match.params.type == 'edit') {
      this.getRestaurantById(this.props.match.params.restaurantId)
    }
  }
  getRestaurantById (restaurantId) {
    axios.get('http://localhost:3000/restaurantById?id='+restaurantId)
        .then(response => this.setState({restaurant: response.data}))
        //.then(response => console.log(response))
  }
  removeRestaurantById (e,restaurantId) {
    e.preventDefault()
  	e.stopPropagation()
    axios.get('http://localhost:3000/restaurant/delete?id='+restaurantId)
        .then(this.props.history.push('/restaurants'))
  }

  validateFields(name, email, password){
    let hasErrors = false
    if(name.length <= 4) {
      this.setState({errorName:'Name must be larger then 4 chars'})
      hasErrors = true
    }
    if(password.length <= 4) {
      this.setState({errorPassword:'Password must be larger then 4 chars'})
      hasErrors = true
    }

    let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validateEmail= regex.test(email)
    if(!validateEmail){
      this.setState({errorEmail:'Email is not in valid format example@ius.ba'})
      hasErrors = true
    }
    return hasErrors
  }
  handleSubmit(e) {
    e.preventDefault()
  	e.stopPropagation()
    let name = e.target.name.value
    let email = e.target.email.value
    let password = e.target.password.value

    let hasErrors = this.validateFields(name,email,password)
    if(!hasErrors){
    if(this.props.match.params.type == 'edit') {
      axios.post('http://localhost:3000/restaurant/update', {restaurant: {
        'id': this.props.match.params.restaurantId,
        'name': name,
        'email': email,
        'password': password
      }}).then(response => this.setState({restaurant: response.data}))
    } else {
      axios.post('http://localhost:3000/restaurant/create', {restaurant: {
        'name': name,
        'email': email,
        'password': password
      }}).then(response => this.setState({restaurant: response.data}))
    }
  }
  }
  handleChange(event,field) {
    switch (field) {
      case 'name':
      this.setState(
        {restaurant: {
          name: event.target.value,
          email: this.state.restaurant.email,
          password: this.state.restaurant.password
        }});
        break;
      case 'email':
        this.setState(
          {restaurant: {
            name:  this.state.restaurant.name,
            email: event.target.value,
            password: this.state.restaurant.password
          }});
        break;
      case 'password':
        this.setState(
          {restaurant: {
            name:  this.state.restaurant.name,
            email: this.state.restaurant.email,
            password: event.target.value
          }});
        break;
      default:
      this.setState(
        {restaurant: {
          name: this.state.restaurant.name,
          email: this.state.restaurant.email,
          password: this.state.restaurant.password
        }});
        break;
    }
  }
  render () {
      return (
        <Container>
        <AppHeader />
         <Header as='h3'>Restaurant detail page for restaurant: {this.state.restaurant.name}</Header>

         <Form onSubmit={this.handleSubmit}>
          <Form.Field>
           <label>
            Name:
            <input type="text" name="name" required={true} value={this.state.restaurant.name} onChange={(e) => this.handleChange(e, 'name')} />
            </label>
            { this.state.errorName &&
              <Message
                color='red'
                header="Name field error"
                content={this.state.errorName }
              />
            }
          </Form.Field>
          <Form.Field>
           <label>
            Email:
            <input type="text" name="email" required={true} value={this.state.restaurant.email} onChange={(e) => this.handleChange(e, 'email')} />
           </label>
           { this.state.errorEmail &&
            <Message
            color='red'
              header="Email field error"
              content={this.state.errorEmail }
            />
          }
          </Form.Field>
          <Form.Field>
          <label>
           Password:
           <input type="password" name="password" required={true} value={this.state.restaurant.password} onChange={(e) => this.handleChange(e, 'password')} />
          </label>
          { this.state.errorPassword &&
           <Message
           color='red'
             header="Password field error"
             content={this.state.errorPassword }
           />
          }
          </Form.Field>
          <Button primary type='submit'>Submit</Button>
          <Button secondary className='button' onClick={(e) => this.removeRestaurantById(e, this.state.restaurant.id)}>Remove restaurant</Button>
         </Form>
         </Container>
     )
   }
 }
 export default RestaurantDetail
