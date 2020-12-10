const CreateStatistician = require('../src/webrtc_stats.js');

QUnit.module('webrtc_stats');

QUnit.test('stats count', assert => {

    var stats = CreateStatistician("super man");
    console.log("created " + stats.toString());
    
    assert.equal(stats.getStatisticCount(), 0);

    var cnt = stats.increaseStatisticCount();
    assert.equal(cnt, 1);
    assert.equal(stats.getStatisticCount(), 1);

});