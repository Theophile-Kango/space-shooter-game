import Phaser from 'phaser';
import player from '../../assets/player.png';
import shotImg from '../../assets/shot.png';
import shotSound from '../../assets/shot.ogg';
import hit from '../../assets/flak_hit.ogg';
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload() {
    this.load.image('player', player);
    this.load.image('shotImg', shotImg);
    this.load.audio('shotSound', shotSound);
    this.load.audio('hit', hit);
  }

  create(){
    this.logo = this.add.image(400, 300, 'logo').setScale(1/2);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.scoreText = '';
    this.timerText = '';
    this.levelText = '';
    this.interval;
    this.timer = 0;
    this.speed = 3;
    this.level = 1;
    this.shot;
    this.hit;

    this.time.delayedCall(5000, () => {
    this.logo.destroy();
      this.add.image(400, 300, 'background-loading'); 
      this.player1 = this.physics.add.sprite(0, 600, 'player').setScale(1/2);  
      this.player1.setCollideWorldBounds(true);
      this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
      this.levelText = this.add.text(16, 50, `Level: ${this.level}`, { fontSize: '32px', fill: '#fff' });
      this.timerText = this.add.text(600, 16, 'Timer: 0', { fontSize: '32px', fill: '#fff' });
      this.shot = this.sound.add('shot');
      this.hit = this.sound.add('hit');
      
      this.interval = setInterval(() => {
        this.timer += 1;
        this.timerText.setText(`Timer: ${this.timer}`);
      }, 1000);
    }, [], this);
  }

  update () 
  {
    if(this.cursors.left.isDown){
      this.player1.x-=this.speed;
      //console.log(this.player1.x);
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

    if(Phaser.Input.Keyboard.JustDown(this.enter)){
      const image = this.physics.add.sprite(this.player1.x, this.player1.y - 30, 'shotImg');
      //game.physics.enable(image, Phaser.Physics.ARCADE);
      image.body.velocity.y=-1000;
      //this.shot.play();
    }
  }

  
};
