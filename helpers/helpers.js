const helpers = {};

helpers.deepCopy = (array) => {

    let copy = [];

    array.forEach(elem => {
        copy.push(Array.isArray(elem) ? helpers.deepCopy(elem) : elem);
    });

    return copy;

}

helpers.mapIntersectKey = (firstMap, secondMap) => {

    const firstObject = Object.fromEntries(firstMap);
    const secondObject = Object.fromEntries(secondMap);

    return Object.keys(firstObject).filter(key => key in secondObject);

}

module.exports = helpers;
