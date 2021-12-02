import * as path from 'path';
import { fileURLToPath } from 'url';
import * as process from 'process';

import { Airport } from './models/Airport';

import { ISortAlgorithm } from './sort-algorithms/ISortAlgorithm';
import { BubbleSort } from './sort-algorithms/bubble.js';
import { QuickSort } from './sort-algorithms/quick.js';
import { MergeSort } from './sort-algorithms/merge.js';
import { HeapSort } from './sort-algorithms/heap.js';

import { ISearchAlgorithm } from './search-algorithms/ISearchAlgorithm';
import { BinarySearch } from './search-algorithms/binary.js';
import { ExponentialSearch } from './search-algorithms/exponential.js';
import { FrontNBackSearch } from './search-algorithms/frontAndBack.js';
import { LinearSearch } from './search-algorithms/linear.js';

import { FSService } from './services/fs.js';

class Main {
    public static main(): void {
        let sortAlgorithm: ISortAlgorithm;
        let searchAlgorithm: ISearchAlgorithm;

        const filePath = path.join(path.resolve('..'), 'dataset', 'airports.dat');
        const array =  FSService.read(filePath);

        const fieldToSort = 'ee';
        const order = 'asc';

        if (this.isFieldOf(fieldToSort, array[0])) {
            sortAlgorithm = new BubbleSort();
            sortAlgorithm.sort(array, fieldToSort, order);
            sortAlgorithm = new MergeSort();
            sortAlgorithm.sort(array, fieldToSort, order);
            sortAlgorithm = new QuickSort();
            sortAlgorithm.sort(array, fieldToSort, order);
            sortAlgorithm = new HeapSort();
            sortAlgorithm.sort(array, fieldToSort, order);
        } else {
            console.log(`No ${fieldToSort} property in Airport.`);
        }

        const searchField = 'country';
        const searchValue = 'Ukraine';

        if (this.isFieldOf(searchField, array[0])) {
            searchAlgorithm = new LinearSearch();
            searchAlgorithm.search(array, searchValue, searchField);
            searchAlgorithm = new FrontNBackSearch();
            searchAlgorithm.search(array, searchValue, searchField);

            const sortedArray = array.sort((a, b) => {
                const aValue = a[searchField];
                const bValue = b[searchField];
                if (aValue > bValue) return 1;
                if (aValue < bValue) return -1;
                return 0;
            });

            searchAlgorithm = new BinarySearch();
            searchAlgorithm.search(sortedArray, searchValue, searchField);
            searchAlgorithm = new ExponentialSearch();
            searchAlgorithm.search(sortedArray, searchValue, searchField);
        } else {
            console.log(`No ${fieldToSort} property in Airport.`);
        }
    }

    private static isFieldOf(key: string, airport: Airport): boolean {
        if (!(key in airport)) {
            return false;
        }

        return true;
    }
}

if (process.argv[1].split('.')[0] ===  fileURLToPath(import.meta.url).split('.')[0]) {
    Main.main();
}
