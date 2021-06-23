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
		margin: '50px 0px',
	},
	section: {
		backgroundColor:
			theme.palette.type === 'dark'
				? theme.palette.elevated[1]
				: theme.palette.elevated[1],
	},
	sectionHeader: {
		color:
			theme.palette.type === 'dark'
				? theme.palette.primary.main
				: theme.palette.primary.main,
	},
}));

export const Section = (props) => {
	const classes = useStyles();
	const { name, tasks } = props;

	return (
		<Container className={classes.root}>
			<Accordion className={classes.section}>
				<AccordionSummary expandIcon={<ExpandMoreIcon />}>
					<Typography variant="h4" className={classes.sectionHeader}>
						{name.toUpperCase()}
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<TodoList sectionName={name} todos={tasks} />
				</AccordionDetails>
			</Accordion>
		</Container>
	);
};

export default Section;
