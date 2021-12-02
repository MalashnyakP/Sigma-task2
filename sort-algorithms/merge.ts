import { ISortAlgorithm } from './ISortAlgorithm';
import { Airport } from '../models/Airport';

export class MergeSort implements ISortAlgorithm {
    public sort(array: Airport[], field: keyof Airport, order: string = 'asc'): void {
        const start = performance.now();

        array = array.slice();

        array = this.mergeSort(array, field, order);

        console.log(`Merge sort spent: ${performance.now() - start} milliseconds.`);
    }

    private mergeSort(array: Airport[], field: keyof Airport, order: string): Airport[] {
        if (array.length < 2) {
            return array;
        }

        const halfIndex = Math.floor(array.length / 2);
        const leftHalf = array.slice(0, halfIndex);
        const rightHalf = array.slice(halfIndex);

        return this.merge(this.mergeSort(leftHalf, field, order),this.mergeSort(rightHalf, field, order), field, order);
    }

    private merge(left: Airport[], right: Airport[], field: keyof Airport, order: string): Airport[] {
        let array: Airport[] = [];
        let i: number = 0, j: number = 0;

        while (i < left.length && j < right.length) {
            if (order === 'desc') {
                array.push(left[i][field] > right[j][field] ? left[i++] : right[j++]);
            } else {
                array.push(left[i][field] < right[j][field] ? left[i++] : right[j++]);
            }
        }

        return [...array, ...left.slice(i), ...right.slice(j)];
    }
}
