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
    constructor(props){
        super(props);
        const {course} = this.props;
        this.state = {
            rows: course.marks.map(_mark => {
                return (
                    createData(_mark[0], _mark[1], _mark[2])
                )
            }) 
        };
    }

    render(){
        const {classes} = this.props;

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
                        {this.state.rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    {row.type}
                                </TableCell>
                                <TableCell align="right">{row.mark}</TableCell>
                                <TableCell align="right">{row.weight}</TableCell>
                                <TableCell >
                                    <IconButton onClick={this.deleteMark.bind(this, index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }

    deleteMark = async (e, index) => {
        let { rows } = this.state;
        let { course } = this.props;
        rows.splice(index, 1);
        await this.setState({ rows });
        course.marks = this.state.rows;
        this.props.updateMarksFn(course);
        console.log(e, course);
    }
}

MarkList.propTypes = {
    classes: PropTypes.object.isRequired,
}


export default withStyles(styles)(MarkList);