var accounts;
var account;
var balance;

function moveScreen(step) {
  // TODO integrate the contract
  var p = $(step).offset().top;
  $('html,body').animate({ scrollTop: p }, 'slow');
  return false;
};

function reserve() {
  // TODO integrate the contract
  moveScreen("#step2");
};

function addPremium() {
  // TODO integrate the contract
  moveScreen("#step3");
};

function noWifi() {
  moveScreen("#step5");
};

function leaveRoom() {
  return false;
};

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  var meta = MetaCoin.deployed();

  meta.getBalance.call(account, {from: account}).then(function(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function sendCoin() {
  var meta = MetaCoin.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var receiver = document.getElementById("receiver").value;

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(receiver, amount, {from: account}).then(function() {
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
    account = accounts[0];

    refreshBalance();
  });


  $('form').on('submit', function(e){
    e.preventDefault();
  });
}
