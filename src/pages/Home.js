import React from 'react'
import './styles.css'
import ToDoPage from './Todo'
import TimerPage from './Timer'

class Home extends React.Component {

    render() {
        return (
        <div className="App">
            <div className='MainTitleContainer'>
                <label id="titleLabel"> Student Station </label>
            </div>
            <ToDoPage />
            <TimerPage />
        </div>
        )
    }
}


export default Home
