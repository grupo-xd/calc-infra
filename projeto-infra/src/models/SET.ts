import type { Conectors } from "../interfaces/Conectors";
import type { PatchCables } from "../interfaces/PatchCables";
import type { Pigtails } from "../interfaces/Pigtails";
import type { Rack } from "../interfaces/Rack";

export class SET{

    private patchPanel : number;
    private patchCable : PatchCables[];
    private dvr : number;
    private rack : Rack;
    private dio : number;
    private to : number;
    private pigtail : Pigtails[];
    private conectors : Conectors;

    constructor(patchPanel : number, patchCable : PatchCables[], dvr : number, rack : Rack, dio : number, to : number, pigtail : Pigtails[], conectors : Conectors) {
        this.patchPanel = patchPanel;
        this.dvr = dvr;
        this.rack = rack;
        this.dio = dio;
        this.to = to;
        this.patchCable = patchCable;     
        this.pigtail = pigtail;
        this.conectors = conectors;
    }
} 