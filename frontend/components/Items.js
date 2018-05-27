import React, { Component } from 'react'
import { Link } from 'react-router-dom'
//import './App.css'
import Header from './Header'
import { Button, Form, Table, Container,  Checkbox, Feed, Icon } from 'semantic-ui-react'
import axios from 'axios'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { itemActions } from '../actions'


class ItemsComponent extends Component {
  constructor (props) {
    super()
    this.state = {
      items: []
    }

    this.props = props
    console.log(props)

    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentWillMount() {
    this.props.actions.fetchItemsByUserId(this.props.loginProps.user.id)
  }

  handleClick () {
    this.props.actions.fetchAllItems()
  }


  handleClear () {
    this.setState({items: []  })
  }

  handleSubmit(event) {
   event.preventDefault();
   let name = event.target.name.value
   let category = event.target.category.value
   console.log(`Name: ${name} and category ${category}`)
   if(name !== '') {
   axios.get('http://localhost:3000/item/name?name='+ name, { "name" : name } )
   .then(response => this.setState({items: response.data}))
      }
      else if(category !== '' && name === '') {
        axios.get('http://localhost:3000/item/category?category='+ category, { "category" : category } )
   .then(response => this.setState({items: response.data}))
  }
}

  render () {
    return (
      <Container>
      <Header />
      <Button primary className='button' onClick={this.handleClick}>Show all items</Button>
      <Button secondary className='button' onClick={this.handleClearClick}>Clear all items</Button>
      <br/><br/>
      <Form onSubmit={this.handleSubmit}>
       <Form.Field>
         <label htmlFor="name">Enter the name to search</label>
         <input id="name" type="text" name="name" />
       </Form.Field>
       <Form.Field>
         <label htmlFor="category">Enter the category to search</label>
         <input id="category" type="text" name="category" />
       </Form.Field>
       <Button type='submit'>Filter by name and category</Button>
      </Form>
      <br/>


      { this.props.item.items.map((item, key) => {
                return (
                    <Feed.Event>
                    <Feed.Content>
                    <Feed.Label>
                      <Icon name='pencil' />
                      <Feed.Summary date={item.name} user={item.category} content={item.description} />
                    </Feed.Label>
                    <Feed.Meta like={item.id} />
                    </Feed.Content>
                    </Feed.Event>
                  )
                 })
       }


      <Table celled padded>
        <Table.Header>
         <Table.Row>
          <Table.HeaderCell>Id</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Description</Table.HeaderCell>
          <Table.HeaderCell>category</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Action</Table.HeaderCell>
         </Table.Row>
        </Table.Header>
        <Table.Body>
         { this.props.item.items.map((item, key) => {
                   return (
                      <Table.Row key={key}>
                        <Table.Cell>{item.id}</Table.Cell>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>{item.description}</Table.Cell>
                        <Table.Cell>{item.category}</Table.Cell>
                        <Table.Cell>{item.price}</Table.Cell>
                        <Table.Cell><Link to={'/item/edit/'+item.id}>edit</Link></Table.Cell>
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
function mapStateToProps (state) {
  return {
    user: state.user,
    loginProps: state.loginProps,
    item: state.item
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      Object.assign(
        {},
        itemActions
      ),
      dispatch
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ItemsComponent)
