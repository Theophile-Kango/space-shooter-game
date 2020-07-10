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
import fire from '../../assets/fire.png';
import gameover from '../../assets/gameover.png';
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
    this.load.image('fire', fire);
    this.load.image('background', background);
    this.load.image('gameover', gameover);
    this.load.audio('shotSound', shotSound);
    this.load.audio('hit', hit);
  }

  create(){
    this.background = this.add.tileSprite(400, 300, 800, 600, 'background');
    this.smallMeteors = ['mbs1','mbs2','mbt1','mbt2','mgs1','mgs2','mgt1','mgt2'];
    this.lazer = this.physics.add.group();
    this.logo = this.add.image(400, 300, 'logo').setScale(1/2);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.backspace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.scoreText = '';
    this.timerText = '';
    this.levelText = '';
    this.lifeText = '';
    this.shotImg = '';
    this.timer = 0;
    this.score = 0;
    this.life = 3;
    this.speed = 2;
    this.level = 1;
    this.clicked;
    this.shot; 
    this.hit;
    this.gameOver = false;
    this.gameOverText = '';
    this.background.visible = false;

    this.time.delayedCall(5000, () => {
      this.logo.destroy(); 
      this.background.visible = true;
      this.player1 = this.physics.add.sprite(400, 300, 'player').setScale(1/2);  
      this.player1.setCollideWorldBounds(true);
      this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, { fontSize: '16px', fill: '#fff' });
      this.levelText = this.add.text(16, 50, `Level: ${this.level}`, { fontSize: '16px', fill: '#fff' });
      this.timerText = this.add.text(700, 16, 'Timer: 0', { fontSize: '16px', fill: '#fff' });
      this.lifeText = this.add.text(350, 16, `life: ${this.life}`, { fontSize: '16px', fill: '#fff' });
      
      this.shot = this.sound.add('shotSound');
      this.hit = this.sound.add('hit');

      this.interval = setInterval(() => {
        this.timer += 1;
        this.timerText.setText(`Timer: ${this.timer}`); 
        this.resetPosition();
      }, 1000);

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
    
    if(Phaser.Input.Keyboard.JustDown(this.backspace)){ 
      this.pause();
    }

    if(Phaser.Input.Keyboard.JustDown(this.enter) ){
      this.shotImg = this.lazer.create(this.player1.x, this.player1.y - 30, 'shotImg');
      this.shotImg.body.velocity.y = -1000;
      this.shot.play();
    }
  }

  resetPosition(){
    let resetPosition = Phaser.Math.Between(0, 800);
    let randomNum = Math.floor(Phaser.Math.Between(0, 8));
    let meteorKey = this.smallMeteors[randomNum];
    this.meteor = this.physics.add.sprite(resetPosition, 0, meteorKey);
    this.meteor.body.velocity.y = 100;
    this.physics.add.collider(this.meteor, this.lazer, (meteor, lazer) => {
      const fire = this.add.image(lazer.x, lazer.y, 'fire');
      this.hit.play();
      meteor.destroy();
      lazer.destroy();
      this.score += 1;
      this.scoreText.setText(`Score: ${this.score}`);  
      this.time.delayedCall(200, () => fire.destroy() );
    });

    this.physics.add.collider(this.meteor, this.player1, (meteor, player) => {
      this.hit.play();
      this.life -= 1;
      if(this.life == 0) {
        player.destroy();
        this.add.image(400, 300, 'gameover').setScale(1/2);
        clearInterval(this.interval);
        this.physics.pause();
      }else{
        player.body.velocity.y = 0;
        meteor.destroy();
      }
      this.lifeText.setText(`Life: ${this.life}`);
    });
  }
  
  pause() {
    if(this.life > 0){
      if(this.clicked){
        this.physics.resume();
        this.interval = setInterval(() => {
          this.timer += 1;
          this.timerText.setText(`Timer: ${this.timer}`); 
          this.resetPosition();
        }, 1000);
        this.clicked = false;
      }else{
        clearInterval(this.interval);
        this.physics.pause();
        this.clicked = true;
      }
    }
  }

  gameEnd() {
    this.gameOver = true;
  }

};
