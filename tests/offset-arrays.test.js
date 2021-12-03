const game = require('../offset-arrays');

const datasProvider = [
    { message: `Simple`,
        input: `3
A[-1..1] = 1 2 3
B[3..7] = 3 4 5 6 7
C[-2..1] = 1 2 3 4
A[0]`,
        output: 2 },
];


describe(`Find result of a expression`, () => {

    test(`Simple expression`, () => {
        
        const expression = 'A[0]';
        
        const arrayDefinitions = {
            A: {'-1': 1, '0': 2, '1': 3},
            B: { '3': 3, '4': 4, '5': 5, '6': 6, '7': 7},
            C: {'-2': 1, '-1': 2, '0': 3, '1': 4}
        };

        const result = game.findResultOfExpression(expression, arrayDefinitions);

        expect(result).toBe(2);

    });

    test(`Simple nested expression`, () => {

        const expression = 'A[C[-2]]';

        const arrayDefinitions = {
            A: { '-1': 1, '0': 2, '1': 3 },
            B: { '3': 3, '4': 4, '5': 5, '6': 6, '7': 7 },
            C: { '-2': 1, '-1': 2, '0': 3, '1': 4 }
        };

        const result = game.findResultOfExpression(expression, arrayDefinitions);

        expect(result).toBe(3);

    });

    test(`Multiple nested expression`, () => {

        const expression = 'A[C[A[0]]]';

        const arrayDefinitions = {
            A: { '-1': 1, '0': 2, '1': 3 },
            B: { '3': 3, '4': 4, '5': 5, '6': 6, '7': 7 },
            C: { '-2': 1, '-1': 2, '0': 3, '1': 4, '2': -1 }
        };

        const result = game.findResultOfExpression(expression, arrayDefinitions);

        expect(result).toBe(1);

    });

});

describe(`Parsing array expression`, () => {

    test(`Simple expression`, () => {

        const expression = 'B[3..7] = 3 4 5 6 7';

        const objetOfArrayDefinitions = {
            nameArray: 'B',
            value: { 3: 3, 4: 4, 5: 5, 6: 6, 7: 7 }
        };

        const result = game.parsingArrayExpression(expression);

        expect(result.nameArray).toBe(objetOfArrayDefinitions.nameArray);

    });

    test(`Other expression`, () => {

        const expression = 'B[-13045362..-13045360] = 300 461 395';

        const objetOfArrayDefinitions = {
            nameArray: 'B',
            value: { '-13045362': 300, '-13045361': 461, '-13045360': 395 }
        };

        let result = game.parsingArrayExpression(expression);

        expect(result).toEqual(objetOfArrayDefinitions);

    });

});

describe(`Create object of array expressions`, () => {

    test(`Simple expression`, () => {

        const arrayExpressions = ['B[3..7] = 3 4 5 6 7'];

        const objetOfArrayDefinitions = {
            B: { '3': 3, '4': 4, '5': 5, '6': 6, '7': 7 },
        };

        const result = game.createArrayDefinitions(arrayExpressions);

        expect(result).toEqual(objetOfArrayDefinitions);

    });

    // test(`Simple negative expression`, () => {

    //     const arrayExpressions = ['A[-1..1] = 1 2 3'];

    //     const objetOfArrayDefinitions = {
    //         A: { '-1': 1, '0': 2, '1': 3},
    //     };

    //     const result = game.findResultOfExpression(expression, arrayDefinitions);

    //     expect(result).toBe(2);

    // });

});

describe.each(datasProvider)(`Find number at indice 'i' for given array`, (data) => {

    beforeEach(() => {
        formatInput(data);
    });

    test(`${data.message}`, () => {

        const outputMap = game.generateOutputMap(data.input.width, data.input.height, data.input.map);

        expect(outputMap).toEqual(data.output);

    });

});

function formatInput(data) {

    let dataInputNewObject = {};

    [dataInputNewObject.number, dataInputNewObject.arrayDefinitions, dataInputNewObject.definitionElementToPrint] = data.input.split("\n").map(value => value.trim());

    data.input = dataInputNewObject;

}
