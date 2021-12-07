export interface ISearchAlgorithm {
    search<T extends object, U extends keyof T>(
        array: T[],
        searchValue: string,
        field: U
    ): T[];
}
