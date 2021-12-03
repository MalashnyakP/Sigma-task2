import { ISearchAlgorithm } from "./ISearchAlgorithm";

export class LinearSearch implements ISearchAlgorithm {
    search<T extends object, U extends keyof T>(
        array: T[],
        searchValue: any,
        field: U
    ): T[] {
        const foundObjects: T[] = [];

        for (let i = 0; i < array.length; i++) {
            if (array[i][field] === searchValue) {
                foundObjects.push(array[i]);
            }
        }
        return foundObjects;
    }
}
