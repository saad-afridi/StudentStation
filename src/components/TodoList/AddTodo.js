import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import { Grid, TextField, Fab } from '@material-ui/core'

const styles = theme => ({
    root: {
      marginBottom: "35px"
    },
});

class AddTodo extends React.Component {

    constructor() {
        super();
        this.state = {
            todo: ''
        };
    }

    render() {
        const {classes} = this.props;

        return(
        <form onSubmit={(e) => this.submitTodo(e)}>
            <Grid container spacing={1} direction="row" className={classes.root} justify="space-between" 
            alignItems="center">
                <Grid item xs={9} sm={10} md={11}>
                    <TextField variant="filled" label="Add a Task" fullWidth={true} id="add-task-input"
                    autoFocus={true} className={classes.textInput} onChange={(e) => this.updateInput(e)} > </TextField>  
                </Grid>
                <Grid item>
                    <Fab color="primary" onClick={(e) => this.submitTodo(e)}> <AddIcon /> </Fab>
                </Grid>
            </Grid>
        </form>
        )
    }

    updateInput = (e) => {
        this.setState({ todo: e.target.value });
    }

    submitTodo = (e) => {
        e.preventDefault();
        this.props.addToDoFn(this.state.todo);
        this.setState({ todo: ''});
        document.getElementById('add-task-input').value = '';
    }
}

AddTodo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddTodo);