import React, { Component } from 'react'

// Calc Components
import PageTitle from '../components/PageTitle'
import AddCourse from '../components/Calc/AddCourse'
import CourseList from '../components/Calc/CourseList'

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

    // <Courses> is a lit of <Course> objects
    // where <Course> has keys, name and marks
    // name is a unique id of a <Course>
    // marks is a list of all the marks of a <Course> 

    constructor() {
        super();
        this.state = {
            courses : [],
        };
    }

    componentDidMount = () => {
        const courses = localStorage.getItem('courses');
        if (courses) {
          const savedCourses = JSON.parse(courses);
          this.setState({ courses: savedCourses });
        }
    }

    render() {
        return (
            <Container className="CalcContainer"> 
                <PageTitle text={"Prepare and Analyze"} icon={<FaceIcon style={{transform: 'scale(2.0)'}}/>}/>
                <AddCourse AddCourseFn={this.addCourse} />
                <CourseList updateMarksFn={this.updateMarks} courses={this.state.courses} />
            </Container>
        )
    }

    addCourse = async (course) => {
        console.log(course.marks);
        // Naming if User doesn't name properly, Names must be unique for searching
        let repeated = false;
        for (let i = 0; i< this.state.courses.length; i++) {
            if(this.state.courses[i].name === course.name) {
                repeated = true;
            }
        }
        if (course.name === "" || repeated === true) {
            course.name = "Course " + String(this.state.courses.length + 1);
        }

        await this.setState({
            courses: [...this.state.courses, {
                name: course.name, marks: []
            }]
        });
        localStorage.setItem("courses", JSON.stringify(this.state.courses));
    }

    updateMarks = async (course) => {
        console.log(course.name, this.state.courses);
        const newCourses = this.state.courses.map(_course => {
            if(_course.name === course.name) {
                return course;
            }
            return _course;
        })
        await this.setState({ courses: newCourses});
        localStorage.setItem('courses', JSON.stringify(this.state.courses));    
    }
}

CalculatorPage.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CalculatorPage);