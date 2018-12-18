import React from 'react';
import { shallow } from 'enzyme';
import Create from './Create';
import Api from '../../services/Api';
import { promise, resolved } from '../../setupTests';

describe("The create incomes component", () => {
    let component;
    beforeEach(() => {
        spyOn(Api, "create").and.returnValue(resolved());
        component = shallow(<Create />);
    })

    describe("given the description has changed", () => {
        it("updates the description state", () => {
            let e = { target: { value: "Here is a description" } };
            component.instance().validateDescription(e);

            expect(component.state().description).toEqual("Here is a description");
        });
    });

    describe("given the amount changed", () => {
        describe("given the amount is NOT valid", () => {
            beforeEach(() => {
                let e = { target: { value: "a" } };
                component.instance().validateAmount(e);
            });

            it("does not update the amount", () => {
                expect(component.state().amount).toEqual("");
            });

            it("shows a help message", () => {
                expect(component.state().amountIsValid).toEqual(false);
                expect(component.find(".amount .help").text()).toEqual("'amount' can only be a number");
            })

        });

        describe("given the amount is valid", () => {
            it("updates the amount", () => {
                let e = { target: { value: 23.99 } };
                component.instance().validateAmount(e);
                expect(component.state().amount).toEqual(23.99);
            });
        });
    });

    describe("given the add income button is clicked", () => {
        describe("and amount has no value", () => {
            beforeEach(() => {
                component.setState({ description: "suck it", amount: "" });
                component.find("button").simulate("click");
            });

            it("does not call the api", () => {
                expect(Api.create).not.toHaveBeenCalled();
            });

            it("marks amount as required", () => {
                expect(component.find(".amount .required").text()).toEqual("*");
            });
        });

        describe("and description has no value", () => {
            it("does not call the api", () => {
                component.setState({ description: "", amount: 6 });
                component.find("button").simulate("click");
                expect(Api.create).not.toHaveBeenCalled();
            })
        })
        describe("and there are values", () => {
            it("calls the api", () => {
                component.setState({ description: "this shiz", amount: 69.69 });
                component.find("button").simulate("click");
                expect(Api.create).toHaveBeenCalledWith("incomes", { Description: "this shiz", Amount: 69.69 });
            });
        });
    });
});
