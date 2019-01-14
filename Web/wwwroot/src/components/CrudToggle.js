import React from 'react';

export default class CrudToggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inCreateMode: false,
            inSaveMode: false,
            inDeleteMode: false,
            inConfirmMode: false,

        }

        this.toggleSaveDelete = this.toggleSaveDelete.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.save = this.save.bind(this);
        this.confirm = this.confirm.bind(this);
    }

    componentWillMount() {
        document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClick(e) {
        if (this.node && this.node.contains(e.target)) {
            return;
        }

        this.setState({
            inCreateMode: false,
            inSaveMode: false,
            inDeleteMode: false,
            inConfirmMode: false,
        })
    }

    toggleSaveDelete() {
        (this.state.inSaveMode) ?
            this.setState({ inSaveMode: false, inDeleteMode: true }) :
            this.setState({ inSaveMode: true, inDeleteMode: false })
    }

    save() {
        this.props.saveCallback();
        this.handleClick({ target: null });
    }

    confirm() {
        this.props.confirmCallback();
        this.handleClick({ target: null });
    }

    render() {
        return (
            <div className={`crud-toggle ${this.state.inSaveMode ? "save-mode" : ""}
                                         ${this.state.inDeleteMode ? "delete-mode" : ""}
                                         ${this.state.inConfirmMode ? "confirm-mode" : ""}`} ref={node => this.node = node} >
                <div className="slide">
                    <div className="edit" onClick={() => this.setState({ inSaveMode: true })}><i className="fa fa-ellipsis-h"></i></div>
                    <div className="save" onClick={this.save}><i className="fa fa-save"></i></div>
                    <div className="toggle-bar" onClick={this.toggleSaveDelete}></div>
                    <div className="delete" onClick={() => this.setState({ inConfirmMode: true, inDeleteMode: false })}><i className="fa fa-trash-alt"></i></div>
                    <div className="confirm" onClick={this.confirm}><i className="fa fa-check"></i></div>
                </div>
            </div>
        )
    }
}