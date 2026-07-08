export class Floor {

    private equipamentRoom : ;
    private horizontalMesh : HorizontalMesh;
    private backbone : Backbone; 
    private workArea : WorkArea;

    public getHorizontalMesh() : HorizontalMesh {
        return this.horizontalMesh;
    }

    public getBackbone() : Backbone {
        return this.backbone;
    }

    public getWorkArea() : WorkArea {
        return this.workArea;
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
}