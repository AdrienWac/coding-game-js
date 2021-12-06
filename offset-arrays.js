// Pour chaque définitions
    // Traitement de la définition
        // Explode la définition split('=')
        // Initialisation du gauche (split[0])
            // ?
        // Assignation des variables au nouveau tableau
    
// Traitement de l'élément à afficher(expression)
    // Extraire le nom du tableau => nameArray
    // Extraire l'index => index
    // Si typeof index = number => return nameArray[index] ====> Condition d'arrêt
    // Sinon Traitement de l'élément à afficher(index)

    

const helpers = require('./helpers/helpers');

const game = {};

game.createArrayDefinitions = (arrayExpressions) => {

    // const arrayExpressions = ['B[3..7] = 3 4 5 6 7'];

    let objectOfArrayDefinitions = {};

    arrayExpressions.forEach(expression => {
        
        let { nameArray, value: valueArray } = game.parsingArrayExpression(expression);
        objectOfArrayDefinitions[nameArray] = valueArray;

    });

    return objectOfArrayDefinitions;

}

game.parsingArrayExpression = (expression) => {

    let [expressionArray, expressionValue] = expression.split(' = ');

    const arrayValues = expressionValue.split(' ');

    const regex = /^([A-Z]+)(?:\[{1})(-?[0-9]+)(?:\.{2})(-?[0-9]+)/;

    let [, nameArray, startIndex, endIndex] = expressionArray.match(regex);

    let valueObject = {};
    
    let counter = 0;

    for (let index = parseInt(startIndex); index <= parseInt(endIndex); index++) {
        valueObject[index.toString()] = parseInt(arrayValues[counter]);
        counter++;
    }
    
    return {
        nameArray: nameArray,
        value: valueObject,
    };

};

game.findResultOfExpression = (expression, arrayDefinitions) => {

    const regex = /^([a-zA-Z]+)+\[+(.*)+\]$/;

    let [, nameArray, index] = expression.match(regex);

    if (isNaN(index)) {
        index = game.findResultOfExpression(index, arrayDefinitions);
    }
    
    return arrayDefinitions[nameArray][index];

};

game.findNumberOfAnArray = (arrayExpressions, finalExpression) => {

    const arrayDefinitions = game.createArrayDefinitions(arrayExpressions); 

    return game.findResultOfExpression(finalExpression, arrayDefinitions);

};

module.exports = game;
