import React from 'react';

// Redux 
import { useSelector } from 'react-redux';

// Todo Components
import TodoList from '../components/TodoList/TodoList';
import AddTodo from '../components/TodoList/AddTodo';
import PageTitle from '../components/PageTitle'

// Material UI Components
import { Container } from '@material-ui/core'

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

function GetTodos() {
  const state = useSelector(state => state.todos);
  console.log("What's happening", state);
  return state;
}

class ToDoPage extends React.Component {

  // constructor() {
  //   super();
  //   this.state = {
  //     todos: [],
  //   };
  // }

  componentDidMount = () => {
    const todos = localStorage.getItem('todos');
    if (todos) {
      const savedTodos = JSON.parse(todos);
      this.setState({ todos: savedTodos });
    }
  }

  render() {
    const todos = GetTodos()

    return(
    <Container className="TodoContainer" >
      <PageTitle text={"What To Do?"} icon={<ListIcon style={{transform: 'scale(2.0)'}} />} />
      <AddTodo addToDoFn = {this.addTodo}> </AddTodo>
      <TodoList updateTodoFn = {this.updateTodo} todos={this.state.todos}> </TodoList>
    </Container>
    )
  }
  
  // addTodo = async (todo) => {

  //   if (todo.length === 0) {
  //     return;
  //   }
  //   // Don't let them add repeated task with same name
  //   for (let i = 0; i < this.state.todos.length; i++) {
  //     if (this.state.todos[i].text === todo) {
  //       return;
  //     }
  //   }

  //   // Update todo lists
  //   await this.setState({ todos: [{
  //     text: todo, 
  //     completed: false
  //   }, ...this.state.todos]});

  //   // Hold in storage
  //   localStorage.setItem('todos', JSON.stringify(this.state.todos));

  //   // Reset the text, shouldn't be needed when checking for repetition
  //   todo = '';
  // }


  // updateTodo = async (todo) => {
  //   let newTodos;
  //   // Delete the item
  //   if (todo.text === '') {
  //      newTodos = this.state.todos.filter(function(value) {
  //       return value.text !== '';
  //     });
  //   }
  //   else {
  //     // Else change complete status
  //     newTodos = this.state.todos.map(_todo => {
  //       if(todo === _todo) {
  //         return {
  //           text: todo.text,
  //           completed: !todo.completed
  //         }
  //       }
  //       return _todo;
  //     });
  //   }
  //   await this.setState({ todos: newTodos});
  //   localStorage.setItem('todos', JSON.stringify(this.state.todos));
  // }
}

ToDoPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToDoPage);
