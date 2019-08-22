import { StarObject } from './pibble-object.model';

export class PibbleSetup {
    isSetUp: Boolean;
    precision: number;
    isCelestialPoleSet: boolean;
    isSecondStarSet: boolean;
    isThirdStarSet: boolean;
    secondStar: StarObject;
    thirdStar: StarObject;

    constructor(secondStar: StarObject, thirdStar: StarObject) {
        this.secondStar = secondStar;
        this.thirdStar = thirdStar;
    }
}