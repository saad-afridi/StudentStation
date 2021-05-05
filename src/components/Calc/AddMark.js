import React, { Component } from 'react'

// Material UI Components
import { Grid, TextField, Fab, FormControl} from '@material-ui/core'

// Material UI Icons
import AddIcon from '@material-ui/icons/Add';

// Theme and Styling
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    addMarkForm: {
        margin: "10px 0px 5px 0px",
    },

    formControl: {
        maxWidth: "90px",

    }
});

class AddMark extends Component {

    constructor(){
        super();
        this.state = {
            type: "Test",
            mark: 0,
            weight: 0,
        }
    }
 

    render() {

        const {classes} = this.props;
        return (
            <Grid container spacing={2} direction="row" alignItems="center" justify="space-around"
            className={classes.addMarkForm}>
                <Grid item>
                    <FormControl className={classes.formControl} >
                        <TextField label="Mark Type" type="text" id="mark-type"
                        onChange={this.updateMarkType} onKeyDown={this.onKeyPress}/>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <TextField label="Mark (%)" type="number" id="mark"
                        onChange={this.updateMark} onKeyDown={this.onKeyPress}/>
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl className={classes.formControl}>
                        <TextField label="Weight (%)" type="number" id="weight"
                        onChange={this.updateWeight} onKeyDown={this.onKeyPress}/>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Fab size="small" onClick={this.submitMark} 
                    style={{
                        transform: "scale(0.8)",
                        margin: "5px",
                    }}> 
                        <AddIcon /> 
                    </Fab> 
                </Grid>
            </Grid>
        )
    }

    onKeyPress = (e) => {
        if (e.keyCode === 13) {
            return this.submitMark(e);
        }
    }

    updateMarkType = (e) => {
        this.setState({ type: e.target.value});
    }

    updateMark = (e) => {
        this.setState({ mark : e.target.value});
    }

    updateWeight = (e) => {
        this.setState({ weight: e.target.value});
    }

    submitMark = (e) => {
        let {course} = this.props;
        console.log("Child", course.marks, this.state.mark, this.state.weight);
        e.preventDefault();
        if (this.state.mark !== 0 && this.state.weight !== 0) {
            course.marks.push([this.state.type, this.state.mark, this.state.weight]);
            this.props.updateMarksFn(course);
        }
        this.setState({ type: "Test", mark: 0, weight: 0});
        document.getElementById("mark-type").value = "";
        document.getElementById("mark").value = "";
        document.getElementById("weight").value = "";
    }

}

AddMark.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(AddMark);