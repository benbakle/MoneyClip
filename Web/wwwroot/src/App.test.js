import React from 'react';
import { shallow } from 'enzyme';
import App from './App';


describe("The Money Clip App", () => {
    it("exists", () => {
        expect(shallow(<App />)).toBeDefined();
    })
})
