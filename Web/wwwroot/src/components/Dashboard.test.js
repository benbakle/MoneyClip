import React from 'react';
import { shallow } from 'enzyme';
import Dashboard from './Dashboard';
import Balance from './Balance';

describe("The dasbboard component", () => {
    let _component;
    beforeEach(() => {
        _component = shallow(<Dashboard />);
    });

    it("displays the current balance", () => {
        expect(_component.find(".balance").props().content).toEqual(<Balance/>);
    });
});
