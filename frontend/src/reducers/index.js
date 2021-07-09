import todoReducers from './todoReducers'
import { combineReducers } from 'redux'
import calcReducers from './calcReducers'
import authReducers from './authReducers'

const rootReducer = combineReducers({
    todoListState: todoReducers,
    calcState: calcReducers,
    authState: authReducers,
})

export default rootReducer;
