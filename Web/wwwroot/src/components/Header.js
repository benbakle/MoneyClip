import React from 'react';
import Navigation from './Navigation';

export default class Header extends React.Component {
    render() {
        return (
            <div className="header">
                <div className="nav-trigger ">
                    <Navigation />
                </div>
            </div>
        );
    }
}
