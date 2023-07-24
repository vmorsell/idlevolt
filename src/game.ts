'use strict';

import * as Phaser from 'phaser';

import MainScene from './main_scene';

export default class Game extends Phaser.Game {
    constructor(config: Phaser.Types.Core.GameConfig) {
        super(config);
    }
}

new Game({
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.RESIZE,
        width: window.innerWidth,
        height: window.innerHeight,
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
    },
    scene: MainScene,
});
