import type { InfraForm } from "../hooks/useInfraForm";
import type { AccessPoints } from "../interfaces/AccessPoints";
import type { PatchCords } from "../interfaces/PatchCords";
import type { UTPCableCategory } from "../interfaces/UTPCableCategory";
import type { PatchCables } from "../interfaces/PatchCables";
import { Backbone } from "../models/Backbone";
import { HorizontalMesh } from "../models/HorizontalMesh";
import { WorkArea } from "../models/WorkArea";
import { Floor } from "../models/Floor";
import { SEQ } from "../models/SEQ";
import { SET } from "../models/SET";

export function objectInstantiation(
    form : InfraForm
) {
    const accessPoints : AccessPoints = {
        data : form.pontosData,
        voice : form.pontosVoice,
        security : form.pontosSecurity,
    }

    const totalPoints = form.pontosData + form.pontosVoice + form.pontosSecurity;

    const utpCableCategory : UTPCableCategory = {
        type: form.categoriaCabo,
        maxSpeedGbps: 0,
        maxDistance: 0,
    }
    const horizontalMesh = new HorizontalMesh(
        form.medidaMH,
        utpCableCategory, 
        accessPoints,
        totalPoints * 2
    )

    const patchCords : PatchCords[] = [];
    const PatchCables : PatchCables[] = [];

    
    const workArea = new WorkArea(patchCords, totalPoints / 2, totalPoints * 1.5);
    
    const backbone = new Backbone();
    //backbone.setCategory(form.tipoFibra);

    const floor : Floor[] = [];

    const totalAndares : number = form.numPavimentosBackbone > 0 ? form.numPavimentosBackbone : form.numPavimentosMH;
    const set = new SET();
    const seq = new SEQ();

    for(let i : number = 0; i < totalAndares; i++){
        floor.push(new Floor(set, horizontalMesh, backbone, workArea));
    }
}