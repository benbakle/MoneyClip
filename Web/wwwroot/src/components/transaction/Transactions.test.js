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
            it("shows the title", () => {
                expect(_component.text()).toContain("Transactions");
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

            it("shows the sum of the list of transactions", () => {
                expect(_component.find(".total").html()).toContain("122.13");
            })

            it("shows the create button", () => {
                expect(_component.find(".create").length).toEqual(1);
            });

            it("does NOT show the create form", () => {
                expect(_component.find("Create").length).toEqual(0);
            });

            describe("given the create/close button is clicked", () => {
                beforeEach(() => {
                    _component.find(".create").simulate("click");
                });

                it("enters create mode", () => {
                    expect(_component.state().inCreateMode).toEqual(true);
                });

                it("shows the create form", () => {
                    expect(_component.find("Create").length).toEqual(1);
                });
            });

            describe("given the component is in create mode", () => {
                beforeEach(() => {
                    _component.setState({ inCreateMode: true });
                });

                describe("and the create/close button is clicked", () => {
                    it("exits create mode", () => {
                        _component.find(".create").simulate("click");
                        expect(_component.state().inCreateMode).toEqual(false);
                    });
                });
            });

            describe("given the callback is called", () => {
                it("calls the callback", () => {
                    _component.setState({ fetching: false, inCreateMode: true });
                    _component.instance().callback();

                    expect(_component.state().fetching).toEqual(true);
                    expect(_component.state().inCreateMode).toEqual(false);
                });
            });
        });
    });
});
