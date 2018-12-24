import React from 'react';
import { shallow } from 'enzyme';
import Create from './Create';
import Api from '../../services/Api';
import { resolved } from '../../setupTests';

describe("The create transaction component", () => {
    let _component;
    let value = true;
    let _callback = () => { value = false };

    beforeEach(() => {
        spyOn(Api, "create").and.returnValue(resolved());
        _component = shallow(<Create callback={_callback} />);
    });

    it("displays a textbox for the date", () => {
        expect(_component.find("input[name='date']").length).toEqual(1);
    });

    it("displays a textbox for the description", () => {
        expect(_component.find("input[name='description']").length).toEqual(1);
    });

    it("displays a textbox for the amount", () => {
        expect(_component.find("input[name='amount']").length).toEqual(1);
    });

    it("displays a submit button", () => {
        expect(_component.find(".submit").length).toEqual(1);
    });

    describe("given the submit button is clicked", () => {
        let transaction = { Date: "2018-2-04", Description: "some o dat", Amount: 32 }
        beforeEach(() => {
            _component.setState(transaction);
            _component.find(".submit").simulate("click");
        });

        xit("calls the api", () => {
            expect(Api.create).toHaveBeenCalledWith("transactions", transaction);
        });

        it("calls the callback", () => {
            expect(value).toEqual(false);
        });
    });
});
