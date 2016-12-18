import * as seedrandom from 'seedrandom';

export class Tools {
    constructor() {

    }

    public randomColor() {
        let date = new Date();
        let randomGenerator = seedrandom(String(date.getTime()), {entropy: true});

        let red = 0;
        let green = 0;
        let blue = 0;

        let fillColor = '';
        let borderColor = '';

        red = Math.floor(randomGenerator() * 255);
        green = Math.floor(randomGenerator() * 255);
        blue = Math.floor(randomGenerator() * 255);

        fillColor = 'rgba(' + red + ',' + green + ',' + blue + ',0.2)';
        borderColor = 'rgba(' + red + ',' + green + ',' + blue + ',1)';

        return [fillColor, borderColor];
    }
}