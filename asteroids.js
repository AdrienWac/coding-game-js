const helpers = require('./helpers/helpers');

const game = {};


module.exports = game;

game.main = (W, H, T1, T2, T3, lines) => {
    
    let [positionsAsteroidAtT1, positionsAsteroidAtT2, positionsAsteroidAtT3] = [new Map(), new Map(), new Map()];

    for (let i = 0; i < H; i++) {
        
        let [skyLineAtT1, skyLineAtT2] = lines[i].split(' ');
        
        let flagCalculPositionsAsteroidAtT3 = false;
        
        if (game.extractAsteroidsPositionsFromLine(i, skyLineAtT1, positionsAsteroidAtT1)) {
            flagCalculPositionsAsteroidAtT3 = true;
        }

        if (game.extractAsteroidsPositionsFromLine(i, skyLineAtT2, positionsAsteroidAtT2)) {
            flagCalculPositionsAsteroidAtT3 = true;
        }

        if (flagCalculPositionsAsteroidAtT3) {
            game.calculPostionAsteroidAtT3(positionsAsteroidAtT1, positionsAsteroidAtT2, positionsAsteroidAtT3,T1, T2, T3, W, H);
        }

    }

    return game.drawSkyAtT3(positionsAsteroidAtT3, W, H);

}

game.drawSkyAtT3 = (positionsAsteroidAtT3, W, H) => {

    let sky = Array(H).fill(null).map(() => Array(W).fill('.'));

    positionsAsteroidAtT3 = new Map([...positionsAsteroidAtT3].sort((a, b) => String(b[0]).localeCompare(a[0])));

    positionsAsteroidAtT3.forEach((asteroidPosition, asteroidLetter) => { sky[asteroidPosition[1]][asteroidPosition[0]] = asteroidLetter});

    return sky.map(line => line.join('')).join("\n");

}

game.extractAsteroidsPositionsFromLine = (Y, skyLineString, mapPositionsAsteroid) => {
    
    const asteroidsInLine = skyLineString.match(/[A-Z]/g);

    if (!asteroidsInLine) {
        return false;
    }

    asteroidsInLine.forEach(asteroidLetter => {
        mapPositionsAsteroid.set(asteroidLetter, [skyLineString.indexOf(asteroidLetter), Y]);
    });

    return true;

}

game.calculPostionAsteroidAtT3 = (positionsAsteroidAtT1, positionsAsteroidAtT2, positionsAsteroidAtT3, T1, T2, T3, W, H) => {
    
    helpers.mapIntersectKey(positionsAsteroidAtT1, positionsAsteroidAtT2).filter(asteroidLetter => !positionsAsteroidAtT3.has(asteroidLetter)).forEach(asteroidLetter => {

        const arraySpeedOfAsteroid = game.calculateArraySpeedOfAsteroid(positionsAsteroidAtT1.get(asteroidLetter), positionsAsteroidAtT2.get(asteroidLetter), T1, T2);

        const newAsteroidPosition = game.calculatingAsteroidMoove(T2, T3, arraySpeedOfAsteroid, positionsAsteroidAtT2.get(asteroidLetter));

        if (game.positionIsInSky(newAsteroidPosition, W, H)) {
            positionsAsteroidAtT3.set(asteroidLetter, newAsteroidPosition);
        }

    });

}

game.calculateArraySpeedOfAsteroid = (arrayPositionOfOneAsteroidAtT1, arrayPositionOfOneAsteroidAtT2, T1, T2) => {
 
    const [xT1, yT1] = arrayPositionOfOneAsteroidAtT1;
    const [xT2, yT2] = arrayPositionOfOneAsteroidAtT2;
 
    const diffTime = T2 - T1;
 
    return [(xT2 - xT1)/diffTime, (yT2 - yT1)/diffTime];

}

game.calculatingAsteroidMoove = (T2, T3, arraySpeedOfAsteroid, positionOfOneAsteroidAtT2) => {

    const durationOfTheMoove = T3 - T2;

    const calculNewPosition = (position, speed) => {
        return Math.floor(position + (speed * durationOfTheMoove));
    }

    return [calculNewPosition(positionOfOneAsteroidAtT2[0], arraySpeedOfAsteroid[0]), calculNewPosition(positionOfOneAsteroidAtT2[1], arraySpeedOfAsteroid[1])];

}

game.positionIsInSky = (arrayPosition, width, height) => {

    if (arrayPosition[0] < 0 || arrayPosition[0] >= width) {
        return false;
    }

    if (arrayPosition[1] < 0 || arrayPosition[1] >= height - 1) {
        return false;
    }

    return true;

}