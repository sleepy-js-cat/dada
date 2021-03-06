'use strict';
import seedrandom from 'seedrandom';

const seed = 'Expecto Patronum'
const randomNumberGenerator  = seedrandom(seed);

/**
 * Credit for shuffle function: https://bost.ocks.org/mike/shuffle/
 * https://github.com/mbostock
 *
 * @todo REPLACE WITH LODASH SHUFFLE
 */

export default function shuffle(array) {
    let m = array.length
    let t
    let i

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(randomNumberGenerator() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }

    return array;
}
