import React from 'react';
import { shallow } from 'enzyme';
import CrudToggle from './CrudToggle';

describe("The crud toggle component", () => {
    let _component;
    describe('given edit is clicked', () => {
        it('enters save mode', () => {
            _component = shallow(<CrudToggle />);
            _component.find(".edit").simulate("click");
            expect(_component.state().inSaveMode).toEqual(true);
        });

        describe('given in save mode', () => {
            describe('and the toggle button is clicked', () => {
                beforeEach(() => {
                    _component.setState({ inSaveMode: true });
                    _component.find(".toggle-bar").simulate("click");
                })
                it('enters delete mode', () => {
                    expect(_component.state().inDeleteMode).toEqual(true);
                });

                it('exits save mode', () => {
                    expect(_component.state().inSaveMode).toEqual(false);
                });
            });
        });

        describe('given in delete mode', () => {
            describe('and the toggle button is clicked', () => {
                beforeEach(() => {
                    _component.setState({ inSaveMode: false, inDeleteMode: true });
                    _component.find(".toggle-bar").simulate("click");
                })
                it('enters save mode', () => {
                    expect(_component.state().inSaveMode).toEqual(true);
                });

                it('exits delete mode', () => {
                    expect(_component.state().inDeleteMode).toEqual(false);
                });
            });

            describe('and the delete button is clicked', () => {
                beforeEach(() => {
                    _component.find(".delete").simulate("click");
                });
                it('enters confirm mode', () => {
                    expect(_component.state().inConfirmMode).toEqual(true);
                });

                it('exits delete mode', () => {
                    expect(_component.state().inDeleteMode).toEqual(false);
                });
            });
        });

        describe('given the save button is clicked', () => {
            let val = false
            beforeEach(() => {
                _component = shallow(<CrudToggle saveAction={() => { val = true }} />);
                _component.setState({ inSaveMode: true });
            })
            it('calls the save action', () => {
                _component.find(".save").simulate("click");
                expect(val).toEqual(true);
            });
        });

        describe('given the confirm button is clicked', () => {
            let val = false
            beforeEach(() => {
                _component = shallow(<CrudToggle deleteAction={() => { val = true }} />);
            })
            it('calls the delete action', () => {
                _component.find(".confirm").simulate("click");
                expect(val).toEqual(true);
            });
        });
    });
});