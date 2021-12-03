export interface ISortAlgorithm {
    sort<T extends object, U extends keyof T>(
        array: T[],
        field: U,
        order?: string
    ): void;
}
