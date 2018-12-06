﻿import React from 'react';
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

    it("calls the incomes API", () => {
        expect(Api.fetch).toHaveBeenCalledWith("/api/incomes");
    });

    describe("given the api is fetching data", () => {
        it("shows a loading indicator", () => {
            expect(_component.find(".incomes").html()).toContain("Loading...")
        })
    })

    describe("given the incomes call successfully returns", () => {
        describe("without data", () => {
            it("shows a no results message", () => {
                loadIncome([]);
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

                loadIncome(incomes);
            });

            it("shows a list of incomes", () => {

                let desc = _component.find(".incomes .description");
                let amount = _component.find(".incomes .amount");

                for (let i = 0; i < incomes.length; i++) {
                    expect(desc.at(i).html()).toContain(incomes[i].description);
                    expect(amount.at(i).html()).toContain("$" + incomes[i].amount.toFixed(2));
                }
            });

            it("shows the amount total", () => {
                let total = _component.find(".incomes .income-total");
                expect(total.html()).toContain("109.35");
            })
        });
    });

    function loadIncome(data) {
        _component.instance().loadIncome(data);
        return _component;
    }
})
