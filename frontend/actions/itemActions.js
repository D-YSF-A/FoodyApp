// import { fetchDispatch } from './fetchUtils'
import axios from 'axios'
const routeByUserId = 'user/items'
const routeByRestaurantId = 'restaurant/items'
const routeAllItems = 'items'
const url = 'http://localhost:3000/'
const apiProps = {
  url: '',
  params: {},
  types: {
    request: '',
    receive: ''
  }
}

function shouldFetchData ({ item }) {
  return !item.items || !item.isFetching
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

function fetchItemsByUserId (id) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiProps.url = url + routeByUserId
      apiProps.types.request = 'REQUEST_ITEMS_BY_USER'
      apiProps.types.receive = 'RECEIVE_ITEMS_BY_USER'
      apiProps.params = { userId: id}
      return dispatch(fetchDispatch(apiProps))
    }
  }
}

function fetchItemsByRestaurantId (id) {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiProps.url = url + routeByRestaurantId
      apiProps.types.request = 'REQUEST_ITEMS_BY_RESTAURANT'
      apiProps.types.receive = 'RECEIVE_ITEMS_BY_RESTAURANT'
      apiProps.params = { userId: id}
      return dispatch(fetchDispatch(apiProps))
    }
  }
}

function fetchAllItems () {
  return (dispatch, getState) => {
    if (shouldFetchData(getState())) {
      apiProps.url = url + routeAllItems
      apiProps.types.request = 'REQUEST_ALL_ITEMS'
      apiProps.types.receive = 'RECEIVE_ALL_ITEMS'
      return dispatch(fetchDispatch(apiProps))
    }
  }
}


export default { fetchItemsByUserId, fetchItemsByRestaurantId, fetchAllItems }
