import Api from './Api';
import moment from 'moment';

class Transactions {
    callbacks = [];
    transactions = [];
    descriptions = [];
    fundsNeeded = 0;
    upcomingBills = [];
    daysToPredictBy = 120;

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
        this.setUpcomingBills();
        this.setFundsNeeded();
        this.updateSubscribers();
    }

    setUpcomingBills = () => {
        let transactionsInLastDays = this.transactions.filter(t => t.date > moment().subtract(this.daysToPredictBy, 'days').toISOString());
        let upcomingDescriptions = this.upcomingDescriptions();
        let upcomingBills = [];

        for (var i = 0; i < upcomingDescriptions.length; i++) {
            upcomingBills.push(transactionsInLastDays.filter(d => d.description === upcomingDescriptions[i])[0]);
        }

        //PREDICT DATE && AVERAGE AMOUNT
        for (var i = 0; i < upcomingBills.length; i++) {
            upcomingBills[i].date = moment(upcomingBills[i].date).add(1, "month").toISOString();
            upcomingBills[i].amount = this.averageByDescription(upcomingBills[i].description);
        }

        this.upcomingBills = upcomingBills.sort((a, b) => (a.date > b.date) ? 1 : -1);
    }

    upcomingDescriptions = () => {
        return this.descriptionsInLast(this.daysToPredictBy).filter(e => !this.descriptionsInLast(20).includes(e));
    }

    descriptionsInLast = (days) => {
        let next = this.transactions.filter(t => t.date > moment().subtract(days, 'days').toISOString());
        return [...new Set(next.map(t => t.description))];
    }

    averageByDescription = (description) => {
        let bill = this.transactions.filter(d => d.description === description)
        return bill.reduce((a, b) => a + (b["amount"] || 0), 0) / bill.length;
    }

    setFundsNeeded = () => {
        let result = 0;
        for (var i = 0; i < this.upcomingBills.length; i++) {
            result = result + this.upcomingBills[i].amount
        }
        console.log(result);
        this.fundsNeeded = result;
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