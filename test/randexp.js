var test = require('tap').test;
var bigint = require('../');

test('rand with exp', function (t) {
  bigint.setRandExp(128);
    for (var i = 1; i < 1000; i++) {
        var x = bigint(i).rand();
        t.ok(x.gt(0));
        console.log(x);
    }
    
    t.end();
});