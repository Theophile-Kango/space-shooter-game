import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  create () {
    this.add.image(400, 300, 'logo').setScale(1/2);
  }
};
