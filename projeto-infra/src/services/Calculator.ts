import type { Rack } from "../interfaces/Rack";
import type { Backbone } from "../models/Backbone";
import type { HorizontalMesh } from "../models/HorizontalMesh";
import type { SEQ } from "../models/SEQ";
import type { SET } from "../models/SET";
import type { WorkArea } from "../models/WorkArea";

export class Calculator {
    
    public static calculateTotal() {

    }

    public static calculateBackbone(backbones : Backbone[]) {

    }

    public static calculateHorizontalMesh(horizontalMesh : HorizontalMesh, workArea : WorkArea) {

    }

    public static calculateRack(equipamentRoom : SEQ | SET) : Rack {
        let totalSize : number = equipamentRoom.getPatchPanel() * 4 + equipamentRoom.getExhauster() * 4;
        
        let rack : Rack = {
            size: size 
        };
        return rack;
    }

}