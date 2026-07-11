import type { Backbone } from "../models/Backbone";
import type { HorizontalMesh } from "../models/HorizontalMesh";
import type { SET } from "../models/SET";
import type { WorkArea } from "../models/WorkArea";

import type { PatchCords } from "../interfaces/PatchCords";
import type { AccessPoints } from "../interfaces/AccessPoints";
import type { PatchCables } from "../interfaces/PatchCables";
import type { UTPCableCategory } from "../interfaces/UTPCableCategory";
import type { FiberCategory } from "../interfaces/FiberCategory";
import type { Pigtails } from "../interfaces/Pigtails";
import type { Conectors } from "../interfaces/Conectors";
import type { Rack } from "../interfaces/Rack";

export class Calculator {

    public static calculateTotal() {

    }

    public static calculateBackbone(backbones: Backbone[]) {

    }


    public static calculateHorizontalMesh(horizontalMesh: HorizontalMesh, workArea: WorkArea, networkPoints: number, cftvPoints: number, voipPoints: number) {
        // Points : HorizontalMesh
        const accessPoint: AccessPoints = {
            data: networkPoints * 2,
            security: cftvPoints * 2,
            voice: voipPoints * 2
        };
        horizontalMesh.setAccessPoints(accessPoint);

        // HorizontalMeshTags : HorizontalMesh
        horizontalMesh.setHorizontalMeshTag(networkPoints * 4);

        // PatchCords : WorkArea
        //Azul
        const patchCordsB: PatchCords = {
            defaultSize: 3,
            color: "Azul",
            cableCategory: horizontalMesh.getCableCategory(),
            quantity: ((networkPoints - cftvPoints) - voipPoints)
        }
        //Amarelo
        const patchCordsY: PatchCords = {
            defaultSize: 3,
            color: "Amarelo",
            cableCategory: horizontalMesh.getCableCategory(),
            quantity: voipPoints
        }
        //Branco
        const patchCordsW: PatchCords = {
            defaultSize: 1,
            color: "Branco",
            cableCategory: horizontalMesh.getCableCategory(),
            quantity: cftvPoints
        }
        workArea.setPatchCords([patchCordsB, patchCordsY, patchCordsW])

        // FacePlates : WorkArea
        workArea.setFacePlates(networkPoints)

        // Tags : WorkArea
        workArea.setTags((networkPoints * 2) + workArea.getFacePlates())
    }

    public static calculateSET(equipamentRoom: SET, networkPoints: number, cftvPoints: number, voipPoints: number, cableCategory: UTPCableCategory, fibers: number, fiberCategory: FiberCategory, useLC : boolean, haveExhauster : Boolean, haveFrontCableOrganizer : boolean) {
        // PatchPanel
        equipamentRoom.setPatchPanel(Math.ceil(networkPoints / 24))

        // PatchCable 
        //Azul
        const patchCableB: PatchCables = {
            defaultSize: 2.5,
            color: "Azul",
            cableCategory: cableCategory,
            quantity: (networkPoints - cftvPoints - voipPoints) * 2
        }
        //Amarelo 
        const patchCableY: PatchCables = {
            defaultSize: 2.5,
            color: "Amarelo",
            cableCategory: cableCategory,
            quantity: (voipPoints) * 2
        }
        //Vermelho
        const patchCableR: PatchCables = {
            defaultSize: 2.5,
            color: "Amarelo",
            cableCategory: cableCategory,
            quantity: (cftvPoints) * 2
        }
        equipamentRoom.setPatchCable([patchCableB, patchCableY, patchCableR])

        // DIO & TO
        if (fibers > 12) {
            equipamentRoom.setDio(Math.ceil(fibers / 48))
        } else {
            equipamentRoom.setTo(1)
        }

        // PigTail
        const TO = fibers <= 12;
        const OM1ouOM2 = fiberCategory.type === "OM1" || fiberCategory.type === "OM2";
        const OM3ouOM4 = fiberCategory.type === "OM3" || fiberCategory.type === "OM4";
        const PigTail: Pigtails = {
            size: TO ? 3 : 1,
            color: OM1ouOM2 ? "Laranja" : OM3ouOM4 ? "Azul Claro" : "Amarelo",
            quantity: fibers
        }
        equipamentRoom.setPigtail(PigTail);

        // Conectores
        const conectores: Conectors = {
            lc: useLC ? (TO ? fibers : fibers * 2) : 0,
            sc: useLC ? 0 : (TO ? fibers : fibers * 2)
        };
        equipamentRoom.setConectors(conectores);

        // PatchPanelTag
        equipamentRoom.setPatchPanelTag(Math.ceil(networkPoints/24));

        // PatchPanelPortTag
        equipamentRoom.setPatchPanelPortTag((Math.ceil(networkPoints/24))*24)
        
        // PatchCableTag
        equipamentRoom.setPatchCableTag(networkPoints * 4);
    
        // VelcroCableTie
        equipamentRoom.setVelcroCableTie(1);

        // PlasticCableTie
        equipamentRoom.setPlasticCableTie(1);

        // Exhauster
        equipamentRoom.setExhauster((haveExhauster ? 1 : 0))

        // PowerStrip
        const equipaments = equipamentRoom.getPatchPanel()*2
        const dvrs = Math.ceil(cftvPoints/24)
        const powerPorts = (equipaments + dvrs + (haveExhauster ? 1 : 0))
        equipamentRoom.setPowerStrip((Math.ceil(powerPorts/2))*2);

        // FrontCableOrganizer
        equipamentRoom.setFrontCableOrganizer(equipaments);

        // Rack
        let rackHeight = 1.5*(equipaments + (dvrs*2) + equipamentRoom.getFrontCableOrganizer() + (haveExhauster ? 2 : 0) + (TO ? 0 : equipamentRoom.getDio()));
        if(rackHeight > 16){
            rackHeight -= rackHeight % 4;
        } else {
            rackHeight -= rackHeight % 2;
        }
        const Rack : Rack = {
            size : rackHeight
        }
        equipamentRoom.setRack(Rack);

        // CageNut
        equipamentRoom.setCageNut((Math.ceil(rackHeight/10))*10);

        // CloseBar
        const usefulRackHeight = (equipaments + (dvrs*2) + equipamentRoom.getFrontCableOrganizer() + (haveExhauster ? 2 : 0));
        equipamentRoom.setCloseBar(rackHeight - usefulRackHeight);


    }

}