import todoReducers from './todoReducers'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    todos: todoReducers,
})

export default allReducers;
