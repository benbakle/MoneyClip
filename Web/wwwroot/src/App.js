import React, { Component } from 'react';
import { Route } from 'react-router';
import Dashboard from './components/Dashboard';
import Header from './components/Header';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <div className="flex">
                <header>
                    <Header />
                </header>
                <main>
                    <Route exact path='/dashboard' component={Dashboard} />
                    <Route exact path='/header' component={Header} />
                </main>
                <footer>
                </footer>
            </div>
        );
    }
}
