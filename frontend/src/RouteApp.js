import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import App from './App'

export default function RouteApp() {
    return (
        <Switch>
            <Route exact path="/:page?" render={props => <App {...props} />} />
        </Switch>
    )
}