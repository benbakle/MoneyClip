import React from 'react';

export default class DropZone extends React.Component {


    constructor(props) {
        super(props);

        this.state = { dragged: null };
    }



    componentDidMount() {
        
        if (this.node) {
            document.addEventListener("drag", () => { }, false);
            document.addEventListener("dragstart", (e) => {
                this.state.dragged = e.target;
                this.state.dragged.classList.add("dragging");
            },
                false
            );

            document.addEventListener("dragend", (e) => {
                e.target.classList.remove("dragging")
            },
                false
            );

            /* es fired on the drop targets */
            document.addEventListener("dragover",
                (e) => { e.preventDefault(); },
                false
            );

            document.addEventListener(
                "dragenter",
                (e) => {
                    if (e.target.classList.contains("dropzone")) {
                        e.target.classList.add("enter");
                    }
                },
                false
            );

            document.addEventListener(
                "dragleave",
                (e) => {
                    if (e.target.classList.contains("dropzone")) {
                        e.target.classList.remove("enter");
                    }
                },
                false
            );

            document.addEventListener(
                "drop",
                (e) => {
                    // pre default action (open as link for some elements)
                    e.preventDefault();
                    // move this.state.dragged elem to the selected drop target
                    if (e.target.classList.contains("dropzone")) {
                        e.target.classList.remove("enter");
                        this.state.dragged.parentNode.removeChild(this.state.dragged);
                        e.target.appendChild(this.state.dragged);
                    }
                },
                false
            );
        }
    }


    render() {
        return (
            <div className="dropzone" ref={node => this.node = node}>
                {this.props.children}
            </div>
        );
    }
}
