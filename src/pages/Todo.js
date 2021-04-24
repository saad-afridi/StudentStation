import React from 'react';
import TodoList from '../components/todolist';
import AddTodo from '../components/addtodo';
import './Todo.css';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      todos: []
    };
  }

  render() {
    return(
    <>
    <head>
    <script src="https://kit.fontawesome.com/8a17ba31bf.js" crossorigin="anonymous"></script>
    <title> TODO List </title>
    </head>
    
    
    <div className="AppContainer"> 
      <div className="TitleContainer"> 
      <h1> TODO List </h1>
      </div>
      <AddTodo addToDoFn = {this.addTodo}> </AddTodo>
      <TodoList updateTodoFn = {this.updateTodo} todos={this.state.todos}> </TodoList>
    </div>
    </>
    )
  }

  componentDidMount = () => {
    const todos = localStorage.getItem('todos');
    if (todos) {
      const savedTodos = JSON.parse(todos);
      this.setState({ todos: savedTodos });
    }
    else {
      console.log('No todos');
    }
  }

  addTodo = async (todo) => {
    if (todo === '') {
      return;
    }
    await this.setState({ todos: [...this.state.todos, {
      text: todo, 
      completed: false
    }]});
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
    console.log(localStorage.getItem('todos'));
    todo = '';
  }

  updateTodo = async (todo) => {
    const newTodos = this.state.todos.map(_todo => {
      if(todo === _todo) {
        return {
          text: todo.text,
          completed: !todo.completed
        }
      }
      else {
        return _todo
      }
    });

    await this.setState({ todos: newTodos});
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }
}

export default App;
