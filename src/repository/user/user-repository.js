"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
var UserRepository = /** @class */ (function () {
    function UserRepository() {
        this.list = [];
        this.id = 0;
    }
    UserRepository.prototype.isExist = function (phoneNumber) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.getNumber() === phoneNumber)
                return true;
        }
        return false;
    };
    UserRepository.prototype.create = function () {
        var newUsers = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            newUsers[_i] = arguments[_i];
        }
        for (var _a = 0, newUsers_1 = newUsers; _a < newUsers_1.length; _a++) {
            var user = newUsers_1[_a];
            if (this.isExist(user.getNumber()))
                throw new Error('User already exists');
            this.list.push(user);
            user.setID(++this.id);
        }
    };
    UserRepository.prototype.getByID = function (newId) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.getID() === newId)
                return user;
        }
        throw new Error("User not found");
    };
    UserRepository.prototype.getByNumber = function (newNumber) {
        for (var _i = 0, _a = this.list; _i < _a.length; _i++) {
            var user = _a[_i];
            if (user.getNumber() === newNumber)
                return user;
        }
        throw new Error("User not found");
    };
    UserRepository.prototype.delete = function (userId) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i].getID() == userId) {
                this.list.splice(i, 1);
                return "User with id ".concat(userId, " has been deleted");
            }
        }
        throw new Error("".concat(userId, " User not found"));
    };
    UserRepository.prototype.getList = function () {
        return this.list;
    };
    return UserRepository;
}());
exports.UserRepository = UserRepository;
