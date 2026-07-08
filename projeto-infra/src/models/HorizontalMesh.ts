import type { AccessPoints } from "./AccessPoints";

export class HorizontalMesh {
    private defaultDistance: number;
    private cableCategory: UTPCableCategory;
    private accessPoints: AccessPoints;
    private femaleRJ45Conectors: number;

    private static cableCategories = [
        { name: "Cat5e", speed: 1, maxDistance: 100 },
        { name: "Cat6", speed: 10, maxDistance: 55 },
        { name: "Cat6A", speed: 10, maxDistance: 100 },
        { name: "Cat7", speed: 10, maxDistance: 100 },
        { name: "Cat8", speed: 40, maxDistance: 30 },
    ];

    public getDefaultDistance(): number {
        return this.defaultDistance;
    }

    public getCableCategory(): UTPCableCategory {
        return this.cableCategory;
    }

    public getAccessPoints(): AccessPoints {
        return this.accessPoints;
    }

    public setDefaultDistance(defaultDistance: number): void {
        this.defaultDistance = defaultDistance;
    }

    public setCableCategory(cableCategory: UTPCableCategory): void {
        this.cableCategory = cableCategory;
    }

    public setAccessPoints(accessPoints: AccessPoints): void {
        return this.accessPoints = accessPoints;
    }

    public findCategory(maxDistance: number, speed: number): UTPCableCategory {
        const candidatos = HorizontalMesh.cableCategories.
            filter((cable) => {
                cable.speed >= speed &&
                    cable.maxDistance >= maxDistance
            })

        if (candidatos.length === 0) {
            throw new Error(
                `Nenhuma categoria de cabo encontrada para ${maxDistance}m e ${speed}Gpbs`
            );
        }

        return candidatos.reduce((melhor, atual) => {
            if (atual.maxDistance !== melhor.maxDistance) {
                atual.maxDistance < melhor.maxDistance ? atual : melhor;
            }
            atual.speed < melhor.speed ? atual : melhor;
        })
    }


}