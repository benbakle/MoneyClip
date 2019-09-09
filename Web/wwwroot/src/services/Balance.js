import Api from './Api';

class Balance {
    checking = {};
    credit = {};
    savings = {};
    available = {};
    net = {};

    transactions = {
        balance: null,
        items: []
    }

    callbacks = [];

    init() {
        this.fetchBalance("checking");
        this.fetchOffset("checking");
        this.fetchBalance("savings");
        this.fetchBalance("credit");
        this.fetchTransactions();
    }

    fetchBalance = (type) => {
        Api.fetch(`api/accounts/balance/${type}`)
            .then((balance) => this.loadBalance(type, balance))
            .catch(console.log(`error fetching ${type} balance`));
    }

    fetchOffset = (type) => {
        Api.fetch(`api/accounts/offset/${type}`)
            .then((offset) => this.loadOffset(type, offset))
            .catch(console.log(`error fetching ${type} offset`));
    }
    

    fetchTransactions = () => {
        Api.fetch("/api/transactions")
            .then(this.loadTransactions)
            .catch(console.log(`error fetching transactions balance`));

    }

    loadBalance = (type, balance) => {
        this[type].balance = balance;
        this.updateSubscribers();
    }

    loadOffset = (type, offset) => {
        this[type].offset = offset;
        this.updateSubscribers();
    }

    loadTransactions = (items) => {
        if (items.length === 0)
            return;

        this.transactions.items = items;
        this.transactions.balance = this.sum(items.filter(x => !x.cleared), "amount");
        this.available.balance = this.checking.balance - this.transactions.balance;
        this.updateSubscribers();
    }

    sum(items, key) {
        return items.reduce((a, b) => a + (b[key] || 0), 0);
    }

    updateSubscribers() {
        this.net.balance = this.checking.balance + this.savings.balance - this.credit.balance - this.transactions.balance; 
        this.callbacks.forEach(cb => cb());
    }

    subscribe(callback) {
        this.callbacks.push(callback);
    }

}

export default new Balance();