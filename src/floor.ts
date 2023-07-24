'use strict';

import * as Phaser from 'phaser';

import {
    notBuiltTextureName,
    floorTextureName,
    InteriorTexture,
} from './main_scene';
import Operator from './operator';

export class Floor extends Phaser.GameObjects.Container {
    private price: number;
    private interiorTexture: string;
    private notBuiltObjects: Phaser.GameObjects.GameObject[] = [];

    constructor(
        scene: Phaser.Scene,
        interiorTexture: InteriorTexture,
        price: number
    ) {
        super(scene, 0, 0, null);

        this.interiorTexture = interiorTexture;
        this.price = price;

        // Add objects visible before the floor has been built.
        const notBuiltFloor = this.scene.add.image(0, 0, notBuiltTextureName);
        this.setSize(notBuiltFloor.width, notBuiltFloor.height);

        const priceTag = this.scene.add.text(0, 0, this.price.toString(), {
            color: '#000',
            fontSize: 30,
        });

        notBuiltFloor.setInteractive();
        notBuiltFloor.on('pointerdown', () => {
            this.build();
        });

        this.add([notBuiltFloor, priceTag]);
        this.notBuiltObjects.push(notBuiltFloor, priceTag);
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
    }
}
