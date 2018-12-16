class Api {
    fetch(route) {
        return fetch(`api/${route}`, {
            headers: {
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache'
            }
        })
            .then(res => {
                if (!res.ok)
                    throw Error(res.statusText);
                return res.json();
            }).catch(e => console.log(e));
    }

    create(route, item) {
        return fetch(`/api/${route}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(item)
        })
    }

    delete(route, id) {
        return fetch(`/api/${route}/delete?id= ${id}`, {
            method: 'DELETE'
        })
    }

}

export default new Api();