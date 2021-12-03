import { ISearchAlgorithm } from "./ISearchAlgorithm";

export class FrontNBackSearch implements ISearchAlgorithm {
    search<T extends object, U extends keyof T>(
        array: T[],
        searchValue: any,
        field: U
    ): T[] {
        const foundObjects: T[] = [];
        let front = 0;
        let back = array.length - 1;

        while (front <= back) {
            if (array[front][field] === searchValue) {
                foundObjects.push(array[front]);
            }

            if (array[back][field] === searchValue) {
                foundObjects.push(array[back]);
            }

            front++;
            back--;
        }

        return foundObjects;
    }
}
