import React from 'react';

export default class Draggable extends React.Component {

    componentDidMount() {
        if (this.node) {
            this.node.id = Math.round(Math.random()* 1000000);
            this.node.draggable = true;
            this.node.ondragstart = "event.dataTransfer.setData('text/plain',null)";
            this.node.addEventListener("mousedown", () => {
                this.node.style.cursor = "-webkit-grabing";
            })
        }
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
