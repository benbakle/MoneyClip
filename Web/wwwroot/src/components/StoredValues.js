import React from 'react';
import Api from '../services/Api';
import Money from './Money';
import Loading from './Loading';

export default class StoredValues extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            values: null,
            value: null,
            inEditMode: false,
            fetching: true
        }

        this.load = this.load.bind(this);
        this.enterEditMode = this.enterEditMode.bind(this);
        this.exitEditMode = this.exitEditMode.bind(this);
        this.onChange = this.onChange.bind(this);
        this.update = this.update.bind(this);

        Api.fetch("values").then(this.load)
    }

    load(data) {
        this.setState({ values: data, value: data[this.props.field], fetching: false });
    }

    enterEditMode() {
        this.setState({ inEditMode: true });
    }

    exitEditMode() {
        this.setState({ inEditMode: false });
    }

    update() {
        let storedValues = this.state.values;
        storedValues[this.props.field] = this.state.value;
        this.setState({ inEditMode: false });

        Api.update("values", storedValues.id, storedValues);
    }

    onChange(e) {
        this.setState({ value: e.target.value * 1 })
    }

    render() {
        return (
            <div className="stored-value">
                <div className="title">Bank Balance</div>
                {
                    this.state.fetching &&
                    <Loading />
                }
                {
                    !this.state.fetching && !this.state.inEditMode &&
                    <button className="link" onClick={this.enterEditMode}>
                        <Money value={this.state.value} />
                    </button>
                }
                {
                    !this.state.fetching && this.state.inEditMode &&
                    <div className="flex space-between align-center">
                        <div>
                            <input type="number" value={this.state.value} onChange={this.onChange} />
                        </div>
                        <button className="button update" onClick={this.update}>Save</button>
                        <button className="link close" onClick={this.exitEditMode}><i className='far fa-times-circle'></i></button>
                    </div>

                }
            </div>
        );
    }
}
