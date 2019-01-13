import React from 'react';
import { shallow } from 'enzyme';
import Update from './Update';
import Api from '../../services/Api';
import { promise, resolved } from '../../setupTests';
import View from './View';

describe("The view account component", () => {
    let _component;
    describe("given no account", () => {
        it("displays nothing", () => {
            _component = shallow(<View />);
            expect(_component.html()).toEqual(null);
        });
    });

    describe("given an account", () => {
        let account;
        beforeEach(() => {
            account = { description: "Names biatch", amount: 1000000, date: "2018-12-12", cleared: false };
            _component = shallow(<View item={account} />)
        });

        it("displays the date", () => {
            expect(_component.find(".amount Money").props().value).toEqual(1000000);
        });

        it("displays the name", () => {
            expect(_component.find(".description").text()).toEqual("Names biatch");
        });

        it("displays the balance as money", () => {
            expect(_component.find(".amount Money").props().value).toEqual(1000000);
        });

        xit("displays status", () => {
            expect(_component.find(".status").length).toEqual(1);
        });

        xdescribe('given the status is pending', () => {
            it('it displays pending', () => {
                expect(_component.find(".status").text()).toEqual("pending");
            });
        });

        xdescribe('given the status has cleared', () => {
            it('it displays cleared', () => {
                account.cleared = true;
                _component = shallow(<View item={account} />)
                expect(_component.find(".status").text()).toEqual("cleared");
            });
        });
    });

});
