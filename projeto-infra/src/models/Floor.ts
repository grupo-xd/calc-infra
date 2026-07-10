import type { Backbone } from "./Backbone";
import type { HorizontalMesh } from "./HorizontalMesh";
import type { SEQ } from "./SEQ";
import type { SET } from "./SET";
import type { WorkArea } from "./WorkArea";

export class Floor {

    private equipamentRoom !: SEQ | SET;
    private horizontalMesh !: HorizontalMesh;
    private backbone !: Backbone; 
    private workArea !: WorkArea;

    public constructor(equipamentRoom : SEQ | SET, horizontalMesh : HorizontalMesh, backbone : Backbone, workArea : WorkArea) {
        this.equipamentRoom = equipamentRoom;
        this.horizontalMesh = horizontalMesh;
        this.backbone = backbone;
        this.workArea = workArea;
    }

    public getHorizontalMesh() : HorizontalMesh {
        return this.horizontalMesh;
    }

    public getBackbone() : Backbone {
        return this.backbone;
    }

    public getWorkArea() : WorkArea {
        return this.workArea;
    }

    public getEquipamentRoom() : SEQ | SET {
        return this.equipamentRoom;
    }

    public setHorizontalMesh(horizontalMesh : HorizontalMesh) : void {
        this.horizontalMesh = horizontalMesh;
    }

    public setBackbone(backbone : Backbone) : void {
        this.backbone = backbone;
    }

    public setWorkArea(workArea : WorkArea) : void {
        this.workArea = workArea;
    } 

    public setEquipamentRoom(equipamentRoom : SEQ | SET) : void {
        this.equipamentRoom = equipamentRoom;
    }
}