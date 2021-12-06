// hashMap = new Map();

// moves = N - 1;

// generateSequence(moves, A1, sequence) {

//     if (moves == 0) {
//         return sequence;
//     }

//     sequence.push(A1);

//     isInBackup = hasMap.has(A1);

//     currentPosition = N - moves;

//     lastIndex = isInBackup ? hasMap.get(A1) : 0;

//     hashMap.set(A1, currentPosition)

//     A1 = isInBackup ? currentPosition - hasMap.get(A1) : 0;

//     generateSequence(moves--, A1, sequence);

// }


const helpers = require('./helpers/helpers');

const game = {};

// TODO Ne pas faire récursivité car la stack est complète
game.generateSequence = (N, hashMap, moves, A1, sequence) => {

    if (moves == 0) {
        return sequence;
    }

    sequence.push(A1);

    let isInBackup = hashMap.has(A1);

    let currentPosition = N - moves;

    let lastIndex = isInBackup ? hashMap.get(A1) : 0;

    hashMap.set(A1, currentPosition);

    A1 = isInBackup ? currentPosition - lastIndex : lastIndex;

    moves--;

    return game.generateSequence(N, hashMap, moves, A1, sequence);

};

game.getValueInSequence = (A1, N) => {

    let moves = N;
    let hashMap = new Map();
    let sequence = [];

    sequence = game.generateSequence(N, hashMap, moves, A1, sequence);

    return sequence[N-1];
};

module.exports = game;