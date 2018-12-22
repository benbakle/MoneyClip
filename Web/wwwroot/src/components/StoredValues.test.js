import React from 'react';
import StoredValues from './StoredValues';
import Api from '../services/Api';
import { shallow } from 'enzyme';
import { promise, resolved } from '../setupTests';


describe("The Stored Value Component", () => {
    let _component

    it("calls the api", () => {
        spyOn(Api, "fetch").and.returnValue(promise());
        _component = shallow(<StoredValues />);
        expect(Api.fetch).toHaveBeenCalledWith("values");
    });

    describe("given no data", () => {
        it("shows a loading message", () => {
            _component = shallow(<StoredValues />);
            expect(_component.find("Loading").length).toEqual(1);
        });
    });

    describe("given data", () => {
        beforeEach(() => {
            spyOn(Api, "update").and.returnValue(resolved());
            _component = shallow(<StoredValues field="bankBalance" />);
            _component.instance().load({ storedValuesId: 1, bankBalance: 45.25 });
        })

       it("hides the loading message", () => {
           expect(_component.find("Loading").length).toEqual(0);

        });

        it("shows the bank balance", () => {
            expect(_component.html()).toContain("45.25");
        });

        describe("given the value is clicked", () => {
            it("enters edit mode", () => {
                _component.find("button.link").simulate("click");

                expect(_component.state().inEditMode).toEqual(true);
            });
        });

        describe("given the save button is clicked", () => {
            beforeEach(() => {
                _component.setState({ inEditMode: true });
                _component.find(".update").simulate("click");
            });

            it("exits edit mode", () => {
                expect(_component.state().inEditMode).toEqual(false);
            });

            it("calls the update api", () => {
                expect(Api.update).toHaveBeenCalledWith("values", 1, { id: 1, bankBalance: 45.25 });
            });
        })
    })

});
