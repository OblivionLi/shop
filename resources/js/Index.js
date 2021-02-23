import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomeScreen from './screens/HomeScreen';

function Index() {
    return (
        <Router>
            <Switch>
                <Route path="/" component={HomeScreen} />
            </Switch>
        </Router>
    );
}

export default Index;

if (document.getElementById('app')) {
    ReactDOM.render(<Index />, document.getElementById('app'));
}
