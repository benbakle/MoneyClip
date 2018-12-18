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
                expect(component.find(".amount .help").text()).toEqual("'Amount' must be a number");
            });
        });

        describe("given the amount is valid", () => {
            it("updates the amount", () => {
                let e = { target: { value: 23.99 } };
                component.instance().validateAmount(e);
                expect(component.state().amount).toEqual(23.99);
            });
        });

        describe("given the description has not been previously updated", () => {
            it("does not mark description as required", () => {
                expect(component.find(".amount .required").text()).toEqual("");
            });
        });

        describe("given the description has been previously updated", () => {
            it("marks description as required", () => {
                component.setState({ descriptionHasBeenUpdated: true });
                expect(component.find(".description .required").text()).toEqual("*");
            });
        });

        describe("given the amount has not been previously updated", () => {
            it("does not mark amount as required", () => {
                expect(component.find(".amount .required").text()).toEqual("");
            });
        });

        describe("given the amount has been previously updated", () => {
            it("marks amount as required", () => {
                component.setState({ amountHasBeenUpdated: true });
                expect(component.find(".amount .required").text()).toEqual("*");
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
            beforeEach(() => {
                component.setState({ description: "", amount: 6 });
                component.find("button").simulate("click");
            });

            it("does not call the api", () => {
                expect(Api.create).not.toHaveBeenCalled();
            });

            it("marks description as required", () => {
                expect(component.find(".description .required").text()).toEqual("*");
            });


        });

        describe("and amount and discription have values", () => {
            it("calls the api", () => {
                component.setState({ description: "this shiz", amount: 69.69 });
                component.find("button").simulate("click");
                expect(Api.create).toHaveBeenCalledWith("incomes", { Description: "this shiz", Amount: 69.69 });
            });
        });
    });




});
