import * as fs from 'fs';

import { Airport } from '../models/Airport'

export class FSService {
    public static read(path: string): Airport[] {
        const readLines = fs.readFileSync(path, 'utf-8').split('\n');
        const airports: Airport[] = [];

        readLines.forEach((line) => airports.push(this.toAirport(line)));

        return airports;
    }

    private static toAirport(line: string): Airport {
        const properties: string[] = line.split(',').map((value) => {
            return value.replaceAll(new RegExp('"', 'g'), '').trim();
        });
        
        return new Airport(
            properties[0],
            properties[1],
            properties[2],
            properties[3],
            properties[4],
            properties[5],
            properties[6],
            properties[7],
            properties[8],
            properties[9],
            properties[10],
            properties[11],
            properties[12],
            properties[13]
            );
    }
}
