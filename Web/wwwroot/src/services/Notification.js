import Noty from 'noty';

class Notification {
    message(options) {
        new Noty({
            ...options,
            ...defaults(),
            type: "info",

        }).show();
    }

    error(options) {
        new Noty({
            ...options,
            ...defaults(),
            type: "error",

        }).show();
    }

    success(options) {
        new Noty({
            ...options,
            ...defaults(),
            type: "success",

        }).show();
    }
}

function defaults() {
    return {
        layout: 'topRight',
        theme: 'semanticui',
        timeout: 1500,
        easing: "bounce",
        progressBar:false,
    }
}

export default new Notification();