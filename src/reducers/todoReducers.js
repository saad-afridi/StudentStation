// <todos> is a list of <todo> obj that have 
// attributes text, completed

const initialState = {
    todos: [
        {
            text: "I love myself",
            completed: false,
        },{
            text: "I don't love myself",
            completed: true,
        }
    ],
}


export default function todoReducers(state=initialState, action) {
    switch(action.type) {
        case 'ADD-TODO':
            return {todos: [action.payload, ...state.todos]}

        case 'DELETE-TODO':
            console.log("I GET HERE!");
            return {todos: delTodo(state, action.payload)}

        case 'TOGGLE-TODO':
            return {todos: toggleTodo(state, action.payload)}

        default:
            return state
    };
}

const delTodo = (state, todo) => {
    return state.todos.filter(function(value) {
        return value.text !== todo.text;
    })
}

const toggleTodo = (state, todo) => {
    return state.todos.map(_todo => {
        if(todo === _todo) {
          return {
            ..._todo,
            completed: !todo.completed
          }
        }
        return _todo;
    })
}