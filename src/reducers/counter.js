const initialState = {
    toggle: true,
    counter : 0,
}


function counterReducer(state = initialState, action){
    switch(action.type) {
        case 'INCREMENT':
            return {...state, counter: state.counter + 1, payload: action.payload}
        default:
            return state
    }
}

export default counterReducer;