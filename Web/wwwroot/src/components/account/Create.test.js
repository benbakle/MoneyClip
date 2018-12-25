import React from 'react';
import { shallow } from 'enzyme';
import Create from './Create';
import Api from '../../services/Api';
import { resolved } from '../../setupTests';

describe("The create account component", () => {
    let _component;
    let value = true;
    let _callback = () => { value = false };

    beforeEach(() => {
        spyOn(Api, "create").and.returnValue(resolved());
        _component = shallow(<Create callback={_callback} />);
    });

    it("displays a textbox for the name", () => {
        expect(_component.find("input[name='name']").length).toEqual(1);
    });

    it("displays a textbox for the balance", () => {
        expect(_component.find("input[name='balance']").length).toEqual(1);
    });

    it("displays a submit button", () => {
        expect(_component.find(".submit").length).toEqual(1);
    });

    describe("given the submit button is clicked", () => {
        let account = { Date: "2018-2-04", Description: "some o dat", Amount: 32 }
        beforeEach(() => {
            _component.setState(account);
            _component.find(".submit").simulate("click");
        });

        xit("calls the api", () => {
            expect(Api.create).toHaveBeenCalledWith("accounts", account);
        });

        it("calls the callback", () => {
            expect(value).toEqual(false);
        });
    });
});
