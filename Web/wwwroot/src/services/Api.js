class Api {

    headers() {
        return {
            //'Authorization': 'Bearer ' + Auth.getToken(),
            'Content-Type': 'application/json'
        };
    }

    fetch(url, options) {
        return fetch(url, {
            ...options,
            headers: this.headers()
        })
            .then(res => {
                if (!res.ok)
                    throw Error(res.statusText);
                return res.json();
            }).catch(e => this.notify(JSON.stringify(e)));
    }

    deleteIncome(id) {
        return fetch('/api/incomes/delete?id=' + id, {
            method: 'DELETE'
        })
    }
}

export default new Api();