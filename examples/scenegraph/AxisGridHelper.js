import * as THREE from "three";

export class AxisGridHelper {
    constructor(node, units = 10) {
        const grid = new THREE.GridHelper(units, units);
        grid.material.depthTest = false;
        grid.renderOrder = 1;
        node.add(grid);

        const axes = new THREE.AxesHelper();
        axes.material.depthTest = false;
        axes.renderOrder = 2;
        node.add(axes);

        this.grid = grid;
        this.axes = axes;
        this.visible = false;
    }

    get visible() {
        return this._visible;
    }

    set visible(v) {
        this._visible = v;
        this.grid.visible = v;
        this.axes.visible = v;
    }
}
