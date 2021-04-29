import React from 'react';

class ShowTime extends React.Component {
    
    render () {
        let { timeLeft } = this.props;
        if (timeLeft < 0) {timeLeft = 0;}

        let hours = String(timeLeft / 3600 | 0);
        let mins = String(timeLeft / 60 % 60 | 0);
        let secs = String(timeLeft % 60);

        if (Number(hours) < 10) {hours = "0" + hours};
        if (Number(mins) < 10) {mins = "0" + mins};
        if (Number(secs) < 10) {secs = "0" + secs};

        return (
        <div className='TimeViewContainer'>
            <label id="timeTitle"> {hours + ":" + mins + ":" + secs} </label>
        </div>
    )};
}

export default ShowTime;