function handleRestaurantActions (state, action) {
  switch (action.type) {
    case 'REQUEST_ALL_RESTAURANTS':
      return {
        isFetching: true,
        restaurant: []
      }
    case 'RECEIVE_ALL_RESTAURANTS':
      const restaurantDataAll = action.response.data
      return {
        isFetching: false,
        restaurant: restaurantDataAll
      }
    default:
      return state
  }
}

function restaurantReducer (state = {}, action) {
  return Object.assign({}, state, handleRestaurantActions(state, action))
}

export default restaurantReducer
