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
    size_max: String;
    size_min: String;
    position_angle: Number;
    class: String;
    nsts: Number;
    brstr: String;
    bchm: String;
    ngc_description: String;
    notes: String;
}

export class StarObject {
    id: Number;
    name: String;
    hip: Number;
    hd: Number;
    hr: Number;
    gl: String;
    bf: String;
    right_ascension: Number;
    declination: Number;
    distance: Number;
    pmra: Number;
    pmdec: Number;
    rv: Number;
    magnitude: Number;
    absmag: Number;
    spect: String;
    ci: Number;
    coord_x: Number;
    coord_y: Number;
    coord_z: Number;
    coord_vx: Number;
    coord_vy: Number;
    coord_vz: Number;
    rarad: Number;
    decrad: Number;
    pmrarad: Number;
    pmdecrad: Number;
    bayer: String;
    flam: Number;
    constellation: String;
    comp: Number;
    comp_prim: Number;
    base: String;
    lum: Number;
    var: String;
    var_min: Number;
    var_max: Number;
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