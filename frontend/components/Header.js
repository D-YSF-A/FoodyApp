import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Segment, Button } from 'semantic-ui-react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userActions, loginActions } from '../actions'

class Header extends Component {
  constructor(props){
    super()
    this.props= props
    console.log(props)
    this.signOut = this.signOut.bind(this)
  }

  signOut () {
    this.props.actions.signOut()
    .then(this.props.history.push('/'))
  }

    render () {
      const user = this.props.loginProps.user !== undefined
      ? this.props.loginProps.user : {logged:false, email: ''}

      return (
        <Menu inverted>
          <Menu.Item>
            <Link to="/" >Home</Link>
          </Menu.Item>
          {this.props.loginProps.logged &&
          <Menu.Item>
            <Link to="/users">Restorants</Link>
          </Menu.Item>
          }
          {this.props.loginProps.logged &&
          <Menu.Item>
            <Link to="/items">Items</Link>
          </Menu.Item>
          }


          {!user.logged &&
            <Menu.Item position='right'>
              <Menu.Item position='right'>
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item position='right'>
                <Link to="/signup">Signup</Link>
              </Menu.Item>
            </Menu.Item>
          }
          {user.logged && user.email &&
            <Menu.Item position='right'>
            <Segment>
            {user.email}
              <Button secondary className='button' onClick={this.signOut}>SignOut</Button>
            </Segment>
          </Menu.Item>}
       </Menu>
     )
   }
 }
//  export default Header

 function mapStateToProps (state) {
  return {
    user: state.user,
    loginProps: state.loginProps
  }
}
const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      Object.assign(
        {},
        userActions,
        loginActions
      ),
      dispatch
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)
