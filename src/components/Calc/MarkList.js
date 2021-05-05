import React from 'react';

// Material UI Components
import { Table, TableBody, TableCell, 
    TableContainer, TableRow, TableHead,
    Paper, IconButton } from '@material-ui/core';

// Material UI Icons
import DeleteIcon from '@material-ui/icons/Clear'

// Theme and Styling
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';


const styles = theme => ({
    markList: {

    },
});

const createData = (type, mark, weight) => {
    return {type, mark, weight};
}


class MarkList extends React.Component {

    render(){
        const {classes, marks} = this.props;

        const rows = marks.map(_mark => {
            return (
                createData(_mark[0], _mark[1], _mark[2])
            )
        });

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
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.type}
                                </TableCell>
                                <TableCell align="right">{row.mark}</TableCell>
                                <TableCell align="right">{row.weight}</TableCell>
                                <TableCell> <IconButton onClick={this.deleteMark(index)}> <DeleteIcon /> </IconButton> </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    deleteMark = (e, index) => {
        console.log(e, index);
    }
}

MarkList.propTypes = {
    classes: PropTypes.object.isRequired,
}


export default withStyles(styles)(MarkList);