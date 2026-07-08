import type { FiberCategory } from "../interfaces/FiberCategory";

export class Backbone {

    private category!: FiberCategory;

    public static fiberCategories = [
        { type: "OM1 1G SX", maxSpeedGbps: 1, maxDistance: 275 },
        { type: "OM1 1G LX", maxSpeedGbps: 1, maxDistance: 550 },

        { type: "OM2 1G SX", maxSpeedGbps: 1, maxDistance: 550 },
        { type: "OM2 1G LX", maxSpeedGbps: 1, maxDistance: 550 },

        { type: "OM3 10G SR", maxSpeedGbps: 10, maxDistance: 300 },
        { type: "OM3 25G SR", maxSpeedGbps: 25, maxDistance: 70 },
        { type: "OM3 40G SR4", maxSpeedGbps: 40, maxDistance: 100 },
        { type: "OM3 100G SR4", maxSpeedGbps: 100, maxDistance: 100 },

        { type: "OM4 10G SR", maxSpeedGbps: 10, maxDistance: 550 },
        { type: "OM4 25G SR", maxSpeedGbps: 25, maxDistance: 100 },
        { type: "OM4 40G SR4", maxSpeedGbps: 40, maxDistance: 150 },
        { type: "OM4 100G SR4", maxSpeedGbps: 100, maxDistance: 150 },

        { type: "OM5 40G SWDM4", maxSpeedGbps: 40, maxDistance: 150 },
        { type: "OM5 100G SWDM4", maxSpeedGbps: 100, maxDistance: 150 },

        { type: "OS1 10G LX",  maxSpeedGbps: 10, maxDistance: 2000 },
        { type: "OS1 10G ZR", maxSpeedGbps: 10, maxDistance: 2000 },

        { type: "OS2 10G LR", maxSpeedGbps: 10, maxDistance: 10000 },
        { type: "OS2 100G LR4", maxSpeedGbps: 100, maxDistance: 10000 },
        { type: "OS2 10G ZR", maxSpeedGbps: 10, maxDistance: 80000 },
        { type: "OS2 100G ER4", maxSpeedGbps: 100, maxDistance: 40000 },
    ];

    public setCategory(category : FiberCategory) : void {
        this.category = category;
    }

    public getCategory() : FiberCategory {
        return this.category;
    }

    public findCategory(maxDistance:number, speedGpbs:number) : FiberCategory{
        const fibras = Backbone.fiberCategories.filter(fiber =>
            fiber.maxDistance >= maxDistance &&
            fiber.maxSpeedGbps >= speedGpbs
        )

        if(fibras.length <= 0){
            throw new Error(
                `Nenhuma fibra encontrada para ${maxDistance}m e ${speedGpbs}Gbps`
            );
        }

        return fibras.reduce((melhor, atual) => {
            if(atual.maxDistance !== melhor.maxDistance){
                return atual.maxDistance < melhor.maxDistance ? atual : melhor
            }
            return atual.maxSpeedGbps < melhor.maxSpeedGbps ? atual : melhor
        });

    }
}

