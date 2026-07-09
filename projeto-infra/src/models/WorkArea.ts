import type { PatchCords } from "../interfaces/PatchCords";

export class WorkArea {
    private patchCords : PatchCords[];
    private facePlates : number;
    private tags : number;

    constructor(patchCords : PatchCords[], facePlates : number, tags : number) {
        this.patchCords = patchCords;
        this.facePlates = facePlates;
        this.tags = tags;
    }

    public getPatchCords() : PatchCords[] {
        return this.patchCords;
    }

    public getFacePlates() : number {
        return this.facePlates;
    }

    public getTags() : number {
        return this.tags;
    }

    public setPatchCords(patchCords : PatchCords[]) : void {
        this.patchCords = patchCords;
    }

    public setFacePlates(facePlates : number) : void {
        this.facePlates = facePlates;
    }

    public setTags(tags : number) : void {
        this.tags = tags;
    }    

}