import 'phaser';
import player from '../../assets/player.png';
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload() {
    const logo = this.add.image(400, 300, 'logo').setScale(1/2);
    this.load.image('player', player);
    this.time.delayedCall(5000, () => {
      logo.destroy();
      this.add.image(400, 300, 'background-loading');
      let player = this.add.sprite(0, 560, 'player');
      player.setScale(1/2);
      player.setOrigin(0, 0);
    }, [], this);
  }
};
