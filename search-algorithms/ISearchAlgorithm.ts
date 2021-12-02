import { Airport } from '../models/Airport';

export interface ISearchAlgorithm {
    search(array: Airport[], searchValue: string, field?: keyof Airport): Airport[];
}
