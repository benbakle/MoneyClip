import React from 'react';
import { shallow } from 'enzyme';
import Update from './Update';
import Api from '../../services/Api';
import { promise, resolved } from '../../setupTests';
import View from './View';

describe("The listing account component", () => {
    let _component;
    describe("given no account", () => {
        it("displays nothing", () => {
            _component = shallow(<View />);
            expect(_component.html()).toEqual(null);
        });
    });

});
