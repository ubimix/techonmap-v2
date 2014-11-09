var expect = require('expect.js');
var techonmap = require('../app/dist/techonmap');
describe('techonmap', function() {
    it('should say hello', function() {
        expect(!!techonmap.sayHello).to.be(true);
        expect(techonmap.sayHello()).to.eql('Hello, techonmap!');
    });
});