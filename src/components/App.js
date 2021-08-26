import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import AppShell from './AppShell';
import Home from './Home.js';
import Text from './Text.js';
import Words from './Words.js';

function App() {
    return (
        <Router>
            <AppShell></AppShell>
            <div id="content" style={{ margin: 'auto', marginTop: '20px' }}>
                <Switch>
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/text" component={Text} />
                    <Route exact path="/words" component={Words} />
                </Switch>
            </div>
        </Router >
    )
}

export default App
