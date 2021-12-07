import { ISearchAlgorithm } from "./ISearchAlgorithm";

export class ExponentialSearch implements ISearchAlgorithm {
    search<T extends object, U extends keyof T>(
        array: T[],
        searchValue: any,
        field: U
    ): T[] {
        const foundAirports: T[] = [];

        while (array[0][field] === searchValue) {
            foundAirports.push(array[0]);
            array.shift();
        }

        let i = 1;
        while (i < array.length && array[i][field] < searchValue) {
            i *= 2;
        }

        foundAirports.push(
            ...this.binarySearch(
                array,
                i / 2,
                Math.min(i, array.length - 1),
                searchValue,
                field
            )
        );

        return foundAirports;
    }

    private binarySearch<T extends object, U extends keyof T>(
        array: T[],
        left: number,
        right: number,
        searchValue: any,
        field: U
    ): T[] {
        const subArray = array.slice(left, right);

        const lowerBound = this.findLowerBound(subArray, searchValue, field);
        const upperBound = this.findUpperBound(subArray, searchValue, field);

        if (lowerBound !== -1 && upperBound !== -1) {
            return array.slice(lowerBound, upperBound + 1);
        } else if (lowerBound === -1 && upperBound !== -1) {
            return [array[upperBound]];
        } else if (upperBound === -1 && lowerBound !== -1) {
            return [array[lowerBound]];
        }

        return subArray.slice(lowerBound, upperBound);
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
