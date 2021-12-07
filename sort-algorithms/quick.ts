import { ISortAlgorithm } from "./ISortAlgorithm";

export class QuickSort implements ISortAlgorithm {
    sort<T extends object, U extends keyof T>(
        array: T[],
        field: U,
        order: string = "asc"
    ): void {
        QuickSort.partition(array, 0, array.length, field, order);
    }

    private static partition<T extends object, U extends keyof T>(
        array: T[],
        start: number,
        end: number,
        key: U,
        order: string = "asc"
    ): void {
        const lenght = end - start;
        if (lenght < 2) return;

        const pivotIndex = Math.floor((start + end) / 2);
        [array[start], array[pivotIndex]] = [array[pivotIndex], array[start]];
        const pivot = array[start][key];
        let pivotRank = start;

        for (let index = start + 1; index < end; index++) {
            if (
                order === "desc"
                    ? array[index][key] > pivot
                    : array[index][key] < pivot
            ) {
                pivotRank++;
                [array[index], array[pivotRank]] = [array[pivotRank], array[index]];
            }
        }

        if (pivotRank !== start) {
            [array[pivotRank], array[start]] = [array[start], array[pivotRank]];
        }

        QuickSort.partition(array, start, pivotRank, key, order);
        QuickSort.partition(array, pivotRank + 1, end, key, order);
    }
}
