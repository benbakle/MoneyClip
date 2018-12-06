import React from 'react';
import { shallow } from 'enzyme';
import App from './App';


describe("The Money Clip App", () => {
    let _component;
    beforeEach(() => {
        _component = shallow(<App />);
    });
    it("exists", () => {
        expect(_component).toBeDefined();
    })
})
