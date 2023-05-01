export class Card{
    private id: number=0;
    constructor(public number: string, public expire: string, public type: 'HUMO' | 'UZCARD', public balance: number, public ownerID: number, public bankName: string){};
    getID(){
        return this.id;
    }
    setID(newId:number){
        this.id = newId
    }
    getBalance(){
        return this.balance
    }
    getNumber(){
        return this.number
    }
    updateBalance(newBalance:number){
        this.balance+=newBalance
    }
    getOwnerID(){
        return this.ownerID
    }
}
