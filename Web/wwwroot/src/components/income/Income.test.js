import React from 'react';
import { shallow } from 'enzyme';
import Income from './Income';
import Api from '../../services/Api';
import { promise, resolved } from '../../setupTests';

describe("The Income component", () => {
    let _component;
    let _income = { description: "desc", amount: 22.5 }

    describe("given no income", () => {
        it("shows nothing", () => {
            _component = shallow(<Income />);
            expect(_component.html()).toEqual(null);
        })
    });

    describe("given an income", () => {
        beforeEach(() => {
            _component = shallow(<Income income={_income} />);
        });

        it("shows the income", () => {
            expect(_component.find(".description").html()).toContain("desc");
            expect(_component.find(".amount").html()).toContain(22.5);
        });

        describe("given a user clicks an income ", () => {
            beforeEach(() => {
                _component.setState({ inEditMode: false });
                _component.find(".edit").simulate("click");
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
