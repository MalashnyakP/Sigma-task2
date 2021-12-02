import { fileURLToPath } from 'url';
import * as process from 'process';

class Main {
    public static main(): void {
    }
}

if (process.argv[1].split('.')[0] ===  fileURLToPath(import.meta.url).split('.')[0]) {
    Main.main();
}
