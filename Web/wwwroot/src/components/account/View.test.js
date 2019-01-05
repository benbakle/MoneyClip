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
            account= { name: "Names biatch", balance: 1000000 };
            _component = shallow(<View item={account} />)
        });

        it("displays the name", () => {
            expect(_component.find(".name").text()).toEqual("Names biatch");
        });

        it("displays the balance as money", () => {
            expect(_component.find("Money").props().value).toEqual(1000000);
        })
    });

});
