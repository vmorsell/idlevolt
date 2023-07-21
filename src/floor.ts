'use strict';

import * as Phaser from 'phaser';

import { notBuiltTextureName, floorTextureName, InteriorTexture } from './game';

export class Floor extends Phaser.GameObjects.Container {
    private floor: Phaser.GameObjects.Image;
    private interiorTexture: InteriorTexture;

    constructor(scene: Phaser.Scene, interiorTexture: InteriorTexture) {
        const floor = new Phaser.GameObjects.Image(
            scene,
            0,
            0,
            notBuiltTextureName
        );
        super(scene, 0, 0, [floor]);

        this.floor = floor;
        this.interiorTexture = interiorTexture;
        this.setSize(floor.width, floor.height);

        this.setInteractive();
        this.on('pointerdown', () => {
            this.build();
        });
    }

    build() {
        this.floor.setTexture(floorTextureName);

        const interior = new Phaser.GameObjects.Image(
            this.scene,
            // The transform point of a Container is 0x0 and cannot
            // be changed. Children needs to be positioned positively
            // or negatively around it.
            -this.width / 2 + 93,
            -this.height / 2 + 32,
            this.interiorTexture
        );
        interior.setOrigin(0, 0);
        this.add(interior);
    }
}
