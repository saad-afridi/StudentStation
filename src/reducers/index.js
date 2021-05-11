import todoReducers from './todoReducers'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    todoListState: todoReducers,
})

export default rootReducer;
