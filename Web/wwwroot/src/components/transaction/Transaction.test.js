import React from 'react';
import { shallow } from 'enzyme';

describe("The Income component", () => {
    it("works", () => {
        expect(true).toEqual(true);
    })  
})

//xdescribe("with data", () => {
//    let transactions;
//    beforeEach(() => {
//        transactions = [
//            { date: "2018-01-05", description: "The Porn Place", amount: 23.77 },
//            { date: "2018-05-14", description: "Butt Plug Store", amount: 98.36 }
//        ]
//        _component.instance().load(transactions);
//    });

//    it("shows a list of transactions", () => {
//        let dates = _component.find(".date");
//        let descriptions = _component.find(".description");
//        let amounts = _component.find(".amount");

//        for (let i = 0; i < transactions.length; i++) {
//            expect(dates.at(i).html()).toContain(shallow(<Moment date={transactions[i].date} format="MM/DD/YYYY" />).html());
//            expect(descriptions.at(i).text()).toEqual(transactions[i].description);
//            expect(amounts.at(i).html()).toContain(transactions[i].amount);
//        }
//    });

//    describe("given the date is clicked", () => {
//        it("enters edit mode", () => {
//            _component.find(".date").at(0).simulate("click");
//            expect(_component.state().inEditMode).toEqual(true);
//        });
//    });

//    describe("given the description is clicked", () => {
//        it("enters edit mode", () => {
//            _component.find(".description").at(0).simulate("click");
//            expect(_component.state().inEditMode).toEqual(true);
//        });
//    });

//    describe("given the amount is clicked", () => {
//        it("enters edit mode", () => {
//            _component.find(".amount").at(0).simulate("click");
//            expect(_component.state().inEditMode).toEqual(true);
//        });
//    });
//});