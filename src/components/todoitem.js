import React from 'react';
import DeleteIcon from '@material-ui/icons/Clear'
import { green, red } from '@material-ui/core/colors'
import { Grid, Typography, Button, Checkbox } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
      marginBottom: "35px"
    },

    text: {
        color: (props) => 
        !props.todo.completed
            ? '#3f50b5' : green[500], 
    }
});

class TodoItem extends React.Component {

    render() {
        const { classes, todo } = this.props;
        console.log(todo);

        return(
        <Grid container spacing={1} direction="row"  justify="space-between" alignItems="center" 
        className={'TodoItem' + (todo.completed ? ' completed': '')} > 
            <Grid item>
                <Checkbox checked={todo.completed ? true : false} 
                onChange={this.toggleTodo} style={{color: green[400]}}></Checkbox>
            </Grid>
            <Grid item xs={6} sm={8} md={10}>
                <Typography variant="h5" component="div" className={classes.text}>{todo.text}</Typography>
            </Grid>
            <Grid item style={{justifyContent: 'flex-end'}}>
                <Button variant='outlined' style={{color: red[400], borderColor: red[400]}} onClick={this.deleteTodo} > <DeleteIcon /> </Button>
            </Grid>
        </Grid>
        );
    }

    toggleTodo = () => {
        this.props.updateTodoFn(this.props.todo);
    }

    deleteTodo = () => {
        this.props.todo.text = '';
        this.props.updateTodoFn(this.props.todo);
        console.log(this.props.todo);
    }
}

TodoItem.propTypes = {
    classes: PropTypes.object.isRequired,
    todo: PropTypes.object.isRequired
};

export default withStyles(styles)(TodoItem);