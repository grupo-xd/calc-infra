import type { UTPCableCategory } from "./UTPCableCategory";

export interface PatchCables {
    defaultSize : number,
    color : Color,
    cableCategory : UTPCableCategory,
    quantity : number
}

type Color = "Azul" | "Amarelo" | "Vermelho";