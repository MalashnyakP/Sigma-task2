import { ISortAlgorithm } from './ISortAlgorithm';
import { Airport } from '../models/Airport';

export class HeapSort implements ISortAlgorithm {
    sort(array: Airport[], field: keyof Airport, order: string = 'asc'): void {
        const startDate = performance.now();

        array = array.slice();

        const size = array.length;
        for (let i = Math.floor(size / 2 - 1); i >= 0; i--) {
            this.heapify(array, size, i, field, order);
        }
    
        for (let i = size - 1; i >= 0; i--) {
            [array[0], array[i]] = [array[i], array[0]];
    
            this.heapify(array, i, 0, field, order);
        }
        
        console.log(`Heap sort spent: ${performance.now() - startDate} miliseconds.`);
    }

    private heapify(array: Airport[], size: number, i: number, key: keyof Airport, order: string) {
        let max = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
      
        if (left < size && (order === 'desc' ?  array[left][key] < array[max][key] : array[left][key] > array[max][key]))
          max = left;
      
        if (right < size &&  (order === 'desc' ? array[right][key] < array[max][key] : array[right][key] > array[max][key]))
          max = right;
      
        if (max !== i) {
          [array[i], array[max]] = [array[max], array[i]];

          this.heapify(array, size, max, key, order);
        }
    }
}
