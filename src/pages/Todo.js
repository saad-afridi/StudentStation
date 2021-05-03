import React from 'react';

// Todo Components
import TodoList from '../components/TodoList/TodoList';
import AddTodo from '../components/TodoList/AddTodo';

// Material UI Components
import {Typography, Container, Grid} from '@material-ui/core'

// Material UI Icons
import ListIcon from '@material-ui/icons/List'

// Theme and Styling
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';


const styles = theme => ({
  header: {
      margin: "80px 0px 30px 0px",
      color: theme.palette.type === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
  }
});
 
class ToDoPage extends React.Component {

  constructor() {
    super();
    this.state = {
      todos: [],
    };
  }

  render() {
  const {classes} = this.props;
  
    return(
    <Container className="TodoContainer" >
      <Grid container spacing={3} direction="row" justify="center" alignItems="center" className={classes.header}>
        <Grid item> 
          <ListIcon style={{transform: 'scale(2.0)'}} /> 
        </Grid>
        <Grid item>
        <Typography variant="h3" component="div" align="left" className="TitleContainer"> 
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
    await this.setState({ todos: [{
      text: todo, 
      completed: false
    }, ...this.state.todos]});

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

ToDoPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToDoPage);
