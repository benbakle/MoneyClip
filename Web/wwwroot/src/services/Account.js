import Api from './Api';

class Account {
    accounts = [];
    callbacks = [];

    init = () => {
        this.fetch();
    }

    fetch = () => {
        Api.fetch(`api/accounts`)
            .then(this.load)
            .catch(console.log(`error fetching accounts`));
    }

    load = (accounts) => {
        this.accounts = accounts;
        this.fetchTransactions();
    }

    fetchTransactions = () => {
        Api.fetch("/api/transactions?$orderby=description")
            .then(this.loadTransactions)
            .catch(console.log(`error fetching transactions balance`));
    }

    loadTransactions = (items) => {
        if (items.length === 0)
            return;
        this.setTransactions(items);
        this.fething = false;
    }

    setAvailable = () => {
        this.accounts.push(
            {
                type: "available",
                balance: this.balanceByType("checking") - this.offsetByType("checking") - this.balanceByType("transactions"),
            })

    }

    setTransactions = (items) => {
        this.accounts.push({
            type: "transactions",
            items: items,
            balance: this.sum(items.filter(x => !x.cleared), "amount")
        });

        this.setAvailable();
        this.setNet();
        this.updateSubscribers();
    }

    setNet = () => {
        this.accounts.push(
            {
                type: "net",
                balance: this.balanceByType("checking") + this.balanceByType("savings") - this.balanceByType("transactions") - this.balanceByType("credit"),
            })

        this.updateSubscribers();

    }

    byType = (type) => {
        return this.accounts.filter(a => a.type === type);
    }

    transactions = () => {
        return this.byType("transactions")[0];
    }

    balanceByType = (type) => {
        return this.sum(this.byType(type), "balance");
    }

    offsetByType = (type) => {
        return this.sum(this.byType(type), "offset");
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

export default new Account();