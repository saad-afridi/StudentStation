import todoReducers from './todoReducers'
import { combineReducers } from 'redux'
import calcReducers from './calcReducers'

const rootReducer = combineReducers({
    todoListState: todoReducers,
    calcState: calcReducers,
})

export default rootReducer;
