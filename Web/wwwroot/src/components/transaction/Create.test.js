import React from 'react';
import { shallow } from 'enzyme';
import Create from './Create';
import Api from '../../services/Api';
import { promise, resolved } from '../../setupTests';

describe("The create transaction component", () => {
    let _component;
    beforeEach(() => {
        //spyOn(Api, "create").and.returnValue(resolved());
        _component = shallow(<Create />);
    });

    it("exists", () => {
        expect(_component).toBeDefined();
    });

});
