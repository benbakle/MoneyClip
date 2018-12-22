import React from 'react';
import { shallow } from 'enzyme';
import Transaction from './Transaction';

xdescribe("The Transaction component", () => {
    let _component;
    let _transaction = { description: "desc", amount: 22.5 }

    describe("given no transaction", () => {
        it("shows nothing", () => {
            _component = shallow(<Transaction />);
            expect(_component.html()).toEqual(null);
        })
    });

    describe("given an transaction", () => {
        beforeEach(() => {
            _component = shallow(<Transaction transaction={_transaction} />);
        });

        it("shows the transaction", () => {
            expect(_component.find(".description").html()).toContain("desc");
            expect(_component.find(".amount").html()).toContain(22.5);
        });

        describe("given a user clicks the transaction description", () => {
            beforeEach(() => {
                _component.setState({ inEditMode: false });
                _component.find(".description").simulate("click");
            });

            it("enters edit mode", () => {
                expect(_component.state().inEditMode).toEqual(true);
            });

            it("shows editable data", () => {
                expect(_component.html()).toContain("<input");
            });
        });

        describe("given a user clicks close", () => {
            beforeEach(() => {
                _component.setState({ inEditMode: true });
                _component.find(".close").simulate("click");
            });

            it("exits edit mode", () => {
                expect(_component.state().inEditMode).toEqual(false);
            });

            it("hides editable data", () => {
                expect(_component.html()).not.toContain("<input")
            });
        });
    });
})
