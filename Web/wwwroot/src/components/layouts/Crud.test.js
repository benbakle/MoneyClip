import React from 'react';
import { shallow } from 'enzyme';
import Crud from './Crud';
import Api from '../../services/Api';
import { promise } from '../../setupTests';
import View from '../transaction/View';
import Create from '../transaction/Create';
import Update from '../transaction/Update';

describe("The crud component", () => {
    let _component;

    it('displays a loading message', () => {
        spyOn(Api, "fetch").and.returnValue(promise());
        _component = shallow(<Crud />);
        expect(_component.find("Loading").length).toEqual(1);
    });

    it('calls the api', () => {
        spyOn(Api, "fetch").and.returnValue(promise());
        _component = shallow(<Crud view={<View />} update={<Update />} create={<Create />} type="transactions" filter="$filter=cleared eq true" />);
        expect(Api.fetch).toHaveBeenCalledWith("/api/transactions?$filter=cleared eq true");
    });

    describe('given the call returns', () => {
        describe('without data', () => {
            it('displays a no items message', () => {
                _component.instance().load(null);
                expect(_component.find(".no-items").length).toEqual(1);
            });
        });

        describe('with data', () => {
            let items = [{ description: "Waste of Money" }, { description: "Not worth it" }]

            it('shows a list of item views', () => {
                _component.instance().load(items);
                let allItems = _component.find(".item");
                allItems.map((item, key) =>
                    expect(item.find("View").props().item).toEqual(items[key])
                )
            });

            describe('given the edit button is clicked', () => {
                xit('enters edit mode', () => {
                    _component.find(".toggle-edit").simulate("click");
                    expect(_component.state().inEditMode).toEqual(true);
                });

                it('shows a list of update items', () => {
                    _component.instance().load(items);
                    let allItems = _component.find(".item");
                    allItems.map((item, key) =>
                        expect(item.find("Update").props().item).toEqual(items[key])
                    )
                });

                describe('given the button is clicked again', () => {
                    xit('exits edit mode', () => {
                        let items = [{ description: "Waste of Money" }, { description: "Not worth it" }]
                        _component = shallow(<Crud view={<View />} update={<Update />} create={<Create />} type="transactions"  />);
                        _component.setState({ inEditMode: true, fetching: false, items: items });
                        _component.find(".toggle-edit").simulate("click");
                        expect(_component.state().inEditMode).toEqual(false);
                    });

                    it('hides the update list', () => {
                        expect(_component.find("Update").length).toEqual(0);
                    });

                });
            });

            describe('given the add button is clicked', () => {
                it('shows a create component', () => {
                    _component.find("button.create").simulate("click");
                    expect(_component.find("Create").length).toEqual(1);
                });
            });
        });
    });
});