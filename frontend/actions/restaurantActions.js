// import { fetchDispatch } from './fetchUtils'
import axios from 'axios'
const route = 'restaurants'
const url = 'http://localhost:3000/'
const apiProps = {
  url: '',
  params: {},
  types: {
    request: 'REQUEST_ALL_RESTAURANTS',
    receive: 'RECEIVE_ALL_RESTAURANTS'
  }
}

function shouldFetchData ({ restaurant }) {
  return !restaurant.restaurants || !restaurant.isFetching
}

function fetchDispatch (opts) {
  return dispatch => {
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
      }
    }
    dispatch({ type: opts.types.request }, config)
    return axios
      .get(opts.url, {
        params: opts.params
      })
      .then(response => {
        // Dispatch the recevied action with type and data
        const obj = opts.onReceived ? opts.onReceived(response) : { response }
        return dispatch(Object.assign({ type: opts.types.receive }, obj))
      })
      .catch(error => dispatch({ type: 'RESET_ERROR_MESSAGE' }))
  }
}

function fetchRestaurants () {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiProps.url = url + route
      return dispatch(fetchDispatch(apiProps))
    }
  }
}

export default { fetchRestaurants }
