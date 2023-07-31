'use strict';

import * as Phaser from 'phaser';

import {
    notBuiltTextureName,
    floorTextureName,
    InteriorTexture,
} from './main_scene';
import Operator from './operator';
import { formatCash } from './utils';

export class Floor extends Phaser.GameObjects.Container {
    public built = false;
    public price: number;

    private priceTag: Phaser.GameObjects.Text;
    private interiorTexture: string;
    private notBuiltObjects: Phaser.GameObjects.GameObject[] = [];

    constructor(
        scene: Phaser.Scene,
        interiorTexture: InteriorTexture,
        floorNumber: number
    ) {
        super(scene, 0, 0, null);

        this.interiorTexture = interiorTexture;
        this.price = 1000 + 100 * floorNumber;

        // Add objects visible before the floor has been built.
        const notBuiltFloor = this.scene.add.image(0, 0, notBuiltTextureName);
        this.setSize(notBuiltFloor.width, notBuiltFloor.height);

        this.priceTag = this.scene.add.text(0, 0, formatCash(this.price), {
            color: '#555',
            fontSize: 30,
            align: 'center',
        });

        this.add([notBuiltFloor, this.priceTag]);
        this.notBuiltObjects.push(notBuiltFloor, this.priceTag);
    }

    canBuild() {
        this.priceTag.setY(this.priceTag.y - this.priceTag.height / 2);
        this.priceTag.setText(`${formatCash(this.price)}\nBuild!`);
        this.priceTag.setStyle({ color: '#000' });
        this.priceTag.setInteractive();
        this.priceTag.on('pointerdown', () => {
            this.build();
        });
    }

    build() {
        // Objects after the floor has been built.
        const floor = this.scene.add.image(0, 0, floorTextureName);
        const interior = this.scene.add.image(
            -this.width / 2 + 93,
            -this.height / 2 + 32,
            this.interiorTexture
        );
        interior.setOrigin(0, 0);

        const operator = new Operator(
            this.scene,
            -this.width / 2 + 150,
            this.height / 2
        );
        operator.setOrigin(0, 1);

        this.add([floor, interior, operator]);

        // Remove objects visible before the floor was built.
        this.notBuiltObjects.forEach((o) => {
            o.destroy();
        });
        this.notBuiltObjects = [];
        this.built = true;
    }
}
