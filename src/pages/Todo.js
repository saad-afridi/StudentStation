import React from 'react';
import TodoList from '../components/TodoList';
import AddTodo from '../components/AddTodo';
import {Typography, Container, Grid} from '@material-ui/core'
import ListIcon from '@material-ui/icons/List'
import './styles.css'

class ToDoPage extends React.Component {
  
  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  render() {
    return(
    <Container className="AppContainer" >
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
      <Grid container spacing={3} direction="row" justify="flex-end" alignItems="center">
        <Grid item> 
          <ListIcon color="primary" style={{transform: 'scale(2.0)'}} /> 
        </Grid>
        <Grid item xs={9} sm={8} md={7}>
        <Typography variant="h3" component="div" color="primary" align="left" className="TitleContainer"> 
        What To Do?
        </Typography>
        </Grid>
      </Grid>
      
      <AddTodo addToDoFn = {this.addTodo}> </AddTodo>
      <TodoList updateTodoFn = {this.updateTodo} todos={this.state.todos}> </TodoList>
    </Container>
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
