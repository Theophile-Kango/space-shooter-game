import 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }

  preload () {
    this.load.image('logo', 'assets/space-shooter-game.png');
  }

  create () {
    this.scene.start('Preloader');
  }
};