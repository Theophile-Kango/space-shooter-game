import Phaser from 'phaser';
import background from '../../assets/background.png';
import logo from '../../assets/space-shooter-game.png';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.load.image('logo', logo);
    this.load.image('background-loading', background);
  }

  create() {
    this.scene.start('Preloader');
  }
}