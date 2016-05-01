import "MetaCoin.sol";

contract SmartAirbnb is MetaCoin {
    uint public price;
    uint public premium;
    address public guest;
    address public platform;
    address public host;
    uint public deposit;
    uint public kickback;

    function AddPlatform() {
        platform = msg.sender;
    }

    function AddHost() {
        host = msg.sender;
    }

    function Reserve(uint amount) {
        guest = msg.sender;
        price = amount;
        deposit = price + premium;

        sendCoin(platform, amount);
    }
    
    function AddPremium(uint amount) {
        guest = msg.sender;
        premium = amount;
        deposit = price + premium;

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
        } else {
            throw;
        }
    }
}
