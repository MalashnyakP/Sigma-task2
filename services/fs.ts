import * as fs from "fs";

import { Airport } from "../models/Airport";

export class FSService {
    public static read(path: string): {}[] {
        const readLines = fs.readFileSync(path, "utf-8").split("\n");
        const airports: {}[] = [];

        readLines.forEach((line) =>
            airports.push(Adapter.convertToAirportObject(line))
        );

        return airports;
    }
}

class Adapter {
    public static convertToAirportObject(line: string) {
        const properties: string[] = line.split(",").map((value) => {
            return value.replaceAll('"', "").trim();
        });

        const keys: ReadonlyArray<string> = [
            "id",
            "name",
            "city",
            "country",
            "IATA",
            "ICAO",
            "latitude",
            "lontitude",
            "altitude",
            "timezone",
            "DST",
            "tz",
            "type",
            "source",
        ];
        const airport: Airport = {};

        for (let i = 0; i < keys.length; i++) {
            airport[keys[i]] = properties[i];
        }

        return airport;
    }
}
