import React from 'react';
import Api from '../../services/Api';
import Loading from '../Loading';

export default class Listing extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetching: true,
            items: null
        }
        this.load = this.load.bind(this);

        if (this.props.view && this.props.type)
            Api.fetch(this.props.type, this.props.orderby).then(this.load);
    }

    load(data) {
        this.setState({ fetching: false, items: data });
    }

    render() {
        return (
            <div>
                {
                    this.props.view && this.props.type &&
                    <React.Fragment>
                        {
                            this.state.fetching && !this.state.items &&
                            <Loading />
                        }
                    </React.Fragment>
                }
                {
                    !this.state.fetching && this.state.items &&
                    <div className={this.props.type}>
                        {displayItems(this.state.items, this.props.view)}
                    </div>
                }
            </div>
        )
    }
}

function displayItems(items, view) {
    return (
        items.map((item, key) =>
            <React.Fragment key={key}>
                {React.cloneElement(view, { item: item })}
            </React.Fragment>
        )
    )
}