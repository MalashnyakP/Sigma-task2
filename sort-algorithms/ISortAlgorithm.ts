import { Airport } from '../models/Airport';

export interface ISortAlgorithm {
    sort(array: Airport[], field: string, order?: string): void;
}
