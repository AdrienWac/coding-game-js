const helpers = {};

helpers.deepCopy = (array) => {

    let copy = [];

    array.forEach(elem => {
        copy.push(Array.isArray(elem) ? helpers.deepCopy(elem) : elem);
    });

    return copy;

}

module.exports = helpers;
