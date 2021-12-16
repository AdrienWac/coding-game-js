const helpers = require('../helpers/helpers');

describe(`Create copy of an array`, () => {

    test('deep copy', () => {

        let initalArray = [
            [".", 1, 1, 1, ".", "x", ".", ".", 1, 1],
            [".", 1, 1, 1, ".", "x", ".", ".", 1, 1]
        ];

        let copyArray = helpers.deepCopy(initalArray);

        copyArray[0][1] = 2;

        expect(initalArray[0][1]).toBe(1);
        expect(copyArray[0][1]).toBe(2);

    });

    test('simple copy', () => {

        let initalArray = [".", 1, 1, 1, ".", "x", ".", ".", 1, 1];

        let copyArray = helpers.deepCopy(initalArray);

        copyArray[1] = 2;

        expect(initalArray[1]).toBe(1);
        expect(copyArray[1]).toBe(2);

    });

});

describe(`Calcul intersection of two objects using the keys for comparison`, () => {

    test('with map', () => {

        const firstObject = new Map([['A', [0, 0]], ['J', [1, 1]], ['K', [18, 1]], ['Z', [6, 1]]]);
        const secondObject = new Map([['A', [1, 0]], ['J', [2, 1]], ['K', [20, 1]]]);

        
        let arrayIntersectionKey = helpers.mapIntersectKey(firstObject, secondObject);


        expect(arrayIntersectionKey).toEqual(['A', 'J', 'K']);

    });

});