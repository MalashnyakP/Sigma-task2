import yargs from "yargs";
import { hideBin } from "yargs/helpers";

export class YargsService {
    public static configureYargs() {
        const actions: ReadonlyArray<string> = ["sort", "search"];
        const orders: ReadonlyArray<string> = ["asc", "desc"];
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

        const argv = yargs(hideBin(process.argv))
            .option({
                action: {
                    choices: actions,
                    alias: "a",
                    demandOption: "true",
                    describe: "Choose which action to perform",
                },
                key: {
                    choices: keys,
                    alias: "k",
                    demandOption: "true",
                    describe: "Choose on which field perform action",
                },
                search_value: {
                    type: "string",
                    alias: "v",
                    describe: "Enter value to search",
                },
                order: {
                    choices: orders,
                    alias: "o",
                    default: orders[0],
                    describe: "Choose order of sorting",
                },
            })
            .parseSync();

        return argv;
    }
}
