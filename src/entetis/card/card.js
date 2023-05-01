"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = void 0;
var Card = /** @class */ (function () {
    function Card(number, expire, type, balance, ownerID, bankName) {
        this.number = number;
        this.expire = expire;
        this.type = type;
        this.balance = balance;
        this.ownerID = ownerID;
        this.bankName = bankName;
        this.id = 0;
    }
    ;
    Card.prototype.getID = function () {
        return this.id;
    };
    Card.prototype.setID = function (newId) {
        this.id = newId;
    };
    Card.prototype.getBalance = function () {
        return this.balance;
    };
    Card.prototype.getNumber = function () {
        return this.number;
    };
    Card.prototype.updateBalance = function (newBalance) {
        this.balance += newBalance;
    };
    Card.prototype.getOwnerID = function () {
        return this.ownerID;
    };
    return Card;
}());
exports.Card = Card;
