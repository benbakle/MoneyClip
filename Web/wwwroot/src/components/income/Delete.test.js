import React from 'react';
import { shallow } from 'enzyme';
import Delete from './Delete';
import Api from '../../services/Api';
import { promise, resolved } from '../../setupTests';

describe("The delete incomes component", () => {
    let _component;
    let _value = "this";

    describe("given a call to delete income", () => {

        beforeEach(() => {
            spyOn(Api, "delete").and.returnValue(resolved());
            _component = shallow(<Delete id={1} />);
            _component.find("button").simulate('click');
        });

        it("calls the delete incomes api", () => {
            expect(Api.delete).toHaveBeenCalledWith("incomes", 1);
        });

        describe("given no callback", () => {
            it("does nothing", () => {
                expect(_value).toEqual("this");
            });
        });

        describe("given a callback", () => {
            it("calls the callback", () => {
                let callback = () => { _value = "that" };
                _component = shallow(<Delete id={1} callback={callback} />);
                _component.instance().callback();

                expect(_value).toEqual("that");
            });
        });
    });
});
