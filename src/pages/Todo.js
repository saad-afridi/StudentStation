import React from 'react';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';

const icon_title = <FontAwesomeIcon icon={faClipboardList} />;

class ToDoPage extends React.Component {
  
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  render() {
    return(
    <div className="AppContainer"> 
      <div className="TitleContainer"> 
      <h1> { icon_title } What To Do? </h1>
      </div>
      <AddTodo addToDoFn = {this.addTodo}> </AddTodo>
      <TodoList updateTodoFn = {this.updateTodo} todos={this.state.todos}> </TodoList>
    </div>
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

    if (todo.length === 0) {
      return;
    }
    // Don't let them add repeated task with same name
    for (let i = 0; i < this.state.todos.length; i++) {
      if (this.state.todos[i].text === todo) {
        return;
      }
    }

    // Update todo lists
    await this.setState({ todos: [...this.state.todos, {
      text: todo, 
      completed: false
    }]});

    // Hold in storage
    localStorage.setItem('todos', JSON.stringify(this.state.todos));

    // Reset the text, shouldn't be needed when checking for repetition
    todo = '';
  }


  updateTodo = async (todo) => {
    let newTodos;
    // Delete the item
    if (todo.text === '') {
       newTodos = this.state.todos.filter(function(value) {
        return value.text !== '';
      });
    }
    else {
      // Else change complete status
      newTodos = this.state.todos.map(_todo => {
        if(todo === _todo) {
          return {
            text: todo.text,
            completed: !todo.completed
          }
        }
        return _todo;
      });
    }
    await this.setState({ todos: newTodos});
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
  }
}

export default ToDoPage;
