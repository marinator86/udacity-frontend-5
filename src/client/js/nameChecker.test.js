const nameChecker = require('./nameChecker.js');

jest.spyOn(window, 'alert').mockImplementation(() => {});

test('PeterPan should not be in list', () => {
    expect(nameChecker.checkForName('PeterPan')).toBe(false);
});

test('Picard  should be in list', () => {
    expect(nameChecker.checkForName('Picard')).toBe(true);
});