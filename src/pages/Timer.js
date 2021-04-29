import React from 'react';
import './styles.css';
import SetTimer from '../components/settimer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch } from '@fortawesome/free-solid-svg-icons';

const icon_title = <FontAwesomeIcon icon={faStopwatch} />;

class Timer extends React.Component {

    constructor () {
        super();
        this.state = {
            alarm : -2
        };
        this.setAlarmTime = this.setAlarmTime.bind(this);
        this.alarmMessage = 'No Alarm';
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
        console.log(hours, minutes);

        // Dealing with invalid input 
        let n1 = Number(hours);
        let n2 = Number(minutes);
        console.log(n1, n2);
        if (isNaN(n1)|| isNaN(n2)) {
            console.log('not numbers');
            return;
        }
        else if (n1 === 0 && n2 === 0) {
            console.log('zeroes');
            return;
        }
        await this.setState({ alarm: (n1 * 60 + n2) * 60 });
        console.log(this.state.alarm);
    }

    // Check if Alarm is over or not
    checkAlarmClock = async () => {
        this.alarmMessage = 'No Alarm';
        if (this.state.alarm === -2){
            return;
        } else if(this.state.alarm === -1) {
            alert("Time's Up!");
            await this.setState({ alarm: -2});
        } else {
            this.alarmMessage = String(this.state.alarm / 60 | 0) + " minutes & " + String(this.state.alarm % 60) + " seconds.";
            await this.setState({ alarm: this.state.alarm -1 });
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
            <h1>{this.alarmMessage}</h1>
        </div>
        )
    }
}

export default Timer;