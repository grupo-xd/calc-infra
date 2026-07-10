import type { UTPCableCategory } from "../interfaces/UTPCableCategory";
import type { AccessPoints } from "../interfaces/AccessPoints";

export class HorizontalMesh {
    private defaultDistance : number;
    private cableCategory : UTPCableCategory;
    private accessPoints : AccessPoints;
    private horizontalMeshTag : number;

    private static cableCategories : UTPCableCategory[] = [
        { type: "Cat5e", maxSpeedGbps: 1, maxDistance: 100 },
        { type: "Cat6", maxSpeedGbps: 10, maxDistance: 55 },
        { type: "Cat6A", maxSpeedGbps: 10, maxDistance: 100 },
        { type: "Cat7", maxSpeedGbps: 10, maxDistance: 100 },
        { type: "Cat8", maxSpeedGbps: 40, maxDistance: 30 },
    ];

    constructor(defaultDistance : number, cableCategory : UTPCableCategory, accessPoints : AccessPoints, horizontalMeshTag : number) {
        this.defaultDistance = defaultDistance;
        this.cableCategory = cableCategory;
        this.accessPoints = accessPoints;
        this.horizontalMeshTag = horizontalMeshTag;
    }

    public getDefaultDistance(): number {
        return this.defaultDistance;
    }

    public getCableCategory(): UTPCableCategory {
        return this.cableCategory;
    }

    public getAccessPoints(): AccessPoints {
        return this.accessPoints;
    }

    public getHorizontalMeshTag() : number{
        return this.horizontalMeshTag;
    }

    public setDefaultDistance(defaultDistance: number): void {
        this.defaultDistance = defaultDistance;
    }

    public setCableCategory(cableCategory: UTPCableCategory): void {
        this.cableCategory = cableCategory;
    }

    public setAccessPoints(accessPoints: AccessPoints): void {
        this.accessPoints = accessPoints;
    }

    public setHorizontalMeshTag(horizontalMeshTag : number) : void{
        this.horizontalMeshTag = horizontalMeshTag;
    }

    public static findCategory(maxDistance: number, speed: number): UTPCableCategory {
        const candidates = HorizontalMesh.cableCategories.
            filter((cable) => {
                return cable.maxSpeedGbps >= speed && cable.maxDistance >= maxDistance
            })

        if (candidates.length === 0) {
            throw new Error(
                `Nenhuma categoria de cabo encontrada para ${maxDistance}m e ${speed}Gpbs`
            );
        }

        return candidates.reduce((best, current) => {
            if (current.maxDistance !== best.maxDistance) {
                current.maxDistance < best.maxDistance ? current : best;
            }
            return current.maxSpeedGbps < best.maxSpeedGbps ? current : best;
        })
    }
}