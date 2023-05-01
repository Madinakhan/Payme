"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainService = void 0;
var card_repository_1 = require("../repository/card/card-repository");
var user_repository_1 = require("../repository/user/user-repository");
var MainService = /** @class */ (function () {
    function MainService() {
        this.cardRepository = new card_repository_1.CardRepository();
        this.userRepository = new user_repository_1.UserRepository();
        this.history = [];
    }
    MainService.prototype.register = function () {
        var _a;
        var users = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            users[_i] = arguments[_i];
        }
        (_a = this.userRepository).create.apply(_a, users);
    };
    MainService.prototype.registerCard = function () {
        var _a;
        var cards = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            cards[_i] = arguments[_i];
        }
        (_a = this.cardRepository).create.apply(_a, cards);
    };
    MainService.prototype.login = function (phoneNumber, password) {
        var currentUser = this.userRepository.getByNumber(phoneNumber);
        if (currentUser.password !== password)
            throw new Error("Password is incorrect");
        return currentUser;
    };
    MainService.prototype.getUserList = function () {
        return this.userRepository.getList();
    };
    MainService.prototype.getCardList = function () {
        return this.cardRepository.getList();
    };
    MainService.prototype.getCardByUserID = function (userID) {
        var cards = [];
        for (var _i = 0, _a = this.cardRepository.getList(); _i < _a.length; _i++) {
            var card = _a[_i];
            var ownerID = card.getOwnerID();
            if (ownerID === userID)
                cards.push(card);
        }
        return cards;
    };
    MainService.prototype.isCardNumber = function (cardNumber) {
        for (var _i = 0, _a = this.cardRepository.getList(); _i < _a.length; _i++) {
            var card = _a[_i];
            if (card.getNumber() === cardNumber)
                return true;
        }
        return false;
    };
    MainService.prototype.getUserID = function (userID) {
        return this.userRepository.getByID(userID);
    };
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
    MainService.prototype.transaction = function (fromCard, toCard, money) {
        var fromCardExists = false;
        var toCardExists = false;
        var fromCardIndex = -1;
        var toCardIndex = -1;
        for (var i = 0; i < this.cardRepository.getList().length; i++) {
            var card = this.cardRepository.getList()[i];
            if (card.getNumber() === fromCard) {
                fromCardExists = true;
                fromCardIndex = i;
            }
            if (card.getNumber() === toCard) {
                toCardExists = true;
                toCardIndex = i;
            }
            if (fromCardExists && toCardExists)
                break;
        }
        if (!fromCardExists || !toCardExists) {
            throw new Error('One or both cards do not exist');
        }
        var fromCardBalance = this.cardRepository.getList()[fromCardIndex].getBalance();
        if (fromCardBalance < money) {
            throw new Error("You have not enough money");
        }
        this.cardRepository.getList()[fromCardIndex].updateBalance(-money);
        this.cardRepository.getList()[toCardIndex].updateBalance(money);
        this.history.push({ fromCard: fromCard, toCard: toCard, amount: money });
    };
    MainService.prototype.getTransactionHistory = function () {
        return this.history;
    };
    return MainService;
}());
exports.MainService = MainService;
