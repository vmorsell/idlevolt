'use strict';

import * as Phaser from 'phaser';

import { Floor } from './floor';

export const notBuiltTextureName = 'not_built';
export const floorTextureName = 'floor';

export default class MainScene extends Phaser.Scene {
    private floors: Floor[] = [];

    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image(notBuiltTextureName, 'assets/not_built.png');
        this.load.image(floorTextureName, 'assets/floor.png');
    }

    create() {
        this.scale.on('resize', this.resize, this);
        this.cameras.main.setBackgroundColor('#d5f3fb');
        this.cameras.main.setZoom(1);

        this.floors = [
            new Floor(this),
            new Floor(this),
            new Floor(this),
            new Floor(this),
            new Floor(this),
        ];

        this.floors.forEach((floor, i) => {
            floor.setOrigin(0.5, 1);
            floor.setX(this.game.scale.width / 2);
            floor.setY(this.game.scale.height - floor.height * i);
            console.log(floor.height);
            this.add.existing(floor);
        });
    }

    resize(size: Phaser.Structs.Size): void {
        this.cameras.resize(size.width, size.height);
    }
}

const config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: MainScene,
};

const game = new Phaser.Game(config);
