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

        type AirportKey =  'id' | 'name' | 'city' | 'country' | 'IATA' | 'ICAO'
        | 'latitude' | 'lontitude' | 'altitude' | 'timezone' | 'DST' | 'tz' | 'type' | 'source';
        const keys: ReadonlyArray<AirportKey> = ['id', 'name', 'city', 'country', 'IATA', 'ICAO',
         'latitude', 'lontitude', 'altitude', 'timezone', 'DST', 'tz', 'type', 'source'];
        const airport: Airport = {};

         for (let i = 0; i < keys.length; i++) {
            airport[keys[i]] = properties[i];
         }

        return airport;
    }
}
