export class Airport {
    constructor(
        public id: string, 
        public name: string, 
        public city: string,
        public country: string, 
        public IATA: string, 
        public ICAO: string, 
        public latitude: string, 
        public lontitude: string,
        public altitude: string, 
        public timezone: string, 
        public DST: string, 
        public tz: string, 
        public type: string, 
        public source: string
        ) {}
}
