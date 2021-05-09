import React, { Component } from 'react'

// Material UI Components
import { Grid, TextField, Fab} from '@material-ui/core'

// Material UI Icons
import AddIcon from '@material-ui/icons/Add';

// Theme and Styling
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {
      marginBottom: "35px"
    },
});

class AddCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            course : {
                name: "",
            },
        };
    }
    

    render() {
        const {classes} = this.props;

        return (
        <form onSubmit={this.submitCourse}>
            <Grid container spacing={1} direction="row" className={classes.root} justify="space-between" 
            alignItems="center">
                <Grid item xs={9} sm={10} md={11}>
                    <TextField variant="filled" label="Course Name" fullWidth={true} id="add-course"
                    autoFocus={true} className={classes.textInput} onChange={this.updateName} > </TextField>  
                </Grid>
                <Grid item>
                    <Fab color="primary" onClick={this.submitCourse}> <AddIcon /> </Fab>
                </Grid>
            </Grid>
        </form>
        )
    }

    updateName = (e) => {
        this.setState({course: { name: e.target.value}});
    }

    submitCourse = (e) => {
        e.preventDefault();
        this.props.AddCourseFn(this.state.course);
        this.setState({course : { name: ""}});
        document.getElementById("add-course").value = "";
    }
}

AddCourse.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AddCourse);