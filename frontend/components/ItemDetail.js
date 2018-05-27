import React, { Component } from 'react'

import axios from 'axios'
import Header from './Header'

class ItemDetail extends Component {
  constructor () {
    super()
    this.state = {
      item: {
        name: '',
        description: '',
        category: '',
        price: '',

      }
    }
    this.getItemById = this.getItemById.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentWillMount () {
    this.getItemById(this.props.match.params.itemId)
  }
  getItemById (itemId) {
    axios.get('http://localhost:3000/item/id/?id='+itemId)
        .then(response => this.setState({item: response.data}))
        //.then(response => console.log(response))
  }
  handleSubmit(e) {
    e.preventDefault()
  	e.stopPropagation()
    let name = e.target.name.value
    let description = e.target.description.value
    let category = e.target.category.value
    let price = e.target.price.value

    axios.post('http://localhost:3000/item/update', {item: {
      'id': this.props.match.params.itemId,
      'name': name,
      'description': description,
      'category': category,
      'price': price
    }}).then(response => this.setState({item: response.data}))
  }
  handleChange(event,field) {
    switch (field) {
      case 'name':
      this.setState(
        {item: {
          name: event.target.value,
          description: this.state.item.description,
          category: this.state.item.category,
          price : this.state.item.price
        }});
        break;
      case 'description':
        this.setState(
          {item: {
            name:  this.state.item.name,
            description: event.target.value,
            category: this.state.item.category,
            price : this.state.item.price
          }});
        break
      case 'category':
        this.setState(
          {item: {
            name:  this.state.item.name,
            description: this.state.item.description,
            category: event.target.value,
            price : this.state.item.price
          }});
        break;
      case 'price':
        this.setState(
          {item: {
            name:  this.state.item.name,
            description: this.state.item.description,
            category: this.state.item.category,
            price : event.target.value
          }});
        break
      default:
      this.setState(
        {item: {
          name: this.state.item.name,
          description: this.state.item.description,
          category: this.state.item.category,
          price : this.state.item.price
        }});
        break;
    }
  }
  render () {
      return (
        <div>
        <Header />
         <h3>Items detail page for specific item: name :{this.state.item.name}</h3>
         <h3>description {this.state.item.description}</h3>
         <h3>category {this.state.item.category}</h3>
         <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={this.state.item.name} onChange={(e) => this.handleChange(e, 'name')} />
          </label>
          <br/>
          <label>
            Description:
            <input type="text" name="description" value={this.state.item.description} onChange={(e) => this.handleChange(e, 'description')} />
          </label>
          <label>
          category:
          <input type="text" name="category" value={this.state.item.category} onChange={(e) => this.handleChange(e, 'category')} />
        </label>
          <br/>
          <input type="submit" value="Submit" />
         </form>
        </div>
     )
   }
 }
 export default ItemDetail
