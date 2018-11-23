import React from 'react';
import { Fetch } from 'react-request';

export default class ApiFetch extends React.Component {
    render() {
        return <Fetch {...this.props} />
    }
}