import * as path from 'path';

import { Airport } from './models/Airport';
import { ISortAlgorithm } from './sort.algorithms/ISortAlgorithm';
import { BubbleSort } from './sort.algorithms/bubble.sort';
import { QuickSort } from './sort.algorithms/quick.sort';
import { MergeSort } from './sort.algorithms/merge.sort';
import { HeapSort } from './sort.algorithms/heap.sort';
import { FSService } from './services/fs.service';

class Main {
    public static main(): void {
        let sortAlgorithm: ISortAlgorithm;

        const filePath = path.join(process.cwd(), 'dataset', 'airports.dat');
        const array =  FSService.read(filePath);

        const fieldToSort = 'name';
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
    }

    private static isFieldOf(key: string, airport: Airport): boolean {
        if (!(key in airport)) {
            return false;
        }

        return true;
    }
}

Main.main();
