import { ISortAlgorithm } from './ISortAlgorithm';
import { Airport } from '../models/Airport';

export class BubbleSort implements ISortAlgorithm {
    public sort(array: Airport[], field: keyof Airport, order: string = 'asc'): void {
        const startDate = performance.now();

        array = array.slice();

        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - 1; j++) {
                if (order === 'desc' ? array[j][field] < array[j + 1][field] : array[j][field] > array[j + 1][field]) {
                    [array[j], array[j + 1]] = [array[j + 1], array[j]];
                }
            }
        }

        console.log(`Bubble sort spent: ${performance.now() - startDate} miliseconds.`);
    }
}
