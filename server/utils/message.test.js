var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Hoang';
        var text = 'Hello there!';
        var message= generateMessage(from, text);

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'hoang';
        var lat= 2;
        var long = 3;
        var locationMess = generateLocationMessage(from, lat, long);

        expect(locationMess.url).toBe(`https://www.google.com/maps?q=${lat},${long}`);
    });
});