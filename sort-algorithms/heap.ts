import { ISortAlgorithm } from "./ISortAlgorithm";

export class HeapSort implements ISortAlgorithm {
    sort<T extends object, U extends keyof T>(
        array: T[],
        field: U,
        order: string = "asc"
    ): void {
        const size = array.length;
        for (let i = Math.floor(size / 2 - 1); i >= 0; i--) {
            HeapSort.heapify(array, size, i, field, order);
        }

        for (let i = size - 1; i >= 0; i--) {
            [array[0], array[i]] = [array[i], array[0]];
            HeapSort.heapify(array, i, 0, field, order);
        }
    }

    private static heapify<T extends object, U extends keyof T>(
        array: T[],
        size: number,
        i: number,
        key: U,
        order: string
    ) {
        let max = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < size) {
            if (order === "desc") {
                if (array[left][key] < array[max][key]) {
                    max = left;
                }
            } else {
                if (array[left][key] > array[max][key]) {
                    max = left;
                }
            }
        }

        if (right < size) {
            if (order === "desc") {
                if (array[right][key] < array[max][key]) {
                    max = right;
                }
            } else {
                if (array[right][key] > array[max][key]) {
                    max = right;
                }
            }
        }

        if (max !== i) {
            [array[i], array[max]] = [array[max], array[i]];
            HeapSort.heapify(array, size, max, key, order);
        }
    }
}
