import { combineReducers } from 'redux'
import todoReducers from './todoReducers'
import calcReducers from './calcReducers'
import authReducers from './authReducers'
import authErrorsReducers from './authErrorsReducers'

const rootReducer = combineReducers({
    todoListState: todoReducers,
    calcState: calcReducers,
    authState: authReducers,
    authErrorsState: authErrorsReducers,
})

export default rootReducer;
