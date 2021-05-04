import React, { Component } from 'react'

// Calc Components
import PageTitle from '../components/PageTitle'

// Material UI Components
import { Container } from '@material-ui/core'

// Material UI Icons
import FaceIcon from '@material-ui/icons/Face';

// Theme and Styling
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
    root: {

    }
})

class CalculatorPage extends Component {

    constructor() {
        super();
        this.state = {
            courses : [],
        };
    }

    render() {
        return (
            <Container className="CalcContainer"> 
                <PageTitle text={"Prepare and Analyze"} icon={<FaceIcon style={{transform: 'scale(2.0)'}}/>}/>
            </Container>
        )
    }
}

CalculatorPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CalculatorPage);