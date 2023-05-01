"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardRepository = void 0;
var CardRepository = /** @class */ (function () {
    function CardRepository() {
        this.list = [];
        this.counter = 0;
    }
    CardRepository.prototype.isExist = function (cardNumber) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var card = _a[_i];
            if (card.getNumber() === cardNumber)
                return true;
        }
        return false;
    };
    CardRepository.prototype.getList = function () {
        return this.list;
    };
    CardRepository.prototype.getByID = function (cardID) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var card = _a[_i];
            if (card.getID() === cardID)
                return card;
        }
        throw new Error("Card ".concat(cardID, " not found"));
    };
    CardRepository.prototype.create = function () {
        var newCards = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newCards[_i] = arguments[_i];
        }
        for (var _a = 0, newCards_1 = newCards; _a < newCards_1.length; _a++) {
            var card = newCards_1[_a];
            if (this.isExist(card.getNumber()))
                throw new Error("Card ".concat(card.getNumber(), " already exists"));
            this.list.push(card);
            card.setID(++this.counter);
        }
    };
    return CardRepository;
}());
exports.CardRepository = CardRepository;
