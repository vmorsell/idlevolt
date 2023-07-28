'use strict';

import * as Phaser from 'phaser';

import { Floor } from './floor';

export enum InteriorTexture {
    Slurry = 'slurry',
    Coating = 'coating',
}

export const notBuiltTextureName = 'not_built';
export const floorTextureName = 'floor';

export default class MainScene extends Phaser.Scene {
    private floors: Floor[] = [];
    private cash = 1000;

    constructor() {
        super('MainScene');
    }

    preload() {
        this.load.image(notBuiltTextureName, 'assets/not_built.png');
        this.load.image(floorTextureName, 'assets/floor.png');
        this.load.image(InteriorTexture.Slurry, 'assets/slurry.png');
        this.load.image(InteriorTexture.Coating, 'assets/coating.png');
        this.load.atlas(
            'operator_clean_ppe',
            'assets/operator_clean_ppe.png',
            'assets/operator_clean_ppe.json'
        );
    }

    create() {
        this.scale.on('resize', this.resize, this);
        this.cameras.main.setBackgroundColor('#d5f3fb');
        this.cameras.main.setZoom(1);

        this.floors = [
            new Floor(this, InteriorTexture.Slurry, 0),
            new Floor(this, InteriorTexture.Coating, 1),
        ];

        this.floors.forEach((floor, i) => {
            floor.setX(this.game.scale.width / 2);
            floor.setY(
                this.game.scale.height - floor.height / 2 - floor.height * i
            );
            console.log(floor.height);
            this.add.existing(floor);
        });

        this.add.text(20, 20, `$ ${this.cash.toString()}`, {
            fontSize: 20,
            color: '#000',
        });
    }

    resize(size: Phaser.Structs.Size): void {
        this.cameras.resize(size.width, size.height);
    }
}
