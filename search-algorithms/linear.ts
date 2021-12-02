import { Airport } from '../models/Airport';
import { ISearchAlgorithm } from './ISearchAlgorithm';

export class LinearSearch implements ISearchAlgorithm {
    search(array: Airport[], searchValue: string, field: keyof Airport = 'name'): Airport[] {
        const startTime = performance.now();
        const foundAirports: Airport[] = [];

        for (let i = 0; i < array.length; i++) {
            if (array[i][field] === searchValue) {
                foundAirports.push(array[i]);
            }
        }

        console.log(`Linear search spent: ${startTime - performance.now()} to find ${foundAirports.length} entries.`);

        return foundAirports;
    }
}
