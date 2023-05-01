import { Card } from '../entetis/card/card';
import { User } from '../entetis/user/user';
import { CardRepository } from '../repository/card/card-repository';
import { UserRepository } from '../repository/user/user-repository';


export class MainService{
    private cardRepository = new CardRepository();
    private userRepository = new UserRepository();
    private history: {fromCard: string, toCard: string, amount: number}[]=[];

    register(...users: User[]){
        this.userRepository.create(...users);
    }
    registerCard(...cards: Card[]){
        this.cardRepository.create(...cards);
    }
    login(phoneNumber: string, password: string){
        const currentUser = this.userRepository.getByNumber(phoneNumber)
        if(currentUser.password !== password) throw new Error("Password is incorrect");
        return currentUser
    }
    getUserList(){
        return this.userRepository.getList()
    }
    getCardList(){
        return this.cardRepository.getList()
    }
    getCardByUserID(userID: number): Card[]{
        let cards: Card[] = [];
        for(let card of this.cardRepository.getList()){
            const ownerID: number = card.getOwnerID(); 
            if(ownerID === userID) cards.push(card);
        }
        return cards;
    }
    isCardNumber(cardNumber: string):boolean{
        for(let card of this.cardRepository.getList()){
            if(card.getNumber() === cardNumber) return true;
        }return false;
    }
    getUserID(userID:number){
        return this.userRepository.getByID(userID);
    }
    // transaction(fromCard:string, toCard:string, money:number){
    //     let fromCardExist = false;
    //     let toCardExist = false;
    //     let toCardIndex = -1;
    //     let fromCardIndex = -1;
    //     for(let i=0; i<this.cardRepository.getList().length; i++){
    //         let card = this.cardRepository.getList()[i];
    //         if(card.getNumber()==fromCard){
    //             fromCardExist = true;
    //             fromCardIndex = i;
    //         }
    //         if(card.getNumber()==toCard){
    //             toCardExist = true;
    //             toCardIndex = i;
    //         }
    //         if(fromCardExist&&toCardExist) break;
    //         if(!fromCardExist||!toCardExist) throw new Error("One or both cards do not exist");
    //         const fromCardBalance = this.cardRepository.getList()[fromCardIndex].getBalance();
    //         if(fromCardBalance<money) throw new Error("`You have not enougth money");
    //         this.cardRepository.getList()[fromCardIndex].updateBalance(-money);
    //         this.cardRepository.getList()[toCardIndex].updateBalance(money);
    //         this.history.push({fromCard, toCard, money:money});
    //     }
    // }
    transaction(fromCard: string, toCard: string, money: number) {
        let fromCardExists = false;
        let toCardExists = false;
        let fromCardIndex = -1;
        let toCardIndex = -1;

        for (let i = 0; i < this.cardRepository.getList().length; i++) {
            const card = this.cardRepository.getList()[i];
            if (card.getNumber() === fromCard) {
                fromCardExists = true;
                fromCardIndex = i;
            }
            if (card.getNumber() === toCard) {
                toCardExists = true;
                toCardIndex = i;
            }
            if (fromCardExists && toCardExists) break;
        }

        if (!fromCardExists || !toCardExists) {
            throw new Error('One or both cards do not exist');
        }
        const fromCardBalance = this.cardRepository.getList()[fromCardIndex].getBalance();

        if (fromCardBalance < money) {
            throw new Error(`You have not enough money`);
        }

        this.cardRepository.getList()[fromCardIndex].updateBalance(-money);
        this.cardRepository.getList()[toCardIndex].updateBalance(money);
    

        this.history.push({ fromCard, toCard, amount: money});

    }
    getTransactionHistory(){
        return this.history;
    }
}