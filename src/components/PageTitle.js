import React from 'react'

// Material UI Components
import { Grid, Typography }from '@material-ui/core'

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
    titleContainer : {
        margin: "80px 0px 30px 0px",
        color: theme.palette.type === 'dark' 
            ? theme.palette.primary.light : theme.palette.primary.main,
    },
}));

export const PageTitle = (props) => {
    const classes = useStyles();
    const {icon, text} = props;

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
    );
}

export default PageTitle;