import { ISortAlgorithm } from './ISortAlgorithm';
import { Airport } from '../models/Airport';

export class QuickSort implements ISortAlgorithm {
    sort(array: Airport[], field: keyof Airport, order: string = 'asc'): void {
        const startDate = performance.now();
    
        array = array.slice();
        let key = field as keyof Airport;
        
        this.partition(array, 0, array.length, key, order);
        
        console.log(`Quicksort spent: ${performance.now() - startDate} mileseconds.`);      
    }

    private partition(array: Airport[], start: number, end: number, key: keyof Airport, order: string = 'asc'): void {
        const lenght = end - start;

        if (lenght < 2) return;

        const pivotIndex = start + Math.floor(Math.random() * lenght);
        [array[start], array[pivotIndex]] = [array[pivotIndex], array[start]];

        const pivot = array[start][key];
        let pivotRank = start;

        for (let index = start + 1; index < end; index++) {
            if (order === 'desc' ? array[index][key] > pivot : array[index][key] < pivot) {
              pivotRank++;
              [array[index], array[pivotRank]] = [array[pivotRank], array[index]];
            }
        }

        if (pivotRank !== start) {
            [array[pivotRank], array[start]] = [array[start], array[pivotRank]];
        }

        this.partition(array, start, pivotRank, key, order);
        this.partition(array, pivotRank + 1, end, key, order);
    }    
}
