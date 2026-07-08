import type { PatchCord } from "../interfaces/PatchCord";

export class WorkArea {
    private patchCords : PatchCord[];
    private facePlates : number;
    private tags : number;

    public getPatchCords() : PatchCord[] {
        return this.patchCords;
    }

    public getFacePlates() : number {
        return this.facePlates;
    }

    public getTags() : number {
        return this.tags;
    }

    public setPatchCords(patchCords : PatchCord[]) : void {
        this.patchCords = patchCords;
    }

    public setFacePlates(facePlates : number) : void {
        this.facePlates = facePlates;
    }

    public setTags(tags : number) : void {
        this.tags = tags;
    }    

}