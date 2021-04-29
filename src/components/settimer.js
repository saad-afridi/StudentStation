import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const icon_set = <FontAwesomeIcon icon={faPlay} />;

class SetTimer extends React.Component {

    constructor() {
        super();
        this.state = {
            hours: '',
            minutes: ''
        };
    }

    render() {
        return (
            <div className='SetTimer'>
                <form id="timeForm" onSubmit={(e) => this.submitAlarm(e)}>
                    <div className="timeInput"> 
                    <input id='setHours' type='text' maxLength="2" placeholder="0" onChange={(e) => this.updateHours(e)}></input>
                    <label> Hours </label>
                    <input id='setMinutes' type='text' maxLength="4" placeholder="0" onChange={(e) => this.updateMinutes(e)}></input>
                    <label> Minutes </label>
                    </div>
                    <button id='addTodoButton' type='submit'> Alarm {icon_set} </button>
                </form>
            </div>
        );
    }

    updateHours = (e) => {
        this.setState({hours : e.target.value});
    }
    
    updateMinutes = (e) => {
        this.setState({minutes : e.target.value});
    }

    submitAlarm = (e) => {
        e.preventDefault();
        this.props.setAlarmFn(this.state.hours, this.state.minutes);
        this.setState({
            hours: '',
            minutes: ''
        });
        document.getElementById('setHours').value = '';
        document.getElementById('setMinutes').value = '';
    }
}

export default SetTimer;