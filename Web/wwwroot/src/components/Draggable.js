import React from 'react';
import dropZone from '../libraries/drop-zone';

export default class Draggable extends React.Component {

    componentDidMount() {
        if (this.node)
            dropZone.makeDraggable(this.node);
    }

    render() {
        const { children } = this.props;

        return (
            <div className="draggable" ref={node => this.node = node} >
                {children}
            </div>
        );
    }
}
