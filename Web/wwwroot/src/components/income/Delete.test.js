import React from 'react';
import { shallow } from 'enzyme';
import Delete from './Delete';
import Api from '../../services/Api';
import { promise, resolved } from '../../setupTests';

describe("The Incomes component", () => {
    let _component;
    let value = "this";

    beforeEach(() => {
        let callback = () => { value = "that" };
        spyOn(Api, "delete").and.returnValue(resolved());
        _component = shallow(<Delete id={1} callback={callback} />);

        _component.instance().delete();
    });

    describe("given a call to delete incomes", () => {
        it("calls the delete incomes api", () => {
            expect(Api.delete).toHaveBeenCalledWith("incomes", 1);
        });

        it("calls the callback", () => {
            expect(value).toEqual("that");
        });
    });
});
