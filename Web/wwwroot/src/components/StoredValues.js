import React from 'react';
import Api from '../services/Api';
import Money from './Money';

export default class StoredValues extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: null,
            value: null,
            inEditMode: false
        }

        this.load = this.load.bind(this);
        this.enterEditMode = this.enterEditMode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.update = this.update.bind(this);

        Api.fetch("values").then(this.load)
    }

    load(data) {
        this.setState({ values: data, value: data[this.props.field] });
    }

    enterEditMode() {
        this.setState({ inEditMode: !this.state.inEditMode });
    }

    update() {
        let storedValues = this.state.values;
        storedValues[this.props.field] = this.state.value;
        this.setState({ inEditMode: false });

        Api.update("values", storedValues.storedValuesId, storedValues);
    }

    onChange(e) {
        this.setState({ value: e.target.value * 1 })
    }

    render() {
        return (
            <div className="stored-value">
                {
                    this.state.values && !this.state.inEditMode &&
                    <button className="link" onClick={this.enterEditMode}>
                        <Money value={this.state.value} />
                    </button>
                }
                {
                    this.state.values && this.state.inEditMode &&
                    <React.Fragment>
                        <input type="text" value={this.state.value} onChange={this.onChange} />
                        <button onClick={this.update}>Save</button>
                    </React.Fragment>

                }
            </div>
        );
    }
}
