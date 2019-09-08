import React from 'react';
import Navigation from './Navigation';

export default class Header extends React.Component {
    render() {
        return (
            <div className="header">
                {
                //<div className="mc-container">
                //    <h1><span className="logo"> MC </span><span className="name">Money Clip</span></h1>
                //</div>
                }
                <Navigation />
            </div>
        );
    }
}
