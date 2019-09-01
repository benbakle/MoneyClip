import React from 'react';
import dropZone from '../libraries/drop-zone';

export default class DropZone extends React.Component {
    componentDidMount() {
        dropZone.makeDroppable();
    }

    render() {
        return (
            <div className="dropzone">
                {this.props.children}
            </div>
        );
    }
}
