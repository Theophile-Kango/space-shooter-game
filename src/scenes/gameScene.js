import Phaser from 'phaser';
import player from '../../assets/player.png';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload() {
    this.load.image('player', player);
  }

  create(){
    this.logo = this.add.image(400, 300, 'logo').setScale(1/2);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.speed = 3;
    this.time.delayedCall(5000, () => {
    this.logo.destroy();
      this.add.image(400, 300, 'background-loading'); 
      this.player1 = this.add.sprite(0, 565, 'player').setScale(1/2);
      this.player1.setOrigin(0,0);
      //this.player1.setBounce(0.2);
      //this.player1.setCollideWorldBounds(true);
    }, [], this);
    console.log(this.player1)
 
  }
 update () 
  {
    if(this.cursors.left.isDown){
      this.player1.x-=this.speed;
    }else if(this.cursors.right.isDown){
      this.player1.x+=this.speed;
    }
    else{
      if(this.cursors.down.isDown){
        this.player1.y+=this.speed;
      }
      else if (this.cursors.up.isDown){
        this.player1.y-=this.speed;
      }
    }
  }
};
