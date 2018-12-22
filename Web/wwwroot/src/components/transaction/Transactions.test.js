import React from 'react';
import { shallow } from 'enzyme';
import Transactions from './Transactions';
import Api from '../../services/Api';
import { promise } from '../../setupTests';


describe("The Transactions component", () => {
    let _component;

    beforeEach(() => {
        spyOn(Api, "fetch").and.returnValue(promise());
        _component = shallow(<Transactions />);

    });

    it("calls the api", () => {
        expect(Api.fetch).toHaveBeenCalled();
    })

    it("shows a loading message", () => {
        expect(_component.find("Loading").length).toEqual(1);
    });

    describe("given the call returns", () => {
        beforeEach(() => {
            _component.instance().load();
        });

        it("hides the loading message", () => {
            expect(_component.find("Loading").length).toEqual(0);
        });

        describe("without data", () => {
            it("shows nothing", () => {
                expect(_component.text()).toEqual("Transactions");
            });
        });

        describe("with data", () => {
            let transactions;
            beforeEach(() => {
                transactions = [
                    { date: "2018-01-05", description: "The Porn Place", amount: 23.77 },
                    { date: "2018-05-14", description: "Butt Plug Store", amount: 98.36 }
                ]
                _component.instance().load(transactions);
            });

            it("shows a list of transactions", () => {
                let transaction = _component.find("Transaction");

                for (let i = 0; i < transaction.length; i++) {
                    expect(transaction.at(i).props().data).toEqual(transactions[i]);
                }
            });
        });
    });
});
