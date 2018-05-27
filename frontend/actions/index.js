import userActions from './userActions'
import loginActions from './loginActions'
import itemActions from './itemActions'
import restaurantActions from './restaurantActions'

function resetErrorMessage () {
  return { type: 'RESET_ERROR_MESSAGE' }
}

export {
  resetErrorMessage,
  userActions,
  loginActions,
  itemActions,
  restaurantActions
}
