import React from 'react';

import TaskModal from './TaskModal';
import SectionModal from './SectionModal';

// Material UI Components
import { Grid, Button, Modal } from '@material-ui/core';

// Material UI Icons
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	addTask: {},
	addSection: {},
});

const AddTasksAndSections = () => {
	const classes = useStyles();
	const [open1, setOpen1] = React.useState(false);
	const [open2, setOpen2] = React.useState(false);

	return (
		<Grid
			container
			direction="row"
			justifyContent="center"
			alignItems="center"
			spacing={3}>
			<Grid item className={classes.addTask}>
				<Button
					variant="contained"
					size="large"
					startIcon={<AddIcon />}
					color="primary"
					onClick={() => setOpen1(true)}>
					Add Task
				</Button>
				<Modal
					style={{
						display: 'flex',
						alignItems: 'center',
						justify: 'center',
					}}
					open={open1}
					onClose={() => setOpen1(false)}>
					<TaskModal />
				</Modal>
			</Grid>
			<Grid item className={classes.addSection}>
				<Button
					variant="outlined"
					size="large"
					startIcon={<EditIcon />}
					color="primary"
					onClick={() => setOpen2(true)}>
					Modify Section
				</Button>
				<Modal
					style={{
						display: 'flex',
						alignItems: 'center',
						justify: 'center',
					}}
					open={open2}
					onClose={() => setOpen2(false)}>
					<SectionModal onClose={() => setOpen2(false)} />
				</Modal>
			</Grid>
		</Grid>
	);
};

export default AddTasksAndSections;
