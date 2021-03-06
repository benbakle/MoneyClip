﻿import React from 'react';
import { shallow } from 'enzyme';
import Api from '../services/Api';
import { resolved, promise } from '../setupTests';

describe("The balance component", () => {
    let _component;

    it("displays a loading message", () => {
        spyOn(Api, "fetch").and.returnValue(promise());
        _component = shallow(<Balance />);
        expect(_component.find("Loading").length).toEqual(1);
    });

    it("calls the accounts total api", () => {
        spyOn(Api, "fetch").and.returnValue(resolved());
        _component = shallow(<Balance />);
        expect(Api.fetch).toHaveBeenCalledWith("/api/accounts/total");
    });

    describe("given the call returns", () => {
        describe("without a total", () => {
            it("displays nothing", () => {
                _component.instance().loadIncomeTotal(null);
                expect(_component.find("Loading").length).toEqual(0);
            });
        });

        describe("with a total", () => {
            it("sets the accounts total value", () => {
                spyOn(Api, "fetch").and.returnValue(resolved());
                _component.instance().loadAccountTotal(123);
                expect(_component.state().accountTotal).toEqual(123);
            })

            it("calls the transaction total api", () => {
                spyOn(Api, "fetch").and.returnValue(resolved());
                _component.instance().loadAccountTotal(123);
                expect(Api.fetch).toHaveBeenCalledWith("/api/transactions/total");
            });

            describe("given the call returns", () => {
                describe("without a total", () => {
                    it("displays nothing", () => {
                        expect(_component.text()).toEqual("");
                    });
                });

                describe("with a total", () => {
                    beforeEach(() => {
                        _component = shallow(<Balance />);
                        _component.instance().loadAccountTotal(123);
                        _component.instance().loadIncomeTotal(563.25);
                        _component.instance().loadTransactionTotal(7.08);
                    });

                    it("sets the transactions total value", () => {
                        expect(_component.state().transactionTotal).toEqual(7.08);
                    })

                    it("calculates the current balance", () => {
                        expect(_component.state().currentBalance).toEqual(115.92);
                    });

                    it("hides the loading message", () => {
                        expect(_component.find("Loading").length).toEqual(0);
                    });

                    it("displays the current balance", () => {
                        expect(_component.find(".current-balance .balance Money").props().value).toEqual(115.92);
                    });
                });
            });
        });
    });
});
