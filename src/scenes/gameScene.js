import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload() {
    const logo = this.add.image(400, 300, 'logo').setScale(1/2);
    this.time.delayedCall(5000, () => {
      logo.destroy();
      this.create();
    }, [], this);
  }

  create () {
    console.log("hello")
  }

};
