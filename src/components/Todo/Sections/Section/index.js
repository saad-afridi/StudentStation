import React from 'react';

// Custom Components
import TodoList from './TodoList';

// MUI Components
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
	Container,
	Typography,
} from '@material-ui/core';

// MUI Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// MUI Styles
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        margin: "50px 0px",
    },
    section: {
        backgroundColor: theme.palette.elevated[1],
    }
}));

export const Section = (props) => {
	const classes = useStyles();
	const { name, tasks } = props;
	console.log(name, tasks);

	return (
		<Container className={classes.root}>
            <Accordion className={classes.section}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h3" color="primary">
                        {name.toUpperCase()}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TodoList todos={tasks} />
                </AccordionDetails>
            </Accordion>
            {/* <Button
              variant="text"
              color="default"
              endIcon={expanded ? <MoreVertIcon /> : <ExpandMoreIcon />}
              onCLick={handleExpandClick}
            >
                <Typography variant="h3" color="primary">
                    {name}
                </Typography>
            </Button>
			{expanded ? <TodoList todos={tasks} /> : ''}
			{/* <Collapse in={expanded} timeout="auto" unmountOnExit>
                <TodoList todos={tasks} />
			</Collapse> */}
		</Container>
	);
};

export default Section;
