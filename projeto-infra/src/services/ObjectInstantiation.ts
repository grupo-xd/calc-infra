import type { InfraForm } from "../hooks/useInfraForm";
import type { AccessPoints } from "../interfaces/AccessPoints";
import type { UTPCableCategory } from "../interfaces/UTPCableCategory";
import type { FiberCategory } from "../interfaces/FiberCategory";
import { Backbone } from "../models/Backbone";
import { HorizontalMesh } from "../models/HorizontalMesh";
import { WorkArea } from "../models/WorkArea";
import { Floor } from "../models/Floor";
import { SET } from "../models/SET";
import { SEQ } from "../models/SEQ";
import { Calculator } from "./Calculator";

export interface ProjectResult {
    floors: Floor[];
    totalNetworkPoints: number;
    totalSecurityPoints: number;
    totalVoicePoints: number;
    totalFibers: number;
    selectedCableCategory: UTPCableCategory;
    selectedFiberCategory: FiberCategory;
    backboneInfo: {
        numAndares: number;
        paresFibras: number;
        medidaBackbone: number;
        backbonesPorAndar: number;
        tipoFibra: "MM" | "SM";
    };
    horizontalMeshInfo: {
        numAndares: number;
        pontosPorPavimento: number;
        medidaMH: number;
    };
}

export function objectInstantiation(form: InfraForm): ProjectResult {
    // Configurar categoria de cabo UTP
    const utpCabelCategoryData: UTPCableCategory[] = [
        { type: "cat5e", maxSpeedGbps: 1, maxDistance: 100 },
        { type: "cat6", maxSpeedGbps: 10, maxDistance: 55 },
        { type: "cat6a", maxSpeedGbps: 10, maxDistance: 100 },
        { type: "cat7", maxSpeedGbps: 10, maxDistance: 100 },
        { type: "cat8", maxSpeedGbps: 40, maxDistance: 30 },
    ];

    const selectedUTPCategory = utpCabelCategoryData.find(
        (cat) => cat.type === form.categoriaCabo
    ) || utpCabelCategoryData[1];

    // Configurar categoria de fibra
    const fiberCategoryData: FiberCategory[] = [
        { type: "OM1", maxSpeedGbps: 1, maxDistance: 275 },
        { type: "OM2", maxSpeedGbps: 1, maxDistance: 550 },
        { type: "OM3", maxSpeedGbps: 10, maxDistance: 300 },
        { type: "OM4", maxSpeedGbps: 10, maxDistance: 550 },
        { type: "OM5", maxSpeedGbps: 40, maxDistance: 150 },
        { type: "OS1", maxSpeedGbps: 10, maxDistance: 2000 },
        { type: "OS2", maxSpeedGbps: 10, maxDistance: 10000 },
    ];

    const selectedFiberCategory = fiberCategoryData.find(
        (fib) => fib.type === form.caracteristicaFibra
    ) || fiberCategoryData[2];

    // Totais por pavimento
    const totalNetworkPoints = form.pontosData;
    const totalSecurityPoints = form.pontosSecurity;
    const totalVoicePoints = form.pontosVoice;
    const totalPoints = totalNetworkPoints + totalSecurityPoints + totalVoicePoints;

    // Access Points
    const accessPoints: AccessPoints = {
        data: totalNetworkPoints * 2,
        voice: totalVoicePoints * 2,
        security: totalSecurityPoints * 2,
    };

    // Criar Malha Horizontal
    const horizontalMesh = new HorizontalMesh(
        form.medidaMH,
        selectedUTPCategory,
        accessPoints,
        totalPoints * 2
    );

    // Criar Backbone
    const backbone = new Backbone();
    backbone.setCategory(form.tipoFibra);

    // Criar Work Area
    const workArea = new WorkArea([], totalNetworkPoints, totalPoints * 2);

    // Criar SET (equipamento room para dados)
    const set = new SET(
        Math.ceil(totalNetworkPoints / 24), // patchPanel
        [], // patchCable
        {size: 20}, // rack
        0, // dio
        0, // to
        {size: 3, color: "Laranja", quantity: 0}, // pigtail
        {lc: 0, sc: 0}, // conectors
        Math.ceil(totalNetworkPoints / 24), // patchPanelTag
        Math.ceil(totalNetworkPoints / 24) * 24, // patchPanelPortTag
        totalNetworkPoints * 4, // patchCableTag
        0, // powerStrip
        0, // closeBar
        0, // frontCableOrganizer
        0, // cageNut
        0, // velcroCableTie
        0, // plasticCableTie
        0  // exhauster
    );

    // Criar SEQ (equipamento room para segurança) - reservado para futuro uso
    new SEQ(
        Math.ceil(totalSecurityPoints / 24), // patchPanel
        [], // patchCable
        Math.ceil(totalSecurityPoints / 24), // dvr
        [{size: 15}], // rack
        0, // dio
        0, // to
        [], // pigtail
        {lc: 0, sc: 0}, // conectors
        Math.ceil(totalSecurityPoints / 24), // patchPanelTag
        Math.ceil(totalSecurityPoints / 24) * 24, // patchPanelPortTag
        totalSecurityPoints * 4, // patchCableTag
        0, // powerStrip
        0, // closeBar
        0, // cageNut
        0, // velcroCableTie
        0, // plasticCableTie
        0  // exhauster
    );

    // Calcular dados da malha horizontal
    Calculator.calculateHorizontalMesh(
        horizontalMesh,
        workArea,
        totalNetworkPoints,
        totalSecurityPoints,
        totalVoicePoints
    );

    // Calcular dados do SET (equipamento room para dados)
    Calculator.calculateSET(
        set,
        totalNetworkPoints,
        totalSecurityPoints,
        totalVoicePoints,
        selectedUTPCategory,
        form.paresFibras,
        selectedFiberCategory,
        true, // useLC
        true, // haveExhauster
        true  // haveFrontCableOrganizer
    );

    // Criar andares
    const totalAndares = Math.max(form.numPavimentosBackbone, form.numPavimentosMH);
    const floors: Floor[] = [];

    for (let i = 0; i < totalAndares; i++) {
        floors.push(new Floor(set, horizontalMesh, backbone, workArea));
    }

    return {
        floors,
        totalNetworkPoints,
        totalSecurityPoints,
        totalVoicePoints,
        totalFibers: form.paresFibras,
        selectedCableCategory: selectedUTPCategory,
        selectedFiberCategory: selectedFiberCategory,
        backboneInfo: {
            numAndares: form.numPavimentosBackbone,
            paresFibras: form.paresFibras,
            medidaBackbone: form.medidaBackbone,
            backbonesPorAndar: form.backbonesPorAndar,
            tipoFibra: form.tipoFibra,
        },
        horizontalMeshInfo: {
            numAndares: form.numPavimentosMH,
            pontosPorPavimento: form.pontosPorPavimento,
            medidaMH: form.medidaMH,
        },
    };
}