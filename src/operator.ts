'use strict';

import * as Phaser from 'phaser';

const textureKey = 'operator_clean_ppe';
const defaultFrame = 'front';
const workingFrame = 'back';

export default class Operator extends Phaser.GameObjects.Sprite {
    private isWorking: boolean;
    private walkDirection: number;
    private xStart: number;

    private dt = 0.5;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, textureKey, defaultFrame);

        this.anims.create({
            key: 'walk_left',
            frameRate: 4,
            frames: this.anims.generateFrameNames(textureKey, {
                prefix: 'left_',
                end: 1,
                zeroPad: 2,
            }),
            repeat: -1,
        });

        this.anims.create({
            key: 'walk_right',
            frameRate: 4,
            frames: this.anims.generateFrameNames(textureKey, {
                prefix: 'right_',
                end: 1,
                zeroPad: 2,
            }),
            repeat: -1,
        });

        this.setInteractive();
        this.on('pointerdown', this.press);

        this.xStart = this.x;
    }

    preUpdate(delta: number, time: number) {
        super.preUpdate(delta, time);

        if (this.isWorking) {
            this.workStep();
        }
    }

    press() {
        if (this.isWorking) {
            return;
        }

        this.startWork();
    }

    startWork() {
        this.isWorking = true;
        this.addToUpdateList();

        this.anims.play('walk_right');
        this.walkDirection = 1;
    }

    workStep() {
        // Have the operator reached the workstation?
        if (this.x > 20 && this.walkDirection == 1) {
            this.walkDirection = 0;
            this.anims.stop();
            this.setFrame(workingFrame);

            this.scene.time.addEvent({
                delay: 1500,
                callback: () => {
                    this.anims.play('walk_left');
                    this.walkDirection = -1;
                },
            });
            return;
        }

        // Have the operator reached the default position?
        if (this.x == this.xStart && this.walkDirection == -1) {
            this.stopWork();
            return;
        }

        this.setX(this.x + this.dt * this.walkDirection);
    }

    stopWork() {
        this.isWorking = false;
        this.removeFromUpdateList();

        this.anims.stop();
        this.walkDirection = 0;
        this.setFrame(defaultFrame);
    }
}
