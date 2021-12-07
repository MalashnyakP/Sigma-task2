import { ISortAlgorithm } from "./ISortAlgorithm";

export class BubbleSort implements ISortAlgorithm {
    public sort<T extends object, U extends keyof T>(
        array: T[],
        field: U,
        order: string = "asc"
    ): void {
        for (let i = 0; i < array.length; i++) {
            for (let j = 0; j < array.length - 1; j++) {
                if (order === "desc") {
                    if (array[j][field] < array[j + 1][field]) {
                        [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    }
                } else {
                    if (array[j][field] > array[j + 1][field]) {
                        [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    }
                }
            }
        }
    }
}
