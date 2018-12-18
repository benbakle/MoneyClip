import React from 'react';
import { shallow } from 'enzyme';
import Create from './Create';
import Api from '../../services/Api';
import { promise, resolved } from '../../setupTests';

describe("The create incomes component", () => {
    let _component;
    describe("given the add income button is clicked", () => {
        it("calls the api", () => {
            spyOn(Api, "create").and.returnValue(resolved());
            _component = shallow(<Create />);
            _component.setState({
                description: "this shiz",
                amount: 69.69
            });
            _component.find("button").simulate("click");

            expect(Api.create).toHaveBeenCalledWith("incomes", { Description: "this shiz", Amount: 69.69 });
        });
    });
});
