import "MetaCoin.sol";

contract SmartAirbnb is MetaCoin {
    uint public price;
    uint public premium;
    address public guest;
    address public host;
    uint public deposit;
    uint public kickback;
    address metacoin;

    function SmartAirbnb() {
        address public platform;
    }

    function Reserve(uint amount) {
        guest = msg.sender;
        price = amount;

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
        kickback += ((price + premium) / 2);
        deposit  -= ((price + premium) / 2);
    }
    
    function NoWifi() {
        kickback += ((price + premium) * 3/10);
        deposit  -= ((price + premium) * 3/10);
    }
    
    function LeaveRoom() {
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
