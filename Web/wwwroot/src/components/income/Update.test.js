import React from 'react';
import { shallow } from 'enzyme';
import Update from './Update';
import Api from '../../services/Api';
import { resolved } from '../../setupTests';

describe("The update incomes component", () => {
    let _component, _item;
    let _value = "this";

    describe("given no item", () => {
        _component = shallow(<Update />);
        it("shows nothing", () => {
            expect(_component.html()).toEqual(null);
        });
    });

    describe("given an item", () => {
        beforeEach(() => {
            _item = {
                id: 65,
                description: "pooooop",
                amount: 99.99
            }

            spyOn(Api, "update").and.returnValue(resolved());
            _component = shallow(<Update income={_item} />);

        });

        it("sets the state", () => {

            expect(_component.state().id).toEqual(65);
            expect(_component.state().description).toEqual("pooooop");
            expect(_component.state().amount).toEqual(99.99);
        });

        describe("given the update button is clicked", () => {
            it("calls the update api", () => {
                _component.find("button.submit").simulate("click");
                expect(Api.update).toHaveBeenCalledWith("incomes", 65, _item);
            });

            describe("given no callback", () => {
                it("does nothing", () => {
                    expect(_value).toEqual("this");
                });
            });

            describe("given a callback", () => {
                it("calls the callback", () => {
                    let callback = () => { _value = "that" };
                    _component = shallow(<Update id={_item} callback={callback} />);
                    _component.instance().callback();

                    expect(_value).toEqual("that");
                });
            });
        });
    });
});
