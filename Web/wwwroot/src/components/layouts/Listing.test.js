import React from 'react';
import { shallow } from 'enzyme';
import Api from '../../services/Api';
import { promise, resolved } from '../../setupTests';
import Listing from './Listing';
import View from '../account/View';

describe("The listing component", () => {
    let _component;

    describe("given no view component or view type", () => {
        beforeEach(() => {
            spyOn(Api, "fetch").and.stub();
            _component = shallow(<Listing />);
        });

        it("displays nothing", () => {
            expect(_component.text()).toEqual("");
        });

        it("does NOT call the api", () => {
            expect(Api.fetch).not.toHaveBeenCalled();
        })
    });

    describe("given a view component and a type", () => {
        it("calls the api", () => {
            spyOn(Api, "fetch").and.returnValue(promise());
            _component = shallow(<Listing view={<View />} type="accounts" />);
            expect(Api.fetch).toHaveBeenCalledWith("/api/accounts");
        });

        it("displays a loading message", () => {
            expect(_component.find("Loading").length).toEqual(1);

        });
        describe("given the call returns", () => {
            describe("with no data", () => {
                it("displays nothing", () => {
                    _component.instance().load();
                    expect(_component.text()).toEqual("");
                });
            });

            describe("with data", () => {
                it("displays a list of items", () => {
                    let items = [{ name: "Ben" }, { name: "Danielle" }]
                    _component = shallow(<Listing view={<View />} type="accounts" orderby="name" />);
                    _component.instance().load(items)
                    expect(_component.find(".accounts").length).toEqual(1);
                });
            });
        });
    });
});
