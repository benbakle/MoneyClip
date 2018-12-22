import React from 'react';
import { shallow } from 'enzyme';
import Transation from './Transaction';

describe("The Transaction component", () => {
    let _component;

    describe("given no data", () => {
        it("shows nothing", () => {
            _component = shallow(<Transation />);
            expect(_component.html()).toEqual(null);
        });
    });

    describe("given data", () => {
        let transaction;
        beforeEach(() => {
            transaction = { date: "2018-01-05", description: "The Porn Place", amount: 23.77 };
            _component = shallow(<Transation transaction={transaction} />);
        });

        it("shows the transaction data", () => {
            expect(_component.find(".date").html()).toContain("01/05/2018")
            expect(_component.find(".description").text()).toEqual("The Porn Place");
            expect(_component.find(".amount").html()).toContain("23.77");

        });

        describe("given the date is clicked", () => {
            it("enters edit mode", () => {
                _component.find(".date").at(0).simulate("click");
                expect(_component.state().inEditMode).toEqual(true);
            });
        });

        describe("given the description is clicked", () => {
            it("enters edit mode", () => {
                _component.find(".description").at(0).simulate("click");
                expect(_component.state().inEditMode).toEqual(true);
            });
        });

        describe("given the amount is clicked", () => {
            it("enters edit mode", () => {
                _component.find(".amount").at(0).simulate("click");
                expect(_component.state().inEditMode).toEqual(true);
            });
        });
    });
});
