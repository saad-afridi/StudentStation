import React from 'react';
import SetTimer from '../components/SetTimer';
import ShowTime from '../components/ShowTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';

const icon_title = <FontAwesomeIcon icon={faStopwatch} />;

class TimerPage extends React.Component {

    constructor () {
        super();
        this.state = {
            alarm : -2
        };
        this.setAlarmTime = this.setAlarmTime.bind(this);
    }


    componentDidMount(){
        this.interval = setInterval(
          () => this.checkAlarmClock(),1000)
    }
    
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    // Sets the Alarm Time -> Converts hours + minutes to seconds
    setAlarmTime = async (hours, minutes) => {

        // Dealing with invalid input 
        let n1 = Number(hours);
        let n2 = Number(minutes);
        if (isNaN(n1)|| isNaN(n2)) {
            return;
        }
        else if (n1 === 0 && n2 === 0) {
            return;
        }
        this.setState({ alarm: (n1 * 60 + n2) * 60 });
        console.log(this.state.alarm);
    }

    // Check if Alarm is over or not
    checkAlarmClock = async () => {
        if (this.state.alarm === -2){
            return;
        } else if(this.state.alarm === -1) {
            alert("Time's Up!");
            this.setState({ alarm: -2 });
        } else {
            this.setState({ alarm: this.state.alarm - 1 });
            console.log("not yet");
        }
    }

    render () {
        return (
        <div className="AppContainer"> 
            <div className="TitleContainer"> 
            <h1> { icon_title } Track Yourself </h1>
            </div>
            <SetTimer setAlarmFn = {this.setAlarmTime}></SetTimer>
            <ShowTime timeLeft={this.state.alarm}></ShowTime>
        </div>
        )
    }
}

export default TimerPage;