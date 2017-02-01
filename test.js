const fin = require('finnlp');
const assert = require('assert');

fin.extend(require('./index.js'));

const instance = new fin("We went to the theatre");
const UKUS = instance.UKUS();

describe('UKUS', function () {
	it('sentence UK', function () {
		assert.equal(typeof instance.result[0].sentenceUK,"number");
	});
	it('sentence US', function () {
		assert.equal(typeof instance.result[0].sentenceUS,"number");
	});
	it('token', function () {
		assert.equal(typeof instance.result[0].tokenUKUS.filter(x=>x==="UK")[0],"string");
	});
});