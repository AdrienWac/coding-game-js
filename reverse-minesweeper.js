// Create array input => Créer le tableau d'entrée à partir de l'input
// Créer array output = copy de array input à l'init => Créer le tableau de sortie
    // On parcourt chaque case
        // On recherche et stocke les coordonnées des mines
        // Si pas mine
            // On met à jour sa valeur final avec un point
        // Si mine
            // On met à jour sa valeur final avec un .
            // On parcourt ses voisons pour ajuster en +1 la valeur final
                // Si voisin est une coordonnée de bombes => on change pas
                // Si valeur final est point => ça devient 1
                // Si valeur final est un nombre => ça devient valeur final + 1
        
                
// backupMinePosition = []; INUTILE ?
// outputMap = inputMap
// On parcourt les lignes de inputMap
    // if indexOf(row) === -1 => aucune mine sur la ligne
        // Ligne suivante
    // else 
        // extractMinesPositionInRow(row)
        // Pour chaque position de mine dans la ligne courante
            // addMinePositionInBackup(row, col) INUTILE ?
            // outputMap[row][col] = '.' => Mise à jour de la mine
            // setNeighboor(x, y, outputMap) => Mise à jour des voisins de la mine
    
// setNeighbour
    // Offset = [
        // [-1, -1], [0, -1], [1, -1], 
        // [-1, 0], [1, 0], 
        // [-1, 1], [0, 1], [1, 1]
    // ]
    // Pour chaque offset
        // if isMine(x, y, inputMap)
            // Offset suivant
        // Else 
            // setValue(x, y, outputMap)


// setValue(x, y, map)
    // map[x][y] = map[x][y] === '.' ? 1 : map[x][y] + 1;
    // return map
const helpers = require('./helpers/helpers');
const game = {};
const MINE_SYMBOL = 'x';

game.generateOutputMap = (width, height, inputMap) => {

    let outputMap = helpers.deepCopy(inputMap);

    inputMap.forEach((row, indexRow) => {
        
        if (row.indexOf(MINE_SYMBOL) === -1) {
            return false;
        }

        let arrayMinesPositions = game.extractMinesPositionInRow(row, indexRow);

        arrayMinesPositions.forEach(coordinatesMine => {

            let [row, col] = coordinatesMine;

            outputMap[row][col] = '.';

            game.setNeighbour(row, col, inputMap, outputMap, width, height);

        });

    });

    return game.formatTheGridForDisplay(outputMap);

};

game.formatTheGridForDisplay = (arrayOutputMap) => {
    return arrayOutputMap.map(row => row.join('')).join("\n");
};

game.extractMinesPositionInRow = (row, indexRow) => {

    let arrayMinesPositionInRow = [];

    let indexColMinePosition = row.indexOf(MINE_SYMBOL);

    while (indexColMinePosition != -1) {

        arrayMinesPositionInRow.push([indexRow, indexColMinePosition]);
        indexColMinePosition = row.indexOf(MINE_SYMBOL, indexColMinePosition + 1);

    }

    return arrayMinesPositionInRow;
};

game.setNeighbour = (row, col, inputMap, outputMap, width, height) => {

    const offsets = [ [-1, -1], [-1, 0], [-1, +1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1] ];

    offsets.forEach(offset => {

        let [nextRow, nextCol] = [row, col].map((value, index) => value + offset[index]);

        if (!game.isOnMap(width, height, [nextRow, nextCol])) {
            return false;
        }

        if (!game.isMine(nextRow, nextCol, inputMap)) {
            game.setValue(nextRow, nextCol, outputMap);
        }

    });

};

game.isOnMap = (width, height, arrayCoordinates) => {

    const [row, col] = arrayCoordinates;
    return (row >= 0 && row < height) && (col >= 0 && col < width);

}

game.isMine = (row, col, map) => {
    return map[row][col] === MINE_SYMBOL;
};

game.setValue = (row, col, map) => {
    map[row][col] = map[row][col] === '.' ? 1 : map[row][col] + 1;
};

module.exports = game;
