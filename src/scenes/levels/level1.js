import 'phaser';
import player from '../../../assets/logo.png';
export default class Level1 extends Phaser.Scene {
  constructor(){
      super('level1');
  }

  preload() {
    this.load.image('player', player);
  }

  create () {
    this.add.image(400, 300, 'background-loading');
    this.add.image(20, 20, 'player');
    console.log(player);
  }
}