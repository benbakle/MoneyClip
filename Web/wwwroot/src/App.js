import React, { Component } from 'react';
import { Route } from 'react-router';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import View from './components/account/View';

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
                    {
                    //<Route exact path='/accounts' component={View} />
                    }
                </main>
                <footer>
                </footer>
            </div>
        );
    }
}
