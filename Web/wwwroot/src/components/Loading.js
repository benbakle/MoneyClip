import React from 'react';

export default class Loading extends React.Component {
    render() {
        return (
            <div className="loading">
                <div className="loader">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                </div>
            </div>
        );
    }
}
