import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment } from './actions';


export default function ReduxPracApp() {
    const counter = useSelector(state => state.counterReducer.counter);
    const dispatch = useDispatch();
    console.log(counter);
    return (
        <div>
            <h3> Header! </h3>
            <h1> Counter {counter} </h1>
            <button onClick={() => dispatch(increment())}>+</button>
        </div>
    )
}


