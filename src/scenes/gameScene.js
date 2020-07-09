import Phaser from 'phaser';
import enemies from './enemies';
import player from '../../assets/player.png';
import shotImg from '../../assets/shot.png';
import shotSound from '../../assets/shot.ogg';
import hit from '../../assets/flak_hit.ogg';
import background from '../../assets/purple.png';
import mbs1 from '../../assets/enemies/meteors/mBS1.png';
import mbs2 from '../../assets/enemies/meteors/mBS2.png';
import mbt1 from '../../assets/enemies/meteors/mBT1.png';
import mbt2 from '../../assets/enemies/meteors/mBT2.png';
import mgs1 from '../../assets/enemies/meteors/mGS1.png';
import mgs2 from '../../assets/enemies/meteors/mGS2.png';
import mgt1 from '../../assets/enemies/meteors/mGT1.png';
import mgt2 from '../../assets/enemies/meteors/mGT2.png';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }

  preload() {
    this.load.image('player', player);
    this.load.image('shotImg', shotImg);
    this.load.image('mbs1', mbs1);
    this.load.image('mbs2', mbs2);
    this.load.image('mbt1', mbt1);
    this.load.image('mbt2', mbt2);
    this.load.image('mgs1', mgs1);
    this.load.image('mgs2', mgs2);
    this.load.image('mgt1', mgt1);
    this.load.image('mgt2', mgt2);
    this.load.image('background', background);
    this.load.audio('shotSound', shotSound);
    this.load.audio('hit', hit);
  }

  create(){
    this.background = this.add.tileSprite(400, 300, 800, 600, 'background');
    this.smallMeteors = ['mbs1','mbs2','mbt1','mbt2','mgs1','mgs2','mgt1','mgt2'];

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
    this.gameOver = false;
    this.background.visible = false;

    this.time.delayedCall(5000, () => {
      this.logo.destroy(); 
      this.background.visible = true;
      this.player1 = this.physics.add.sprite(400, 300, 'player').setScale(1/2);  
      this.player1.setCollideWorldBounds(true);
      this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
      this.levelText = this.add.text(16, 50, `Level: ${this.level}`, { fontSize: '32px', fill: '#fff' });
      this.timerText = this.add.text(600, 16, 'Timer: 0', { fontSize: '32px', fill: '#fff' });
      this.shot = this.sound.add('shotSound');
      this.hit = this.sound.add('hit');

      this.interval = setInterval(() => {
        this.timer += 1;
        this.timerText.setText(`Timer: ${this.timer}`);
      }, 1000);
      
      setInterval(() => {
        this.resetPosition();
      }, 500);

    }, [], this);
  }

  update () 
  {
    this.background.tilePositionY -= 1;
    if(this.cursors.left.isDown){
      this.player1.x -= this.speed;
    }else if(this.cursors.right.isDown){
      this.player1.x += this.speed;
    }
    else{
      if(this.cursors.down.isDown){
        this.player1.y += this.speed;
      }
      else if (this.cursors.up.isDown){
        this.player1.y -= this.speed;
      }
    }

    if(Phaser.Input.Keyboard.JustDown(this.enter)){
      const image = this.physics.add.sprite(this.player1.x, this.player1.y - 30, 'shotImg');
      image.body.velocity.y = -1000;
      this.shot.play();
    }

    // this.smallMeteors.forEach((elt) => {
    //   const meteor = this.physics.add.sprite(this.resetPosition(),0,elt)
    //   meteor.body.velocity.y = 50;
    //   //meteor.visible = false; 
    // });

  }
  resetPosition(){
    let resetPosition = Phaser.Math.Between(0, 800);
    let randomNum = Math.floor(Phaser.Math.Between(0, 8));
    let meteorKey = this.smallMeteors[randomNum];
    const meteor = this.physics.add.sprite(resetPosition, 0, meteorKey);
    meteor.body.velocity.y = 100;
  } 
  
  // randomNum(){
  //   return Math.floor(Phaser.Math.Between(0, 8));
  // }
};
