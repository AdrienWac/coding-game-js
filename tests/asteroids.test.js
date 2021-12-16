const { hasAsteroidInLine } = require('../asteroids');
const game = require('../asteroids');

const datasProvider = [
    { 
        message: `Horizontal motion`,
        input: `5 5 1 2 3
A.... .A...
..... .....
..... .....
..... .....
..... .....`,
        output: `..A..
.....
.....
.....
.....`
    },
    {
        message: `Vertical motion`,
        input: `5 5 1 2 3
A.... .....
..... A....
..... .....
..... .....
..... .....`,
        output: `.....
.....
A....
.....
.....`
    },
    {
        message: `Combined motion`,
        input: `5 5 1 2 3
A.... .....
..... .A...
..... .....
..... .....
..... .....`,
        output: `.....
.....
..A..
.....
.....`
    },
    {
        message: `Negative motion`,
        input: `5 5 1 2 3
..... .....
..... .A...
..A.. .....
..... .....
..... .....`,
        output: `A....
.....
.....
.....
.....`
    },
    {
        message: ` Greater delta`,
        input: `6 6 1 5 6
A..... ....A.
...... ......
...... ......
...... ......
...... ......
...... ......`,
        output: `.....A
......
......
......
......
......`
    },
    {
        message: `Multiple asteroids`,
        input: `6 6 1 3 5
A..... .A....
...... B.....
B..... ......
...... ......
...... ......
...... ......`,
        output: `B.A...
......
......
......
......
......`
    },
    {
        message: `Depth`,
        input: `6 6 1 6 11
..H... ......
...... ..H...
E...G. .E.G..
...... ..F...
..F... ......
...... ......`,
        output: `......
......
..E...
......
......
......`
    },
    {
        message: `No motion`,
        input: `5 5 0 1255 9999
..... .....
.A... .A...
..... .....
...D. ...D.
..... .....`,
        output: `.....
.A...
.....
...D.
.....`
    },
    {
        message: `Out of bounds`,
        input: `10 10 100 200 300
A......... .A........
B......... ..B.......
C......... ...C......
D......... ....D.....
E......... .....E....
.........F ........F.
.........G .......G..
.........H ......H...
.........I .....I....
.........J ....J.....`,
        output: `..A.......
....B.....
......C...
........D.
..........
.......F..
.....G....
...H......
.I........
..........`
    },
    {
        message: `Armageddon`,
        input: `20 20 25 75 100
.................O.. G...................
.....N...........U.. ...............W....
.............L.R.... ...................C
.................... ...E................
..........Z..V.H.... ..............K.....
................X... ...........T........
.............P...... ............A.......
.............A...... .....P...FLI......N.
.Q.............T.... ....................
..................F. ........D...........
.................... ......S..Y.........M
......K............W .........B....Z.....
...............Y.... ....................
..............S..... ....V.............J.
...........JE......D .........O..........
...M................ ..X...........U.....
......B..G...C....I. ....................
.................... ....................
.................... ..Q................R
.................... .......H............`,
        output: `..................K.
....................
.......I............
.........T..........
....................
...........A........
..D.F...............
.P..................
..S.......B.........
......Y.L...........
....................
....................
....................
....................
................Z...
....................
....................
....................
....................
....................`
    }
];

describe('Position is in the sky', () => {

    test(`Inside`, () => {
        
        const arrayPositions = [2,0];
        const [width, height] = [5,5];

        const positionIsInTheSky = game.positionIsInSky(arrayPositions, width, height);

        expect(positionIsInTheSky).toBe(true);
        
    });

    test(`Outside`, () => {

        const arrayPositions = [5, 1];
        const [width, height] = [5, 5];

        const positionIsInTheSky = game.positionIsInSky(arrayPositions, width, height);

        expect(positionIsInTheSky).toBe(false);

    })
});

describe(`Calculate an asteroid moove`, () => {
    test('Short speed moove', () => {

        const T2 = 2;
        const T3 = 3;

        const arraySpeedOfAsteroid = [1, 0];

        const positionOfOneAsteroidAtT2 = [1, 0];

        const newAsteroidPosition = game.calculatingAsteroidMoove(T2, T3, arraySpeedOfAsteroid, positionOfOneAsteroidAtT2);

        expect(newAsteroidPosition).toEqual([2, 0]);
    });

    test('Backwards short moove', () => {

        const T2 = 2;
        const T3 = 3;

        const arraySpeedOfAsteroid = [-1, 0];

        const positionOfOneAsteroidAtT2 = [1, 0];

        const newAsteroidPosition = game.calculatingAsteroidMoove(T2, T3, arraySpeedOfAsteroid, positionOfOneAsteroidAtT2);

        expect(newAsteroidPosition).toEqual([0, 0]);
    });

    test('Long and fast moove', () => {

        const T2 = 2;
        const T3 = 5;

        const arraySpeedOfAsteroid = [3, 0];

        const positionOfOneAsteroidAtT2 = [1, 0];

        const newAsteroidPosition = game.calculatingAsteroidMoove(T2, T3, arraySpeedOfAsteroid, positionOfOneAsteroidAtT2);

        expect(newAsteroidPosition).toEqual([10, 0]);
    });

    test('Long and fast backwards moove', () => {

        const T2 = 2;
        const T3 = 5;

        const arraySpeedOfAsteroid = [-3, 0];

        const positionOfOneAsteroidAtT2 = [10, 0];

        const newAsteroidPosition = game.calculatingAsteroidMoove(T2, T3, arraySpeedOfAsteroid, positionOfOneAsteroidAtT2);

        expect(newAsteroidPosition).toEqual([1, 0]);
    });


    test('Negative value', () => {

        const T2 = 1;
        const T3 = 2;

        const arraySpeedOfAsteroid = [-0.5, 0];

        const positionOfOneAsteroidAtT2 = [0, 0];

        const newAsteroidPosition = game.calculatingAsteroidMoove(T2, T3, arraySpeedOfAsteroid, positionOfOneAsteroidAtT2);

        expect(newAsteroidPosition).toEqual([-1, 0]);
    });

});

describe(`Calculate speed of asteroid`, () => {
    
    test(`Backwards speed`, () => {
        const speedOfAsteroid = game.calculateArraySpeedOfAsteroid([4, 0], [1, 0], 1, 2);
        expect(speedOfAsteroid).toEqual([-3, 0]);
    });

    test(`Speed`, () => {
        const speedOfAsteroid = game.calculateArraySpeedOfAsteroid([1, 0], [4, 0], 1, 2);
        expect(speedOfAsteroid).toEqual([3, 0]);
    });

    test(`Slow`, () => {
        const speedOfAsteroid = game.calculateArraySpeedOfAsteroid([0, 0], [1, 0], 1, 2);
        expect(speedOfAsteroid).toEqual([1, 0]);
    });

});

describe(`Calcul postion Asteroid at T3`, () => {

    test(`Simple`, () => {
        
        const P1 = new Map([['A', [0, 0]], ['B', [5, 0]]]);
        const P2 = new Map([['A', [1, 0]]]);
        const P3 = new Map();
        
        const T1 = 1;
        const T2 = 2;
        const T3 = 3;

        game.calculPostionAsteroidAtT3(P1, P2, P3, T1, T2, T3);

        expect(P3).toEqual(new Map([['A', [2, 0]]]));

    });

    test(`Multiple`, () => {

        const P1 = new Map([['A', [0, 0]], ['B', [5, 0]]]);
        const P2 = new Map([['A', [1, 0]], ['B', [10, 0]]]);
        const P3 = new Map();

        const T1 = 1;
        const T2 = 2;
        const T3 = 3;

        game.calculPostionAsteroidAtT3(P1, P2, P3, T1, T2, T3);

        expect(P3).toEqual(new Map([['A', [2, 0]], ['B', [15, 0]]]));

    });

    test(`With long way`, () => {

        const P1 = new Map([['A', [0, 0]], ['B', [0, 5]]]);
        const P2 = new Map([['A', [1, 0]], ['B', [0, 10]]]);
        const P3 = new Map();

        const T1 = 1;
        const T2 = 5;
        const T3 = 50;

        game.calculPostionAsteroidAtT3(P1, P2, P3, T1, T2, T3);

        expect(P3).toEqual(new Map([['A', [12, 0]], ['B', [0, 66]]]));

    });

    test(`Simple backwards`, () => {

        const P1 = new Map([['A', [10, 0]], ['B', [5, 0]]]);
        const P2 = new Map([['A', [7, 0]]]);
        const P3 = new Map();

        const T1 = 1;
        const T2 = 2;
        const T3 = 3;

        game.calculPostionAsteroidAtT3(P1, P2, P3, T1, T2, T3);

        expect(P3).toEqual(new Map([['A', [4, 0]]]));

    });

});

describe(`Extract asteroids positions from sky line`, () => {

    test(`One asteroid`, () => {

        const i = 1;
        const skyLineAtT1 = `..................K.`;
        const mapPositionsAsteroid = new Map([['A', [0,0]]]);

        const hasAsteroidInLine = game.extractAsteroidsPositionsFromLine(i, skyLineAtT1, mapPositionsAsteroid);

        expect(hasAsteroidInLine).toBe(true);
        expect(mapPositionsAsteroid).toEqual(new Map([['A', [0,0]], ['K', [18,1]]]));

    });

    test(`No asteroid`, () => {

        const i = 1;
        const skyLineAtT1 = `...................`;
        const mapPositionsAsteroid = new Map([['A', [0, 0]]]);

        const hasAsteroidInLine = game.extractAsteroidsPositionsFromLine(i, skyLineAtT1, mapPositionsAsteroid);

        expect(hasAsteroidInLine).toBe(false);
        expect(mapPositionsAsteroid).toEqual(new Map([['A', [0, 0]]]));

    });

    test(`Multiple asteroids`, () => {

        const i = 1;
        const skyLineAtT1 = `.J................K.`;
        const mapPositionsAsteroid = new Map([['A', [0, 0]]]);

        const hasAsteroidInLine = game.extractAsteroidsPositionsFromLine(i, skyLineAtT1, mapPositionsAsteroid);

        expect(hasAsteroidInLine).toBe(true);
        expect(mapPositionsAsteroid).toEqual(new Map([['A', [0, 0]], ['J', [1, 1]], ['K', [18, 1]]]));

    });

});

describe(`Draw sky in T3`, () => {

    test(`One asteroid`, () => {

        const asteroidsPositionsAtT3 = new Map([['A', [2,0]]]);
        const [W, H] = [5, 5];

        const skyAtT3 = game.drawSkyAtT3(asteroidsPositionsAtT3, W, H);

        expect(skyAtT3).toBe(`..A..
.....
.....
.....
.....`);

    });

});

describe.each(datasProvider)(`Display sky with asteroids position at T3`, (data) => {

    beforeEach(() => {
        formatInput(data);
    });

    test(`${data.message}`, () => {

        const skyAtT3 = game.main(data.input.W, data.input.H, data.input.T1, data.input.T2, data.input.T3, data.input.lines);

        expect(skyAtT3).toEqual(data.output);

    });

});

function formatInput(data) {

    let dataInputNewObject = {};

    const [integersValue, ...lines] = data.input.split('\n');

    dataInputNewObject.lines = lines;

    [dataInputNewObject.W, dataInputNewObject.H, dataInputNewObject.T1, dataInputNewObject.T2, dataInputNewObject.T3] = integersValue.split(' ').map(value => parseInt(value.trim()));

    data.input = dataInputNewObject;

}
