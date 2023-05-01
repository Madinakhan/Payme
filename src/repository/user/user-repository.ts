import {User} from '../../entetis/user/user';

export class UserRepository{
    private list: User[] = [];
    private id:number = 0;

    isExist(phoneNumber:string):boolean{
        for(let user of this.list){
            if(user.getNumber() === phoneNumber) return true;
        }
        return false;
    }
    create(...newUsers:User[]){
        for(let user of newUsers){
            if(this.isExist(user.getNumber())) throw new Error('User already exists');
            this.list.push(user);
            user.setID(++this.id);
        }
    }
    getByID(newId: number):User{
        for(let user of this.list){
            if(user.getID()===newId) return user;
        }
        throw new Error("User not found");
    }
    getByNumber(newNumber: string):User{
        for(let user of this.list){
            if(user.getNumber()===newNumber) return user;
        }
        throw new Error("User not found");
    }
    delete(userId: number){
        for(let i = 0; i<this.list.length; i++){
            if(this.list[i].getID() == userId){
                this.list.splice(i, 1);
                return `User with id ${userId} has been deleted`;
            }
        }
        throw new Error(`${userId} User not found`);
    }
    getList(){
        return this.list;
    }
}