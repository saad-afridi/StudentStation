// <todos> is a list of <todo> obj that have
// attributes text, completed

const getLocalTodos = () => {
  const localTodos = localStorage.getItem("todos");
  if (localTodos) {
    return JSON.parse(localTodos);
  }
  return [];
};

const initialState = {
  todos: getLocalTodos(),
};

export default function todoReducers(state = initialState, action) {
  switch (action.type) {
    case "ADD-TODO":
      saveData([action.payload, ...state.todos]);
      return { todos: [action.payload, ...state.todos] };

    case "DELETE-TODO":
      return { todos: delTodo(state, action.payload) };

    case "TOGGLE-TODO":
      return { todos: toggleTodo(state, action.payload) };

    default:
      return state;
  }
}

const delTodo = (state, todo) => {
  const newTodos = state.todos.filter(function (value) {
    return value.text !== todo.text;
  });
  saveData(newTodos);
  return newTodos;
};

const toggleTodo = (state, todo) => {
  const newTodos = state.todos.map((_todo) => {
    if (todo === _todo) {
      return {
        ..._todo,
        completed: !todo.completed,
      };
    }
    return _todo;
  });
  saveData(newTodos);
  return newTodos;
};

const saveData = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};
