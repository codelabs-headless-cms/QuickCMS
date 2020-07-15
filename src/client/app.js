import React, { Fragment } from "react";
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Login from "./login/login";
import SignUp from "./signup/signup";

const App = () => (
    <Router>
        <Fragment>
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
            </Switch>
        </Fragment>
    </Router>
)

ReactDOM.render(
    <App />,
    document.getElementById('root')
);