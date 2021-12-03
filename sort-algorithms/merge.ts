import { ISortAlgorithm } from "./ISortAlgorithm";

export class MergeSort implements ISortAlgorithm {
    public sort<T extends object, U extends keyof T>(
        array: T[],
        field: U,
        order: string = "asc"
    ): void {
        array = MergeSort.mergeSort(array, field, order);
    }

    private static mergeSort<T extends object, U extends keyof T>(
        array: T[],
        field: U,
        order: string
    ): T[] {
        if (array.length < 2) {
            return array;
        }

        const halfIndex = Math.floor(array.length / 2);
        const leftHalf = array.slice(0, halfIndex);
        const rightHalf = array.slice(halfIndex);

        return MergeSort.merge(
            MergeSort.mergeSort(leftHalf, field, order),
            MergeSort.mergeSort(rightHalf, field, order),
            field,
            order
        );
    }

    private static merge<T extends object, U extends keyof T>(
        left: T[],
        right: T[],
        field: U,
        order: string
    ): T[] {
        let array: T[] = [];
        let i: number = 0,
            j: number = 0;

        while (i < left.length && j < right.length) {
            if (order === "desc") {
                array.push(
                    left[i][field] > right[j][field] ? left[i++] : right[j++]
                );
            } else {
                array.push(
                    left[i][field] < right[j][field] ? left[i++] : right[j++]
                );
            }
        }

        return [...array, ...left.slice(i), ...right.slice(j)];
    }
}
