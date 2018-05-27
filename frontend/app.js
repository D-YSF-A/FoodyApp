import React from 'react'
import ReactDOM from 'react-dom'

import { connect } from 'react-redux'
import { resetErrorMessage } from './actions'

import UserGrid from './components/UserGrid'
import UserDetail from './components/UserDetail'
import Dashboard from './components/Dashboard'
import ItemsComponent from './components/Items'
import ItemDetail from './components/ItemDetail'
import RestaurantGrid from './components/UserGrid'
import RestaurantDetail from './components/UserDetail'
import LoginPage from './components/LoginPage'
import SignupPage from './components/SignupPage'


import { BrowserRouter, Route } from 'react-router-dom'

class App extends React.Component {
  constructor (props) {
    super()
    this.props = props
    console.log(props)
  }
  componentWillMount () {
    //call load session
  }

  render () {
    return (
      <BrowserRouter>
        <Route
          render={props => (
            <div>
            <Route location={location} path='/' exact component={Dashboard} />

            <Route location={location} path='/user/:type/:userId?' exact component={UserDetail} />

            {this.props.loginProps.logged &&
              <div>
                <Route location={location} path='/items' exact component={ItemsComponent} />
                <Route location={location} path='/item/:itemId' exact component={ItemDetail} />

                <Route location={location} path='/restaurants' exact component={ItemsComponent} />
                <Route location={location} path='/restaurant/:restaurantId' exact component={ItemDetail} />
              </div>}

            <Route location={location} path='/login' exact component={LoginPage} />
            <Route location={location} path='/signup' exact component={SignupPage} />


            </div>
          )}
        />
      </BrowserRouter>
    )
  }
}

export default connect(
  state => ({
    errorMessage: state.errorMessage,
    user: state.user,
    loginProps: state.loginProps}),
  { resetErrorMessage: resetErrorMessage}
)(App)
