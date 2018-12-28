import React from 'react';
import { shallow } from 'enzyme';
import Update from './Update';
import Api from '../../services/Api';
import { promise, resolved } from '../../setupTests';

describe("The update incomes component", () => {
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

        it("shows the submit button", () => {
            expect(_component.find(".submit").length).toEqual(1);
        })

        describe("and the submit is clicked", () => {
            let value = 0;
            beforeEach(() => {
                _component = shallow(<Update item={transaction} callback={() => { value = 69 }} />);
                _component.find(".submit").simulate("click");
            });

            it("calls the api", () => {
                expect(Api.update).toHaveBeenCalledWith("transactions", _component.state().id, _component.state());
            });

            it("calls the callback", () => {
                expect(value).toEqual(69);
            });
        });
    });
});
