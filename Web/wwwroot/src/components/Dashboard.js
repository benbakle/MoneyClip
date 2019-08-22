import React from 'react';
import Balance from './Balance';
import Card100 from './layouts/Card100';
import Draggable from './Draggable';
import DropZone from './DropZone';

export default class Dashcard extends React.Component {
    render() {
        return (
            <>
                <DropZone>
                    <Draggable>
                        <div className="grid">
                            <div className="mc-container">
                                <div className="flex-row">
                                    <Card100 content={<Balance />} className="balance" />
                                </div>
                            </div>
                        </div>
                    </Draggable>
                </DropZone >
                <DropZone />
            </>
        );
    }
}
