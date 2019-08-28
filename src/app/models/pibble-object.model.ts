export class DeepSkyObject {
    id: Number;
    name: String;
    other: String;
    type: String;
    constellation: String;
    right_ascension: String;
    declination: String;
    magnitude: String;
    surface_brightness: String;
    u2k: Number;
    tirion_atlas: Number;
    
}

export class StarObject {
    id: Number;
    name: String
}

export class UserObject {
    id: Number;
    name: String;
    right_ascension: String;
    declination: String;
    description: String;
}

export class SolarSystemObject {
    name: String;
    right_ascension: String;
    declination: String;
}