import React from 'react';

// Material UI Components
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	TableHead,
	Paper,
	IconButton,
} from '@material-ui/core';

// Material UI Icons
import DeleteIcon from '@material-ui/icons/Clear';

// Theme and Styling
import { makeStyles } from '@material-ui/core/styles';

// Redux
import { useDispatch } from 'react-redux';
import { delMark } from '../../actions/calcActions';

const useStyles = makeStyles({
	markList: {},
});

export const MarkList = (props) => {
	const classes = useStyles();
	const { course } = props;
	const dispatch = useDispatch();

	return (
		<TableContainer component={Paper}>
			<Table className={classes.markList}>
				<TableHead>
					<TableRow>
						<TableCell>Mark Type</TableCell>
						<TableCell align="right">Mark (%)</TableCell>
						<TableCell align="right">Weight (%)</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{course.marks.map((row, index) => (
						<TableRow key={index}>
							<TableCell component="th" scope="row">
								{row.type}
							</TableCell>
							<TableCell align="right">{row.mark}</TableCell>
							<TableCell align="right">{row.weight}</TableCell>
							<TableCell>
								<IconButton
									onClick={(e) =>
										deleteMark(e, dispatch, course, index)
									}>
									<DeleteIcon />
								</IconButton>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

const deleteMark = (e, dispatch, course, index) => {
	e.preventDefault();
	course.marks.splice(index, 1);
	dispatch(delMark(course));
};

export default MarkList;
