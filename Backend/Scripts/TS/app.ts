/// <reference path="../typings/knockout/knockout.d.ts" />

class ViewModel {
    title: string;

    constructor(title: string) {
        this.title = title;
    }
}

class Good {
    name: string;
    cost: number;
    quantity: number;
    managers: Array<Person>;

    constructor(name: string, managers: Array<Person>) {
        this.name = name;
        this.managers = managers;
    }

    adjustCost(cost: number, authority: Person) {
        if (this.managers.indexOf(authority) >= 0) {
            this.cost = cost;
        }
    }

    buy(wallet: Wallet) {
        if (this.quantity == 0) {
            return false;
        }

        wallet.charge(this.cost);
        this.quantity--;
        wallet.owner.addItem(this);

    }

}

class Wallet {
    owner: Person;
    private worth: number;
    private debt: number;

    constructor(owner: Person) {
        this.owner = owner;
        this.worth = 0;
        this.debt = 0;
    }

    balance(): number {
        this.worth -= this.debt;
        if (this.worth < 0) {
            this.debt -= this.worth;
            this.worth = 0;
        }

        return this.worth;
    }

    charge(cost: number): void {
        this.debt += cost;
    }

}

class Person {
    name: string;
    phone: string;
    items: Array<Good>;

    constructor(name: string, phone: string) {
        this.name = name;
        this.phone = phone;
        this.items = new Array<Good>();
    }

    addItem(item: Good): void {
        this.items.push(item);
    }

}

class Bank {
    accounts: Array<Wallet>;
    clients: Array<Person>;

    constructor() {
        this.clients = new Array<Person>();
        this.accounts = new Array<Wallet>();
    }

}

class Store extends Person {
    items: Array<Good>;
    ledger: Wallet;

    constructor(name: string, phone: string) {
        super(name, phone);
        this.items = new Array<Good>();
        this.ledger = new Wallet(this);
    }

}

class Economy {
    centralBank: Bank;
    entities: Array<Person>;

    constructor() {
        this.centralBank = new Bank();
        this.entities = new Array<Person>();
    }

    addEntity(entity: Person): void {
        this.entities.push(entity);
        this.centralBank.clients.push(entity);
        this.centralBank.accounts[entity.name] = new Wallet(entity);
    }
}


window.onload = () => {
    var vm = new ViewModel('test vm');

    var economy = new Economy();

    var testConsumer = new Person('Dave', '555-555-5555');
    var store = new Store('Ace', '515-234-5124');
    var testItem = new Good('Hammer', [testConsumer]);
    economy.addEntity(testConsumer);
    economy.addEntity(store);




    ko.applyBindings(vm);
};