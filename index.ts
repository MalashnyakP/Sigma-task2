import * as path from "path";
import { fileURLToPath } from "url";
import * as process from "process";

import { Airport } from "./models/Airport";

import { ISortAlgorithm } from "./sort-algorithms/ISortAlgorithm";
import { BubbleSort } from "./sort-algorithms/bubble.js";
import { QuickSort } from "./sort-algorithms/quick.js";
import { MergeSort } from "./sort-algorithms/merge.js";
import { HeapSort } from "./sort-algorithms/heap.js";

import { ISearchAlgorithm } from "./search-algorithms/ISearchAlgorithm";
import { BinarySearch } from "./search-algorithms/binary.js";
import { ExponentialSearch } from "./search-algorithms/exponential.js";
import { FrontNBackSearch } from "./search-algorithms/frontAndBack.js";
import { LinearSearch } from "./search-algorithms/linear.js";

import { FSService } from "./services/fs.js";
import { YargsService } from "./services/yargs.js";

class Main {
    public static main(): void {
        const filePath = path.join(
            path.resolve(".."),
            "dataset",
            "airports.dat"
        );
        const array = FSService.read(filePath);

        const argv = YargsService.configureYargs();

        switch (argv.action) {
            case "sort": {
                const fieldToSort = argv.key;
                const order = argv?.order;

                let timeToSort: number;
                timeToSort = this.sortTimer<Airport, keyof Airport>(
                    new BubbleSort(),
                    array.slice(),
                    fieldToSort,
                    order
                );
                console.log(`Bubble sort spent: ${timeToSort} miliseconds.`);
                timeToSort = this.sortTimer<Airport, keyof Airport>(
                    new MergeSort(),
                    array.slice(),
                    fieldToSort,
                    order
                );
                console.log(`Merge sort spent: ${timeToSort} miliseconds.`);
                timeToSort = this.sortTimer<Airport, keyof Airport>(
                    new QuickSort(),
                    array.slice(),
                    fieldToSort,
                    order
                );
                console.log(`Quick sort spent: ${timeToSort} miliseconds.`);
                timeToSort = this.sortTimer<Airport, keyof Airport>(
                    new HeapSort(),
                    array.slice(),
                    fieldToSort,
                    order
                );
                console.log(`Heap sort spent: ${timeToSort} miliseconds.`);
                break;
            }

            case "search": {
                const searchField = argv.key as keyof Airport;

                if (!argv.search_value) {
                    console.log("Please enter a value to search.");
                    break;
                }
                const searchValue = argv.search_value;
                let timeToSearch;
                timeToSearch = this.searchTimer<Airport, keyof Airport>(
                    new LinearSearch(),
                    array,
                    searchValue,
                    searchField
                );
                console.log(
                    `Linear search spent: ${timeToSearch.time} to find ${timeToSearch.countFoundObjects} entries.`
                );
                timeToSearch = this.searchTimer<Airport, keyof Airport>(
                    new FrontNBackSearch(),
                    array,
                    searchValue,
                    searchField
                );
                console.log(
                    `Front and back search spent: ${timeToSearch.time} to find ${timeToSearch.countFoundObjects} entries.`
                );

                // next 2 algorithms require sorted array
                const sortedArray = array.sort(
                    <T extends object, U extends keyof T>(a: T, b: T) => {
                        const aValue = a[searchField as U];
                        const bValue = b[searchField as U];
                        if (aValue > bValue) return 1;
                        if (aValue < bValue) return -1;
                        return 0;
                    }
                );

                timeToSearch = this.searchTimer<Airport, keyof Airport>(
                    new BinarySearch(),
                    array,
                    searchValue,
                    searchField
                );
                console.log(
                    `Binary search spent: ${timeToSearch.time} to find ${timeToSearch.countFoundObjects} entries.`
                );
                timeToSearch = this.searchTimer<Airport, keyof Airport>(
                    new ExponentialSearch(),
                    array,
                    searchValue,
                    searchField
                );
                console.log(
                    `Exponential search spent: ${timeToSearch.time} to find ${timeToSearch.countFoundObjects} entries.`
                );
                break;
            }
        }
    }

    private static sortTimer<T extends object, U extends keyof T>(
        callback: ISortAlgorithm,
        array: T[],
        field: U,
        order: string = "asc"
    ): number {
        const startTime = performance.now();
        callback.sort(array, field, order);
        return performance.now() - startTime;
    }

    private static searchTimer<T extends object, U extends keyof T>(
        callback: ISearchAlgorithm,
        array: T[],
        searchValue: string,
        field: U
    ) {
        const startTime = performance.now();
        const foundObjects = callback.search(array, searchValue, field);
        return {
            time: performance.now() - startTime,
            countFoundObjects: foundObjects.length,
        };
    }
}

if (process.argv[1].split(".")[0] === fileURLToPath(import.meta.url).split(".")[0]) {
    Main.main();
}
