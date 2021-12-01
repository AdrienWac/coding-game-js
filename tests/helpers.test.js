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