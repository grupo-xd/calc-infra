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
    private patchPanelTag : number;
    private patchPanelPortTag : number;
    private patchCableTag : number;
    private powerStrip : number;
    private closeBar : number;
    private cageNut : number;
    private velcroCableTie : number;
    private plasticCableTie : number;
    private exhauster : number;

    constructor(
        
        patchPanel : number,
        patchCable : PatchCables[],
        dvr : number,
        rack : Rack,
        dio : number,
        to : number,
        pigtail : Pigtails[],
        conectors : Conectors,
        patchPanelTag : number,
        patchPanelPortTag : number,
        patchCableTag : number,
        powerStrip : number,
        closeBar : number,
        cageNut : number,
        velcroCableTie : number,
        plasticCableTie : number,
        exhauster : number,
    ) {
        this.patchPanel = patchPanel;
        this.dvr = dvr;
        this.rack = rack;
        this.dio = dio;
        this.to = to;
        this.patchCable = patchCable;
        this.pigtail = pigtail;
        this.conectors = conectors;
        this.patchPanelTag = patchPanelTag;
        this.patchPanelPortTag = patchPanelPortTag;
        this.patchCableTag = patchCableTag;
        this.powerStrip = powerStrip;
        this.closeBar = closeBar;
        this.cageNut = cageNut;
        this.velcroCableTie = velcroCableTie;
        this.plasticCableTie = plasticCableTie;
        this.exhauster = exhauster;
    }

    
    public getPatchPanel(): number {
        return this.patchPanel;
    }

    public setPatchPanel(patchPanel: number): void {
        this.patchPanel = patchPanel;
    }

    public getPatchCable(): PatchCables[] {
        return this.patchCable;
    }

    public setPatchCable(patchCable: PatchCables[]): void {
        this.patchCable = patchCable;
    }

    public getDvr(): number {
        return this.dvr;
    }

    public setDvr(dvr: number): void {
        this.dvr = dvr;
    }

    public getRack(): Rack {
        return this.rack;
    }

    public setRack(rack: Rack): void {
        this.rack = rack;
    }

    public getDio(): number {
        return this.dio;
    }

    public setDio(dio: number): void {
        this.dio = dio;
    }

    public getTo(): number {
        return this.to;
    }

    public setTo(to: number): void {
        this.to = to;
    }

    public getPigtail(): Pigtails[] {
        return this.pigtail;
    }

    public setPigtail(pigtail: Pigtails[]): void {
        this.pigtail = pigtail;
    }

    public getConectors(): Conectors {
        return this.conectors;
    }

    public setConectors(conectors: Conectors): void {
        this.conectors = conectors;
    }

    public getPatchPanelTag(): number {
        return this.patchPanelTag;
    }

    public setPatchPanelTag(patchPanelTag: number): void {
        this.patchPanelTag = patchPanelTag;
    }

    public getPatchPanelPortTag(): number {
        return this.patchPanelPortTag;
    }

    public setPatchPanelPortTag(patchPanelPortTag: number): void {
        this.patchPanelPortTag = patchPanelPortTag;
    }

    public getPatchCableTag(): number {
        return this.patchCableTag;
    }

    public setPatchCableTag(patchCableTag: number): void {
        this.patchCableTag = patchCableTag;
    }

    public getPowerStrip(): number {
        return this.powerStrip;
    }

    public setPowerStrip(powerStrip: number): void {
        this.powerStrip = powerStrip;
    }

    public getCloseBar(): number {
        return this.closeBar;
    }

    public setCloseBar(closeBar: number): void {
        this.closeBar = closeBar;
    }

    public getCageNut(): number {
        return this.cageNut;
    }

    public setCageNut(cageNut: number): void {
        this.cageNut = cageNut;
    }

    public getVelcroCableTie(): number {
        return this.velcroCableTie;
    }

    public setVelcroCableTie(velcroCableTie: number): void {
        this.velcroCableTie = velcroCableTie;
    }
    public getPlasticCableTie(): number {
        return this.plasticCableTie;
    }

    public setPlasticCableTie(plasticCableTie: number): void {
        this.plasticCableTie = plasticCableTie;
    }

    public getExhauster() : number {
        return this.exhauster;
    }

    public setExhauster(exhauster : number) : void {
        this.exhauster = exhauster;
    }
} 