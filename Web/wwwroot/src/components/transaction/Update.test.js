import React from 'react';
import { shallow } from 'enzyme';
import Update from './Update';
import Api from '../../services/Api';
import { promise, resolved } from '../../setupTests';

describe("The update transactions update component", () => {
    let _component, _item;

    describe("given no item", () => {
        it("shows nothing", () => {
            _component = shallow(<Update />);
            expect(_component.html()).toEqual(null);
        });
    });
    describe("given an item", () => {
        let transaction = { id: 1, date: "2018-01-01", description: "this shiz", amount: 75.26 };
        beforeEach(() => {
            spyOn(Api, "update").and.returnValue(resolved());
            _component = shallow(<Update item={transaction} />);
        });

        it("shows the item in form controls", () => {
            expect(_component.find("input[name='description']").props().value).toEqual("this shiz");
            expect(_component.find("input[name='amount']").props().value).toEqual(75.26);
        });
    });
});
