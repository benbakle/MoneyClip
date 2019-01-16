import React from 'react';

export default class CrudToggle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            inSaveMode: false,
            inDeleteMode: false,
            inConfirmMode: false,

        }

        this.toggleSaveDelete = this.toggleSaveDelete.bind(this);
        this.save = this.save.bind(this);
        this.confirm = this.confirm.bind(this);
        this.enterSaveMode = this.enterSaveMode.bind(this);
        this.enterConfirmMode = this.enterConfirmMode.bind(this);
        this.resetToggle = this.resetToggle.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.resetToggle)
            this.resetToggle();
    }

    enterSaveMode() {
        this.setState({ inSaveMode: true}, this.props.editAction);
    }

    enterConfirmMode() {
        this.setState({ inConfirmMode: true, inDeleteMode: false })
    }

    toggleSaveDelete() {
        (this.state.inSaveMode) ?
            this.setState({ inSaveMode: false, inDeleteMode: true }) :
            this.setState({ inSaveMode: true, inDeleteMode: false })
    }

    resetToggle() {
        this.setState({
            inSaveMode: false,
            inDeleteMode: false,
            inConfirmMode: false
        })
    }

    save() {
        this.props.saveAction();
        this.resetToggle();
    }

    confirm() {
        this.props.deleteAction();
    }

    render() {
        return (
            <div className={`crud-toggle ${this.state.inSaveMode ? "save-mode" : ""}
                                         ${this.state.inDeleteMode ? "delete-mode" : ""}
                                         ${this.state.inConfirmMode ? "confirm-mode" : ""}`} ref={node => this.node = node} >
                <div className="slide">
                    <div className="edit" onClick={this.enterSaveMode}><i className="fa fa-ellipsis-h"></i></div>
                    <div className="save" onClick={this.save}><i className="fa fa-save"></i></div>
                    <div className="toggle-bar" onClick={this.toggleSaveDelete}></div>
                    <div className="delete" onClick={this.enterConfirmMode}><i className="fa fa-trash-alt"></i></div>
                    <div className="confirm" onClick={this.confirm}><i className="fa fa-check"></i></div>
                </div>
            </div>
        )
    }
}