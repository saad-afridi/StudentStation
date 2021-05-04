import React, { Component } from 'react'

// Material UI Components
import { Grid, Typography }from '@material-ui/core'

// Theme and Styling
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';


const styles = theme => ({
    titleContainer : {
        margin: "80px 0px 30px 0px",
        color: theme.palette.type === 'dark' 
            ? theme.palette.primary.light : theme.palette.primary.main,
    },
})

class PageTitle extends Component {
    render() {
        const {classes} = this.props;
        const {icon, text} = this.props;

        return (
        <Grid container spacing={3} direction="row" justify="center" alignItems="center" 
        className={classes.titleContainer}>
            <Grid item> 
                {icon} 
            </Grid>
            <Grid item>
            <Typography variant="h3" component="div" align="left" className="TitleContainer"> 
                {text}
            </Typography>
            </Grid>
        </Grid>
        )
    }
}

PageTitle.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(PageTitle);