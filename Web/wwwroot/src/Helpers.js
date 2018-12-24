
class Helpers {
    sumProperty(arr, type) {
        return arr.reduce((total, obj) => {
            if (typeof obj[type] === 'string')
                return total + Number(obj[type]);
            return total + obj[type];
        }, 0);
    }
}

export default new Helpers();