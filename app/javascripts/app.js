var accounts;
var guest;
var platform;
var host;
var balance;

function moveScreen(step) {
  // TODO integrate the contract
  var p = $(step).offset().top;
  $('html,body').animate({ scrollTop: p }, 'slow');
  return false;
};

function reserve(price) {
  var airb = SmartAirbnb.deployed();

  airb.Reserve(price, {from: guest})
    .then(function() {
      setStatus("Transaction complete!");
    })
    .catch(function(e) { console.log(e)});
  refreshBalanceAll();

  moveScreen("#step2");
};

function addPremium() {
  // TODO integrate the contract
  var airb = SmartAirbnb.deployed();
  var premium = 10;

  airb.AddPremium(premium, {from: guest})
    .catch(function(e) { console.log(e) });
  refreshBalanceAll();
  moveScreen("#step3");
};

function problem() {
  var airb = SmartAirbnb.deployed();
  airb.FindBug({from: platform})
    .catch(function(e) { console.log(e) });
  refreshBalanceAll();
  moveScreen("#step5");
};

function leaveRoom() {
  var airb = SmartAirbnb.deployed();
  airb.LeaveRoom({from: platform})
    .catch(function(e) { console.log(e) });
  refreshBalanceAll();
};

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function setup() {
  console.log('setup');
  var airb = SmartAirbnb.deployed();

  airb.getBalance.call(guest, {from: guest})
  .then(function(value) {
    var balance_element = $("#guest .balance")[0];
    balance_element.innerHTML = value.valueOf();
    console.log(value.valueOf());
  })
  .catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
  airb.AddPlatform({from: platform})
    .catch(function(e) { console.log(e)});
  airb.AddHost({from: host})
    .catch(function(e) { console.log(e)});

  refreshBalanceAll();
};

function refreshBalance(member) {
  var airb = SmartAirbnb.deployed();

  airb.getBalance.call(member.value, {from: member.value}).then(function(value) {
    var element_name = "#" + member.name + " .balance";
    var balance_element = $(element_name)[0];
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function refreshBalanceAll() {
  var airb = SmartAirbnb.deployed();
  var members = [{ name: 'guest',
                   value: guest}, 
                 { name: 'platform',
                   value: platform}, 
                 { name: 'host',
                   value : host}];

  members.forEach(refreshBalance);
}

function sendCoin() {
  var meta = MetaCoin.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var receiver = document.getElementById("receiver").value;

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(receiver, amount, {from: guest}).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};

window.onload = function() {
  var airb = SmartAirbnb.at(SmartAirbnb.deployed_address);
  $("#confAddress").html(SmartAirbnb.deployed_address);

  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    guest     = accounts[0];
    platform  = accounts[1];
    host      = accounts[2];

    setup();
  });


  $('form').on('submit', function(e){
    e.preventDefault();
  });

  $('form.premium').on('submit', function(e){
    addPremium();
  });

  $('form.problem').on('submit', function(e){
    problem();
  });

  $('.reserve').on('click', function() {
    var price = $( this ).parents( ".card-content").find(".price span").text();
    reserve(price);
  });
}
