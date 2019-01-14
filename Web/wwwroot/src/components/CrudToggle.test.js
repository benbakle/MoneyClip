import React from 'react';
import { shallow } from 'enzyme';
import CrudToggle from './CrudToggle';

describe("The crud toggle component", () => {
    let _component;
    beforeEach(() => {
        _component = shallow(<CrudToggle />);
    })
    describe('given edit is clicked', () => {
        it('enters save mode', () => {
            _component.find(".edit").simulate("click");
            expect(_component.state().inSaveMode).toEqual(true);
        });

    });

});