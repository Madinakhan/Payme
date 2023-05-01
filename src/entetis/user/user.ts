export class User{
    private id: number;
    constructor(public firstName: string, public lastName: string, public phoneNumber: string, public password: string){};
    getID(){
        return this.id;
    }
    setID(newID:number){
        this.id = newID;
    }
    getNumber(){
        return this.phoneNumber;
    }
}