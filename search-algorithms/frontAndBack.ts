import { Airport } from '../models/Airport';
import { ISearchAlgorithm } from './ISearchAlgorithm';

export class FrontNBackSearch implements ISearchAlgorithm {
    search(array: Airport[], searchValue: string, field: keyof Airport = 'name'): Airport[] {
        const startTime = performance.now();
        const foundAirports: Airport[] = [];

        let front = 0;
        let back =  array.length - 1;

        while (front <= back) {
            if (array[front][field] === searchValue) {
                foundAirports.push(array[front]);
            }

            if (array[back][field] === searchValue) {
                foundAirports.push(array[back]);
            }

            front++;
            back--;
        }

        console.log(`Front and back search spent: ${startTime - performance.now()} to find ${foundAirports.length} entries.`);

        return foundAirports;
    }
}
