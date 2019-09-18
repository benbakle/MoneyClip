import Api from './Api';

class Transactions {
    transactions = [];
    descriptions = [];
    callbacks = [];

    init = () => {
        this.fetch();
    }

    fetch = () => {
        this.fetching = true;
        Api.fetch(`api/transactions`)
            .then(this.load)
    }

    load = (transactions) => {
        this.transactions = transactions;
        this.descriptions = this.toObjectPropertyArray(transactions, "description");
        this.fetching = false;
        this.updateSubscribers();
    }

    toObjectPropertyArray = (array, propertyName) => {
        return [...new Set(array.map(i => i[propertyName]))];
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

export default new Transactions();