import Api from './Api';

class Balance {
    checking = {};
    credit = {};
    savings = {};
    available = {};

    transactions = {
        pending: null,
        items: []
    }

    callbacks = [];

    init() {
        this.fetch("checking");
        this.fetch("savings");
        this.fetch("credit");
        this.fetchTransactions();
    }

    fetch = (type) => {
        Api.fetch(`api/accounts/balance/${type}`)
            .then((balance) => this.loadBalance(type, balance))
            .catch(console.log(`error fetching ${type} balance`));
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

    loadTransactions = (items) => {
        if (items.length === 0)
            return;

        this.transactions.items = items;
        this.transactions.pending = this.sum(items.filter(x => !x.cleared), "amount");
        this.available.balance = this.checking.balance - this.transactions.pending;
        this.updateSubscribers();
    }

    sum(items, key) {
        return items.reduce((a, b) => a + (b[key] || 0), 0);
    }

    updateSubscribers() {
        this.callbacks.forEach(cb => cb());
    }

    subscribe(callback) {
        this.callbacks.push(callback);
    }

}

export default new Balance();