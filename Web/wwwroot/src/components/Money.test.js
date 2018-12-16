import React from 'react';
import Money from './Money';
import { shallow } from 'enzyme';

describe("The Money Component", () => {
    let _component

    describe("given no value", () => {
        it("does not show anything", () => {
            _component = shallow(<Money />);
            expect(_component.html()).toEqual(null);
        });
    });

    describe("given a value", () => {
        it("shows the value formatted as currency", () => {
            _component = shallow(<Money value={1236.2} />);
            expect(_component.find(".money").text()).toEqual("$1,236.20");
        });
    });
});