const game = require('../reverse-minesweeper');

const datasProvider = [
    { input: `16
    9
    ................
    ................
    ................
    ................
    ................
    ....x...........
    ................
    ................
    ................` },
    { input: `10
    7
    ..........
    .x...x...x
    ..x......x
    .....x....
    ..x.x...x.
    x.........
    .x...x...x` },
    { input: `16
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
    ........xxxxxxxx` },
    { input: `26
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
    ..........................` },
];

describe.each(datasProvider)(`Step is equal than element size for each direction`, (data) => {

    beforeEach(() => {
        formatInput(data);
    });

});


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

describe(`Handle of cells adjacent to a mine`, () => {

    test('change the neighbour of a mine', () => {
        let map = [
            ['.', 1, '1', 'x'],
            ['.', 1, '1', 'x'],
            ['.', 1, '1', 'x'],
        ];
    })

});



function formatInput(data) {

    let dataInputNewObject = {};

    [dataInputNewObject.width, dataInputNewObject.height, ...dataInputNewObject.map] = data.input.split("\n").map(value => value.trim());

    dataInputNewObject.map = dataInputNewObject.map.map(row => row.split(''));

    [dataInputNewObject.width, dataInputNewObject.height] = [dataInputNewObject.width, dataInputNewObject.height].map(value => parseInt(value));

    data.input = dataInputNewObject;

}