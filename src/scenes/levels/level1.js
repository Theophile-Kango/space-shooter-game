import 'phaser';
export default class Level1 extends Phaser.Scene {
  constructor(){
      super('level1');
  }

  create () {
    console.log("hello")
  }
}