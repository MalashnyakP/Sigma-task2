import * as path from 'path';
import { fileURLToPath } from 'url';
import * as process from 'process';

import { Airport } from './models/Airport';

import { BubbleSort } from './sort-algorithms/bubble.js';
import { QuickSort } from './sort-algorithms/quick.js';
import { MergeSort } from './sort-algorithms/merge.js';
import { HeapSort } from './sort-algorithms/heap.js';

import { BinarySearch } from './search-algorithms/binary.js';
import { ExponentialSearch } from './search-algorithms/exponential.js';
import { FrontNBackSearch } from './search-algorithms/frontAndBack.js';
import { LinearSearch } from './search-algorithms/linear.js';

import { FSService } from './services/fs.js';
import { YargsService } from './services/yargs.js'

class Main {
    public static main(): void {
        const filePath = path.join(path.resolve('..'), 'dataset', 'airports.dat');
        const array =  FSService.read(filePath);

        const argv = YargsService.configureYargs();

        switch (argv.action) {
            case "sort": {
                const field = argv.key;
                const order = argv?.order;

                new BubbleSort().sort(array, field, order);
                new MergeSort().sort(array, field, order);
                new QuickSort().sort(array, field, order);
                new HeapSort().sort(array, field, order);

                break;
            }

            case "search": {
                const searchField = argv.key as keyof Airport;

                if (!argv.search_value) {
                    console.log("Please enter a value to search.");
                    break;
                }
                const searchValue = argv.search_value;

                new LinearSearch().search(array, searchValue, searchField);
                new FrontNBackSearch().search(array, searchValue, searchField);

                //Need sorted array for next 2 algorithms
                const sortedArray = array.sort((a, b) => {
                    const aValue = a[searchField];
                    const bValue = b[searchField];
                    if (aValue > bValue) return 1;
                    if (aValue < bValue) return -1;
                    return 0;
                });

                new BinarySearch().search(sortedArray, searchValue, searchField);
                new ExponentialSearch().search(sortedArray, searchValue, searchField);

                break;
            }
        }
    }
}

if (process.argv[1].split('.')[0] === fileURLToPath(import.meta.url).split('.')[0]) {
    Main.main();
}
