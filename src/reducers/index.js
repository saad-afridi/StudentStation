import todoReducers from './todoReducers'
import { combineReducers } from 'redux'

const allReducers = combineReducers({
    todoListState: todoReducers,
})

export default allReducers;
