import "MetaCoin.sol";

contract SmartAirbnb is MetaCoin {
    uint public value;
    uint public premium;
    address public host;
    address public guest;
    address public platform;
    uint public deposit;
    uint public kickback;
    address metacoin;

    function SmartAirbnb() {
//        metacoin = new MetaCoin();
    }    

    function Reserve(uint amount) {
        guest = msg.sender;
        value = amount;

//        metacoin.sendCoin(platform, amount);
        sendCoin(platform, amount);
    }
    
    function AddPremium(uint amount) {
        guest = msg.sender;
        premium = amount;

//        metacoin.sendCoin(platform, amount);
        sendCoin(platform, amount);
    }

    function FindBug() {
        kickback += ((value + premium) / 2);
        deposit  -= ((value + premium) / 2);
    }
    
    function HotShower() {
        kickback += ((value + premium) * 3/10);
        deposit  -= ((value + premium) * 3/10);
    }
    
    function leaveRoom() {
        if (kickback + deposit == getBalance(platform)) {
            sendCoin(host, deposit);
            sendCoin(guest, kickback);
//            metacoin.sendCoin(host, deposit);
//            metacoin.sendCoin(guest, kickback);
        } else {
            throw;
        }
    }
}
