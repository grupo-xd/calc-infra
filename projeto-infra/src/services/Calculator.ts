import type { Backbone } from "../models/Backbone";
import type { HorizontalMesh } from "../models/HorizontalMesh";
import type { SEQ } from "../models/SEQ";
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

    private static sanitizeQuantity(value: number): number {
        if (!Number.isFinite(value)) {
            return 0;
        }
        return Math.max(0, Math.round(value));
    }

    private static sanitizeDistance(value: number): number {
        if (!Number.isFinite(value)) {
            return 0;
        }
        return Math.max(0, value);
    }

    public static calculateTotal(
        horizontalMeshes: HorizontalMesh[],
        workAreas: WorkArea[],
        sets: SET[],
        seqs: SEQ[],
        backbones: Backbone[]
    ) {
        return {
            horizontalMeshes,
            workAreas,
            sets,
            seqs,
            backbones
        };
    }

    public static calculateBackbone(
        backbones: Backbone[],
        paresFibras: number,
        medidaBackbone: number,
        backbonesPorAndar: number,
        numAndares: number
    ) {
        const safePares = this.sanitizeQuantity(paresFibras);
        const safeBackbonesPorAndar = this.sanitizeQuantity(backbonesPorAndar);
        const safeNumAndares = this.sanitizeQuantity(numAndares);
        const safeMedida = this.sanitizeDistance(medidaBackbone);
        const totalPares = safePares * safeBackbonesPorAndar * safeNumAndares;
        return {
            totalBackbones: backbones.length,
            totalPares,
            paresPorAndar: safePares * safeBackbonesPorAndar,
            distanciaTotal: safeMedida * safeNumAndares
        };
    }

    public static calculateHorizontalMesh(horizontalMesh: HorizontalMesh, workArea: WorkArea, networkPoints: number, cftvPoints: number, voipPoints: number) {
        const safeNetworkPoints = this.sanitizeQuantity(networkPoints);
        const safeCftvPoints = this.sanitizeQuantity(cftvPoints);
        const safeVoipPoints = this.sanitizeQuantity(voipPoints);

        const accessPoint: AccessPoints = {
            data: safeNetworkPoints * 2,
            security: safeCftvPoints * 2,
            voice: safeVoipPoints * 2
        };
        horizontalMesh.setAccessPoints(accessPoint);

        horizontalMesh.setHorizontalMeshTag(safeNetworkPoints * 4);

        const patchCordsB: PatchCords = {
            defaultSize: 3,
            color: "Azul",
            cableCategory: horizontalMesh.getCableCategory(),
            quantity: this.sanitizeQuantity(safeNetworkPoints - safeCftvPoints - safeVoipPoints)
        };
        const patchCordsY: PatchCords = {
            defaultSize: 3,
            color: "Amarelo",
            cableCategory: horizontalMesh.getCableCategory(),
            quantity: this.sanitizeQuantity(safeVoipPoints)
        };
        const patchCordsW: PatchCords = {
            defaultSize: 1,
            color: "Branco",
            cableCategory: horizontalMesh.getCableCategory(),
            quantity: this.sanitizeQuantity(safeCftvPoints)
        };
        workArea.setPatchCords([patchCordsB, patchCordsY, patchCordsW]);

        workArea.setFacePlates(safeNetworkPoints);

        workArea.setTags(this.sanitizeQuantity((safeNetworkPoints * 2) + workArea.getFacePlates()));
    }

    public static calculateSET(
        equipamentRoom: SET,
        networkPoints: number,
        cftvPoints: number,
        voipPoints: number,
        cableCategory: UTPCableCategory,
        fibers: number,
        fiberCategory: FiberCategory,
        useLC: boolean,
        haveExhauster: Boolean,
        haveFrontCableOrganizer: boolean
    ) {
        const safeNetworkPoints = this.sanitizeQuantity(networkPoints);
        const safeCftvPoints = this.sanitizeQuantity(cftvPoints);
        const safeVoipPoints = this.sanitizeQuantity(voipPoints);
        const safeFibers = this.sanitizeQuantity(fibers);
        const patchPanelQty = safeNetworkPoints > 0 ? Math.ceil(safeNetworkPoints / 24) : 0;

        equipamentRoom.setPatchPanel(patchPanelQty);

        const patchCableB: PatchCables = {
            defaultSize: 2.5,
            color: "Azul",
            cableCategory: cableCategory,
            quantity: this.sanitizeQuantity((safeNetworkPoints - safeCftvPoints - safeVoipPoints) * 2)
        };
        const patchCableY: PatchCables = {
            defaultSize: 2.5,
            color: "Amarelo",
            cableCategory: cableCategory,
            quantity: this.sanitizeQuantity(safeVoipPoints * 2)
        };
        const patchCableR: PatchCables = {
            defaultSize: 2.5,
            color: "Vermelho",
            cableCategory: cableCategory,
            quantity: this.sanitizeQuantity(safeCftvPoints * 2)
        };
        equipamentRoom.setPatchCable([patchCableB, patchCableY, patchCableR]);

        if (safeFibers > 12) {
            equipamentRoom.setDio(Math.ceil(safeFibers / 48));
        } else {
            equipamentRoom.setTo(1);
        }

        const TO = safeFibers <= 12;
        const OM1ouOM2 = fiberCategory.type === "OM1" || fiberCategory.type === "OM2";
        const OM3ouOM4 = fiberCategory.type === "OM3" || fiberCategory.type === "OM4";
        const PigTail: Pigtails = {
            size: TO ? 3 : 1,
            color: OM1ouOM2 ? "Laranja" : OM3ouOM4 ? "Azul Claro" : "Amarelo",
            quantity: safeFibers
        };
        equipamentRoom.setPigtail(PigTail);

        const conectores: Conectors = {
            lc: useLC ? (TO ? safeFibers : safeFibers * 2) : 0,
            sc: useLC ? 0 : (TO ? safeFibers : safeFibers * 2)
        };
        equipamentRoom.setConectors(conectores);

        equipamentRoom.setPatchPanelTag(patchPanelQty);

        equipamentRoom.setPatchPanelPortTag(patchPanelQty * 24);

        equipamentRoom.setPatchCableTag(this.sanitizeQuantity(safeNetworkPoints * 4));

        equipamentRoom.setVelcroCableTie(1);

        equipamentRoom.setPlasticCableTie(1);

        equipamentRoom.setExhauster(haveExhauster ? 1 : 0);

        const equipaments = equipamentRoom.getPatchPanel() * 2;
        const dvrs = Math.max(0, Math.ceil(safeCftvPoints / 24));
        const powerPorts = (equipaments + dvrs + (haveExhauster ? 1 : 0));
        equipamentRoom.setPowerStrip((Math.ceil(powerPorts / 2)) * 2);

        equipamentRoom.setFrontCableOrganizer(haveFrontCableOrganizer ? equipaments : 0);

        let rackHeight = 1.5 * (equipaments + (dvrs * 2) + equipamentRoom.getFrontCableOrganizer() + (haveExhauster ? 2 : 0) + (TO ? 0 : equipamentRoom.getDio()));
        if (rackHeight > 16) {
            rackHeight = Math.ceil(rackHeight / 4) * 4;
        } else {
            rackHeight = Math.ceil(rackHeight / 2) * 2;
        }
        const Rack: Rack = {
            size: Math.max(0, rackHeight)
        };
        equipamentRoom.setRack(Rack);

        equipamentRoom.setCageNut((Math.ceil(Math.max(0, rackHeight) / 10)) * 10);

        const usefulRackHeight = (equipaments + (dvrs * 2) + equipamentRoom.getFrontCableOrganizer() + (haveExhauster ? 2 : 0));
        equipamentRoom.setCloseBar(Math.max(0, rackHeight - usefulRackHeight));
    }

}
