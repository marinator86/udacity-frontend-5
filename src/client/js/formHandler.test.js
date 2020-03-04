const mockExport = {
    updateDOM: jest.fn(i => i)
}
jest.mock('./DOMUpdater.js', () => mockExport);

const mockSuccessResponse = {};
const mockJsonPromise = Promise.resolve(mockSuccessResponse);
const mockFetchPromise = Promise.resolve({
  json: () => mockJsonPromise,
});
global.fetch = jest.fn(() => mockFetchPromise);

test('formHandle', () => {
    const formHandler = require('./formHandler.js').default;

    return formHandler.handleSubmit('testUrl').then(data => {
        expect(data).toStrictEqual({url:'testUrl'});
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(mockExport.updateDOM).toHaveBeenCalledTimes(1);
    });
}); 