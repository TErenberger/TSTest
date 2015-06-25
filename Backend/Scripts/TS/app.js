/// <reference path="../typings/knockout/knockout.d.ts" />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var ViewModel = (function () {
    function ViewModel(title) {
        this.title = title;
    }
    return ViewModel;
})();
var Good = (function () {
    function Good(name, managers) {
        this.name = name;
        this.managers = managers;
    }
    Good.prototype.adjustCost = function (cost, authority) {
        if (this.managers.indexOf(authority) >= 0) {
            this.cost = cost;
        }
    };
    Good.prototype.buy = function (wallet) {
        if (this.quantity == 0) {
            return false;
        }
        wallet.charge(this.cost);
        this.quantity--;
        wallet.owner.addItem(this);
    };
    return Good;
})();
var Wallet = (function () {
    function Wallet(owner) {
        this.owner = owner;
        this.worth = 0;
        this.debt = 0;
    }
    Wallet.prototype.balance = function () {
        this.worth -= this.debt;
        if (this.worth < 0) {
            this.debt -= this.worth;
            this.worth = 0;
        }
        return this.worth;
    };
    Wallet.prototype.charge = function (cost) {
        this.debt += cost;
    };
    return Wallet;
})();
var Person = (function () {
    function Person(name, phone) {
        this.name = name;
        this.phone = phone;
        this.items = new Array();
    }
    Person.prototype.addItem = function (item) {
        this.items.push(item);
    };
    return Person;
})();
var Bank = (function () {
    function Bank() {
        this.clients = new Array();
        this.accounts = new Array();
    }
    return Bank;
})();
var Store = (function (_super) {
    __extends(Store, _super);
    function Store(name, phone) {
        _super.call(this, name, phone);
        this.items = new Array();
        this.ledger = new Wallet(this);
    }
    return Store;
})(Person);
var Economy = (function () {
    function Economy() {
        this.centralBank = new Bank();
        this.entities = new Array();
    }
    Economy.prototype.addEntity = function (entity) {
        this.entities.push(entity);
        this.centralBank.clients.push(entity);
        this.centralBank.accounts[entity.name] = new Wallet(entity);
    };
    return Economy;
})();
window.onload = function () {
    var vm = new ViewModel('test vm');
    var economy = new Economy();
    var testConsumer = new Person('Dave', '555-555-5555');
    var store = new Store('Ace', '515-234-5124');
    var testItem = new Good('Hammer', [testConsumer]);
    economy.addEntity(testConsumer);
    economy.addEntity(store);
    ko.applyBindings(vm);
};
//# sourceMappingURL=app.js.map