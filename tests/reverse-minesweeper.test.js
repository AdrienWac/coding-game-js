const game = require('../reverse-minesweeper');

const datasProvider = [
    { message: `One mine`,
        input: `16
    9
    ................
    ................
    ................
    ................
    ................
    ....x...........
    ................
    ................
    ................`,
        output: `................
................
................
................
...111..........
...1.1..........
...111..........
................
................` },
    { message: `Many mines`,
        input: `10
    7
    ..........
    .x...x...x
    ..x......x
    .....x....
    ..x.x...x.
    x.........
    .x...x...x`,
        output: `111.111.11
1.211.1.2.
12.1222.2.
.2232.1122
12.2.211.1
.322221122
2.1.1.1.1.`  },
    { message: `Lot of mines`,
        input: `16
    11
    ..xxxxxx..x.x...
    .xx...xxx....xxx
    x.xxxx.xxx...xxx
    xxxxxxxxxx..xxxx
    ...xx..x..xxxx..
    xx.xx.xxxx..x...
    xxxxxx.....x..xx
    xx......xxx..xxx
    xxxxxxxxxxxxxxxx
    xxx.xxx......xx.
    ........xxxxxxxx`,
        output: `13......32.2.332
2..766...4223...
.7....7...214...
..........44....
456..66.75....42
..6..5....45.432
......34554.34..
..766544...55...
................
...5...556667..5
23222322........`  },
    {
        message: `No mine`,
        input: `26
    12
    ..........................
    ..........................
    ..........................
    ..........................
    ..........................
    ..........................
    ..........................
    ..........................
    ..........................
    ..........................
    ..........................
    ..........................`,
        output: `..........................
..........................
..........................
..........................
..........................
..........................
..........................
..........................
..........................
..........................
..........................
..........................`  },
];


describe(`Changes the value of a cell adjacent to a mine`, () => {

    test('empty cell become number', () => {

        let map = [
            ['.', 1, '1', 'x']
        ];

        game.setValue(0, 0, map);

        expect(map[0][0]).toBe(1);

    });

    test('number cell is incremented', () => {

        let map = [
            ['.', 1, '1', 'x']
        ];

        game.setValue(0, 1, map);

        expect(map[0][1]).toBe(2);

    });

});

describe(`Define if cell is a mine`, () => {

    test('detect cell is a mine', () => {
        
        let map = [
            ['.','.','.','.','x','.','.','.','.','.','.','.','.','.','.','.'],
        ];

        let isMine = game.isMine(0,4,map);

        expect(isMine).toBe(true);

    });

    test('detect cell is not a mine', () => {

        let map = [
            ['.', '.', '.', '.', 'x', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ];

        let isMine = game.isMine(0, 0, map);

        expect(isMine).toBe(false);

    });

});

// TODO faire un data provider
describe(`Test if cell is on map`, () => {

    test('should be on the map', () => {

        let inOnMap = game.isOnMap(16, 9, [8, 15]);

        expect(inOnMap).toBe(true);

    });

    test('should be on the top of the map', () => {

        let inOnMap = game.isOnMap(16, 9, [-1, 14]);

        expect(inOnMap).toBe(false);

    });

    test('should be on the bottom of the map', () => {

        let inOnMap = game.isOnMap(16, 9, [9, 0]);

        expect(inOnMap).toBe(false);

    });

    test('should be on the right of the map', () => {

        let inOnMap = game.isOnMap(16, 9, [8, 17]);

        expect(inOnMap).toBe(false);

    });

    test('should be on the left of the map', () => {

        let inOnMap = game.isOnMap(16, 9, [8, -1]);

        expect(inOnMap).toBe(false);

    });

});

describe(`Handle of cells adjacent to a mine`, () => {

    test('No neighbour is a mine', () => {
        
        let inputMap = [
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', 'x', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ];

        let outputMap = [...inputMap];

        game.setNeighbour(1, 4, inputMap, outputMap, 16, 3);

        ['0;3','0;4','0;5', '1;3', '1;5', '2;3', '2;4', '2;5'].forEach(stringCoordinates => {
            const [row, col] = stringCoordinates.split(';');
            expect(outputMap[parseInt(row)][parseInt(col)]).toBe(1);
        });

    });

    test('A neighbour is a mine', () => {

        let inputMap = [
            ['.', '.', '.', 'x', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', 'x', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ];

        let outputMap = [...inputMap];

        game.setNeighbour(1, 4, inputMap, outputMap, 16, 3);

        expect(outputMap[0][3]).toBe('x');

    });

    test('Mine is on the edge of the map', () => {

        let inputMap = [
            ['x', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ];

        let outputMap = [...inputMap];

        game.setNeighbour(0, 0, inputMap, outputMap, 16, 3);

        ['0;1', '1;0', '1;1'].forEach(stringCoordinates => {
            const [row, col] = stringCoordinates.split(';');
            expect(outputMap[parseInt(row)][parseInt(col)]).toBe(1);
        });

    });

});

describe(`Extraction all mines coordinates in row`, () => {

    test('No mine in row', () => {

        const indexRow = 0

        const inputMap = [
            ['.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.']
        ];

        let arrayMinesPositionInRow = game.extractMinesPositionInRow(inputMap[indexRow], indexRow);

        expect(arrayMinesPositionInRow).toHaveLength(0);

    });

    test('One mine in row', () => {

        const indexRow = 0

        const inputMap = [
            ['.', '.', '.', '.', '.', '.', 'x', '.', '.', '.', '.', '.', '.', '.', '.', '.']
        ];

        let arrayMinesPositionInRow = game.extractMinesPositionInRow(inputMap[indexRow], indexRow);

        expect(arrayMinesPositionInRow).toEqual([[indexRow, 6]]);

    });

    test('Multiple mines in row', () => {

        const indexRow = 0

        const inputMap = [
            ['x', '.', '.', '.', '.', '.', '.', 'x', '.', '.', '.', 'x', '.', '.', 'x', '.']
        ];

        let arrayMinesPositionInRow = game.extractMinesPositionInRow(inputMap[indexRow], indexRow);

        expect(arrayMinesPositionInRow).toEqual([[indexRow, 0], [indexRow, 7], [indexRow, 11], [indexRow, 14]]);

    });

});

describe(`Format output map for display`, () => {

    test(`Display the grid in string format`, () => {
        let map = [
            ['.', '.', '.', '.', 'x', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
            ['.', '.', '.', '.', 'x', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.', '.'],
        ];

        let formatedMap = game.formatTheGridForDisplay(map);

        expect(formatedMap).toEqual(`....x...........
....x...........`);

    });

});

describe.each(datasProvider)(`Display the grid as it appears if you win the game`, (data) => {

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

    [dataInputNewObject.width, dataInputNewObject.height, ...dataInputNewObject.map] = data.input.split("\n").map(value => value.trim());

    dataInputNewObject.map = dataInputNewObject.map.map(row => row.split(''));

    [dataInputNewObject.width, dataInputNewObject.height] = [dataInputNewObject.width, dataInputNewObject.height].map(value => parseInt(value));

    data.input = dataInputNewObject;

}
