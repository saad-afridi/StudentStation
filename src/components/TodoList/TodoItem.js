import React from 'react';
import DeleteIcon from '@material-ui/icons/Clear'
import { green, red, grey } from '@material-ui/core/colors'
import { Grid, Typography, Checkbox, IconButton } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
      margin: "10px 0px 10px 0px",
      backgroundColor: grey[100],
      paddingRight: '5px',
    },

    text: {
        color: (props) => 
        !props.todo.completed
            ? grey[900] : grey[500], 
        textDecoration: (props) =>
        !props.todo.completed
            ? '' : 'line-through'
    }
});

class TodoItem extends React.Component {

    render() {
        const { classes, todo } = this.props;

        return(
        <Grid container spacing={1} direction="row"  justify="space-between" alignItems="center" 
        className={classes.root} > 
            <Grid item>
                <Checkbox checked={todo.completed ? true : false} 
                onChange={this.toggleTodo} style={{color: green[400]}}></Checkbox>
            </Grid>
            <Grid item xs={6} sm={8} md={10}>
                <Typography variant="h5" component="div" className={classes.text}>{todo.text}</Typography>
            </Grid>
            <Grid item style={{justifyContent: 'flex-end'}}>
                <IconButton variant='outlined' style={{color: red[400], borderColor: red[400]}} 
                onClick={this.deleteTodo} > <DeleteIcon /> </IconButton>
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