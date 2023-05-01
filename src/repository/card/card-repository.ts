import {Card} from '../../entetis/card/card';

export class CardRepository{
    private list: Card[] = [];
    private counter: number = 0;

    isExist(cardNumber: string):boolean{
        for(let card of this.list){
            if(card.getNumber() === cardNumber)return true;
        }
        return false;
    }
    getList(){
        return this.list;
    }
    getByID(cardID: number): Card{
        for(let card of this.list){
            if(card.getID() === cardID)return card
        }
        throw new Error(`Card ${cardID} not found`)
    }
    create(...newCards: Card[]){
        for(let card of newCards){
            if(this.isExist(card.getNumber())) throw new Error(`Card ${card.getNumber()} already exists`);
            this.list.push(card)
            card.setID(++this.counter)
        }
    }
}

