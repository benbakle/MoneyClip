import React from 'react';
import { shallow } from 'enzyme';
import Update from './Update';

describe("The update incomes component", () => {
    let _component;

    beforeEach(() => {
        _component = shallow(<Update />);
    });

    it("exists", () => {
        expect(_component).toBeDefined();
    });
})
