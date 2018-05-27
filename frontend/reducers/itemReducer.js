function handleItemActions (state, action) {
  switch (action.type) {
    case 'REQUEST_ITEMS_BY_USER':
      return {
        isFetching: true,
        items: []
      }
    case 'RECEIVE_ITEMS_BY_USER':
      const allItemsByUser = action.response.data
      return {
        isFetching: false,
        items: allItemsByUser
      }
    case 'REQUEST_ITEMS_BY_RESTAURANT':
        return {
          isFetching: true,
          items: []
      }
    case 'RECEIVE_ITEMS_BY_RESTAURANT':
      const allItemsByRestaurant = action.response.data
      return {
        isFetching: false,
        items: allItemsByUser
      }
    case 'REQUEST_ALL_ITEMS':
      return {
        isFetching: true,
        items: []
      }
    case 'RECEIVE_ALL_ITEMS':
      const allItems = action.response.data
      return {
        isFetching: false,
        items: allItems
      }

    default:
      return state
  }
}

function itemReducer (state = {}, action) {
  return Object.assign({}, state, handleItemActions(state, action))
}

export default itemReducer
