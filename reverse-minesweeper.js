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
        
                
// backupMinePosition = [];
// outputMap = inputMap
// On parcourt les lignes de inputMap
    // if !hasMine(row)
        // Ligne suivante
    // else 
        // extractMinesPositionInRow(row)
        // addMinePositionInBackup(x, y)
        // setMine(x, y, outputMap) => Mise à jour de la mine
        // setNeighboor(x, y, outputMap) => Mise à jour des voisins de la mine
    
// setNeighboor 
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

const game = {};

game.setValue = (x, y, map) => {
    
    map[x][y] = map[x][y] === '.' ? 1 : map[x][y] + 1;

};

module.exports = game;
