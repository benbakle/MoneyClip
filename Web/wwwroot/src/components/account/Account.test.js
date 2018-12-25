import React from 'react';
import { shallow } from 'enzyme';
import Account from './Account';

describe("The Account component", () => {
    let _component;

    describe("given no data", () => {
        it("shows nothing", () => {
            _component = shallow(<Account />);
            expect(_component.html()).toEqual(null);
        });
    });

    describe("given data", () => {
        let account;
        beforeEach(() => {
            account = { name: "The Porn Place", balance: 23.77 };
            _component = shallow(<Account account={account} />);
        });

        it("shows the account data", () => {
            expect(_component.find(".name").text()).toEqual("The Porn Place");
            expect(_component.find(".balance").html()).toContain("23.77");

        });

        describe("and the account is clicked", () => {
            it("enters edit mode", () => {
                _component.find(".edit").at(0).simulate("click");
                expect(_component.state().inEditMode).toEqual(true);
            });
        });

        describe("given in edit mode", () => {
            beforeEach(() => {
                _component.setState({ inEditMode: true });
            });

            describe("and the close button is clicked", () => {
                it("exits edit mode", () => {
                    _component.find(".close").at(0).simulate("click");
                    expect(_component.state().inEditMode).toEqual(false);
                });
            });
        });

    });
});
