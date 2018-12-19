import React from 'react';
import { shallow } from 'enzyme';
import Incomes from './Incomes';
import Api from '../../services/Api';
import { promise, resolved } from '../../setupTests';

describe("The Incomes component", () => {
    let _component;

    beforeEach(() => {
        spyOn(Api, 'fetch').and.returnValue(promise());
        _component = shallow(<Incomes />);
    });

    it("calls the incomes API ordered by description", () => {
        expect(Api.fetch).toHaveBeenCalledWith("incomes", "description");
    });

    describe("given the api is fetching data", () => {
        it("shows a loading indicator", () => {
            expect(_component.find(".incomes").html()).toContain("Loading...")
        })
    })

    describe("given the incomes call successfully returns", () => {
        describe("without data", () => {
            it("shows a no results message", () => {
                load([]);
                expect(_component.find(".incomes").html()).toContain("No income found");
            })
        });

        describe("with data", () => {
            let incomes;

            beforeEach(() => {
                incomes = [
                    { description: "My income, Yo!", amount: 100 },
                    { description: "Sup!", amount: 9.35 },
                ]
                load(incomes);
            });

            it("shows a list of incomes", () => {
                let list = _component.find("Income");

                for (let i = 0; i < incomes.length; i++) {
                    expect(list[i].html()).toContain(incomes[i].description)
                }

            });

            it("shows the amount total", () => {
                let total = _component.find(".incomes .income-total");
                expect(total.html()).toContain("109.35");
            });

            describe("given a user clicks to enter add mode", () => {
                it("enters add mode", () => {
                    _component.find(".add").simulate("click");

                    expect(_component.state().inAddMode).toEqual(true);
                });

                it("shows link to close add mode", () => {
                    expect(_component.html()).toContain("plus");
                })

            });
        });

        describe("given the reload callback is triggered", () => {
            beforeEach(() => {
                _component.instance().reload();
            });

            it("re-calls the api for most recent incomes", () => {
                expect(Api.fetch).toHaveBeenCalledTimes(2);
            });
        });


    });

    function load(data) {
        _component.instance().load(data);
        return _component;
    }
})
