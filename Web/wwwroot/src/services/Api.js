﻿class Api {
    fetch(route, options) {
        return fetch(route, {
            headers: {
                'Content-Type': 'application/json',
                'pragma': 'no-cache',
                'cache-control': 'no-cache',
            },
            ...options
        })
            .then(res => {
                if (!res.ok)
                    throw Error(res.statusText);
                return res.json();
            })
            .catch(e => console.log(e));
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
        return fetch(`/api/${route}/delete/${id}`, {
            method: 'DELETE'
        })
    }

    update(route, id, item) {
        return fetch(`/api/${route}/update/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            body: JSON.stringify(item)
        })
    }
}

export default new Api();