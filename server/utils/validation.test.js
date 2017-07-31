var expect = require('expect');
var {isRealString} = require('./validation.js');

describe('isRealString', () => {
    it('should validate correct information', () => {
        expect(isRealString(123)).toBe(false);
    });

    it('should validate correct information', () => {
        expect(isRealString('      ')).toBe(false);
    });
    
    it('should validate correct information', () => {
        expect(isRealString('hello b   ')).toBe(true);
    });
});
