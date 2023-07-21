'use strict';

import * as Phaser from 'phaser';

import { notBuiltTextureName, floorTextureName } from './game';

export class Floor extends Phaser.GameObjects.Image {
    constructor(scene: Phaser.Scene) {
        super(scene, 0, 0, notBuiltTextureName);

        this.setInteractive();
        this.on('pointerdown', () => {
            this.build();
        });
    }

    build() {
        this.setTexture(floorTextureName);
    }
}
