import { MainService } from './src/services/main-service';
import { Card } from "./src/entetis/card/card";
import { User } from "./src/entetis/user/user";

const mainService = new MainService();

const user1 = new User('Madina','Asrorkhojaeva', '+876543456789', 'vg787y65');
const user2 = new User('Madina','Asrorkhojaeva', '+34567', 'vg787y65');
mainService.register(user1, user2);


const card1 = new Card('86000000000001', '12/02', "HUMO", 50000, user2.getID(), 'NBU');
const card2 = new Card('86000000000002', '12/02', "HUMO", 50000, user1.getID(), 'NBU');
const card3 = new Card('86000000000003', '12/02', "HUMO", 50000, user1.getID(), 'NBU');
mainService.registerCard(card1, card2, card3);


// console.log(mainService.getUserID(user1.getID()));
// console.log(mainService.getCardByUserID(user2.getID()));
// console.log(mainService.isCardNumber(user2.getNumber()));
mainService.transaction('86000000000001', '86000000000002', 6000);
mainService.transaction(card3.getNumber(), card2.getNumber(), 6000);
console.log(mainService.getCardList());
console.log('history ',mainService.getTransactionHistory());