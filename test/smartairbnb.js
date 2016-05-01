contract('SmartAirbnb', function(accounts) {
  it("a usual story", function(done) {
    var airb = SmartAirbnb.deployed();
    var price = 100;
    var premium = 10;

    var guest = accounts[0];
    var platform = accounts[1];
    var host  = accounts[2];

    airb.getBalance.call(guest).then(function(balance) {
      assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
      airb.AddPlatform({from: platform});
      airb.AddHost({from: host});
    })
    .then(function() {
      airb.Reserve(price, {from: guest});
    })
    .then(function() {
      return airb.getBalance.call(guest);
    })
    .then(function(balance) {
      var expected = 10000 - price;
      assert.equal(expected, balance.valueOf(), "Reservation error");
    })
    .then(function() {
      return airb.getBalance.call(platform);
    })
    .then(function(balance) {
      var expected = price;
      assert.equal(expected, balance.valueOf(), "Reservation error");
    })
    .then(function() {
      airb.AddPremium(premium, {from: guest});
    })
    .then(function() {
      return airb.getBalance.call(guest);
    })
    .then(function(balance) {
      var expected = 10000 - price - premium;
      assert.equal(expected, balance.valueOf(), "AddPremium error");
    })
    .then(function() {
      airb.LeaveRoom({from: platform});
    })
    .then(function() {
      return airb.getBalance.call(guest);
    })
    .then(function(balance) {
      var expected = 10000 - price - premium;
      assert.equal(balance.valueOf(), expected, "DistributingMoney error");
    })
    .then(function() {
      return airb.getBalance.call(host);
    })
    .then(function(balance) {
      var expected = price + premium;
      assert.equal(balance.valueOf(), expected, "DistributingMoney error");
    })
    .then(done).catch(done);
  });

});
