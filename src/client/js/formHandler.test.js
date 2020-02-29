const formHandler = require('./formHandler.js');

//jest.spyOn(window, 'alert').mockImplementation(() => {});
jest.mock('./DOMUpdater.js', () => {
    return {
        updateDOM: () => {}
    };
});

test('PeterPan should not be in list', () => {
    expect(formHandler.handleSubmit({})).toBe(false);
});