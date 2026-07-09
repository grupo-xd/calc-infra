import type { UTPCableCategory } from "./UTPCableCategory";

export interface PatchCords {
    defaultSize : number,
    color : Color
    cableCategory : UTPCableCategory,
    quantity : number
}

type Color = "Azul" | "Amarelo" | "Branco";