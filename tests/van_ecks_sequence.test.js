const game = require('../van_ecks_sequence');

const datasProvider = [
//     { 
//         message: `Not seen`,
//         input: `0
// 2`,
//         output: 0
//     },
//     {
//         message: `Seen Before`,
//         input: `0
// 3`,
//         output: 1
//     },
//     {
//         message: `A little long`,
//         input: `1
// 58`,
//         output: 11
//     },
//     {
//         message: `Longer`,
//         input: `10
// 5692`,
//         output: 7
//     },
    {
        message: `A little stress`,
        input: `1
56804`,
        output: 29
    },
//     {
//         message: `Stress Check`,
//         input: `0
// 1000000`,
//         output: 34143
//     }
    
];

describe(`Generate sequence`, () => {

    test(`Little`, () => {
        
        let N = 3;
        let moves = N;
        let A1 = 0;
        let hashMap = new Map();
        let sequence = [];

        sequence = game.generateSequence(N, hashMap, moves, A1, sequence);

        expect(sequence).toEqual([0, 0, 1]);

    });

    test(`longest`, () => {

        let N = 22;
        let moves = N;
        let A1 = 0;
        let hashMap = new Map();
        let sequence = [];

        sequence = game.generateSequence(N, hashMap, moves, A1, sequence);

        expect(sequence).toEqual([0, 0, 1, 0, 2, 0, 2, 2, 1, 6, 0, 5, 0, 2, 6, 5, 4, 0, 5, 3, 0, 3]);

    });

});

describe.each(datasProvider)(`Get value at given position in sequence`, (data) => {

    beforeEach(() => {
        formatInput(data);
    });

    test(`${data.message}`, () => {

        const valueAtPosition = game.getValueInSequence(data.input.A1, data.input.givenPosition);

        expect(valueAtPosition).toBe(data.output);

    });

});

function formatInput(data) {

    let dataInputNewObject = {};

    [dataInputNewObject.A1, dataInputNewObject.givenPosition] = data.input.split("\n").map(value => parseInt(value.trim()));

    data.input = dataInputNewObject;

}
