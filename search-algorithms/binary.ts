import { ISearchAlgorithm } from "./ISearchAlgorithm";

export class BinarySearch implements ISearchAlgorithm {
    search<T extends object, U extends keyof T>(
        array: T[],
        searchValue: any,
        field: U
    ): T[] {
        let foundAirports: T[] = [];
        const lowerBound = this.findLowerBound(array, searchValue, field);
        const upperBound = this.findUpperBound(array, searchValue, field);

        if (lowerBound !== -1 && upperBound !== -1) {
            foundAirports = array.slice(lowerBound, upperBound + 1);
        } else if (lowerBound === -1 && upperBound !== -1) {
            foundAirports = [array[upperBound]];
        } else if (upperBound === -1 && lowerBound !== -1) {
            foundAirports = [array[lowerBound]];
        }

        return foundAirports;
    }

    private findUpperBound<T extends object, U extends keyof T>(
        array: T[],
        searchValue: any,
        field: U
    ): number {
        let left = 0;
        let right = array.length - 1;

        while (left <= right) {
            let middle = Math.floor((left + right) / 2);

            if (array[middle][field] > searchValue) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        }

        if (!array[right] || array[right][field] !== searchValue) {
            return -1;
        }

        return right;
    }

    private findLowerBound<T extends object, U extends keyof T>(
        array: T[],
        searchValue: any,
        field: U
    ): number {
        let left = 0;
        let right = array.length - 1;

        while (left <= right) {
            let middle = Math.floor((left + right) / 2);

            if (array[middle][field] >= searchValue) {
                right = middle - 1;
            } else {
                left = middle + 1;
            }
        }

        if (!array[left] || array[left][field] !== searchValue) {
            return -1;
        }

        return left;
    }
}
