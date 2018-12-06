import React, { Component } from 'react';
import { Route } from 'react-router';
import Header from './components/Header';
import Dashboard from './components/Dashboard';

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
                </main>
                <footer>
                </footer>
            </div>
        );
    }
}
