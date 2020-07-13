import Phaser from 'phaser';
import player from '../../assets/player.png';
import shotImg from '../../assets/shot.png';
import shotSound from '../../assets/shot.mp3';
import hit from '../../assets/flak_hit.mp3';
import background from '../../assets/purple.png';
import mbs1 from '../../assets/enemies/meteors/mBS1.png';
import mbs2 from '../../assets/enemies/meteors/mBS2.png';
import mbt1 from '../../assets/enemies/meteors/mBT1.png';
import mbt2 from '../../assets/enemies/meteors/mBT2.png';
import mgs1 from '../../assets/enemies/meteors/mGS1.png';
import mgs2 from '../../assets/enemies/meteors/mGS2.png';
import mgt1 from '../../assets/enemies/meteors/mGT1.png';
import mgt2 from '../../assets/enemies/meteors/mGT2.png';
import mb1 from '../../assets/enemies/meteors/mb1.png';
import mb2 from '../../assets/enemies/meteors/mb2.png';
import mb3 from '../../assets/enemies/meteors/mb3.png';
import mb4 from '../../assets/enemies/meteors/mb4.png';
import mbb1 from '../../assets/enemies/meteors/mbB1.png';
import mbb3 from '../../assets/enemies/meteors/mbB3.png';
import mgb1 from '../../assets/enemies/meteors/mGB1.png';
import mgb2 from '../../assets/enemies/meteors/mGB2.png';
import mgb3 from '../../assets/enemies/meteors/mGB3.png';
import mgb4 from '../../assets/enemies/meteors/mGB4.png';
import mgm1 from '../../assets/enemies/meteors/mGM1.png';
import mgm2 from '../../assets/enemies/meteors/mGM2.png';
import asteroid from '../../assets/enemies/astroid.png';
import fire from '../../assets/fire.png';
import gameover from '../../assets/gameover.png';
import sendData from '../data/sendData';

export default class GameScene extends Phaser.Scene {
  constructor() {
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
    this.load.image('mb1', mb1);
    this.load.image('mb2', mb2);
    this.load.image('mb3', mb3);
    this.load.image('mb4', mb4);
    this.load.image('mbb1', mbb1);
    this.load.image('mbb3', mbb3);
    this.load.image('mgb1', mgb1);
    this.load.image('mgb2', mgb2);
    this.load.image('mgb3', mgb3);
    this.load.image('mgb4', mgb4);
    this.load.image('mgm1', mgm1);
    this.load.image('mgm2', mgm2);
    this.load.image('asteroid', asteroid);
    this.load.image('fire', fire);
    this.load.image('background', background);
    this.load.image('gameover', gameover);
    this.load.audio('shotSound', shotSound);
    this.load.audio('hit', hit);
  }

  create() {
    this.background = this.add.tileSprite(400, 300, 800, 600, 'background');
    this.smallMeteors = ['mbs1', 'mbs2', 'mbt1', 'mbt2', 'mgs1', 'mgs2', 'mgt1', 'mgt2'];
    this.bigMeteors = [
      'mb1', 'mb2', 'mb3', 'mb4', 'mbb1', 'mbb3', 'mgb1', 'mgb2', 'mgb3', 'mgb4', 'mgm1', 'mgm2', 'asteroid',
    ];
    this.lazer = this.physics.add.group();
    this.logo = this.add.image(400, 300, 'logo').setScale(1 / 2);
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
    this.clicked = '';
    this.shot = '';
    this.hit = '';
    this.count = 0;
    this.gameOver = false;
    this.timeSpead = 500;
    this.gameOverText = '';
    this.background.visible = false;
    this.movements = [this.cursors.left, this.cursors.up, this.cursors.right, this.cursors.down];

    this.time.delayedCall(5000, () => {
      this.logo.destroy();
      this.background.visible = true;
      this.player1 = this.physics.add.sprite(400, 300, 'player').setScale(1 / 2);
      this.player1.setCollideWorldBounds(true);
      this.scoreText = this.add.text(16, 16, `Score: ${this.score}`, { fontSize: '16px', fill: '#fff' });
      this.levelText = this.add.text(16, 50, `Level: ${this.level}`, { fontSize: '16px', fill: '#fff' });
      this.timerText = this.add.text(700, 16, 'Timer: 0', { fontSize: '16px', fill: '#fff' });
      this.lifeText = this.add.text(350, 16, `Life: ${this.life}`, { fontSize: '16px', fill: '#fff' });

      this.shot = this.sound.add('shotSound');
      this.hit = this.sound.add('hit');
      this.interval = setInterval(() => this.intervalSection(), this.timeSpead);
    }, [], this);
  }

  update() {
    this.background.tilePositionY -= 1;
    if (this.cursors.left.isDown) {
      this.player1.x -= this.speed;
    } else if (this.cursors.right.isDown) {
      this.player1.x += this.speed;
    } else if (this.cursors.down.isDown) {
      this.player1.y += this.speed;
    } else if (this.cursors.up.isDown) {
      this.player1.y -= this.speed;
    }

    if (Phaser.Input.Keyboard.JustDown(this.backspace)) {
      this.pause();
    }

    if (Phaser.Input.Keyboard.JustDown(this.enter)) {
      this.shotImg = this.lazer.create(this.player1.x, this.player1.y - 30, 'shotImg');
      this.shotImg.body.velocity.y = -1000;
      this.shot.play();
    }
  }

  resetPosition() {
    if (this.timer < 60) {
      this.switchLevel(this.smallMeteors, 100, 1, 500);
    } else if ((this.timer >= 60) && (this.timer < 120)) {
      this.switchLevel(this.bigMeteors, 100, 1 / 4, 250);
    } else {
      this.switchLevel(this.bigMeteors, 100, 1 / 4, 200);
    }

    if ((this.timer === 60) || (this.timer === 120)) {
      this.increaseLevel();
    }

    this.physics.add.collider(this.meteor, this.lazer, (meteor, lazer) => {
      const fire = this.add.image(lazer.x, lazer.y, 'fire');
      this.time.delayedCall(200, () => fire.destroy());
      lazer.destroy();
      meteor.body.velocity.y = -1000;
      meteor.destroy();
      this.hit.play();
      this.score += 1;
      this.scoreText.setText(`Score: ${this.score}`);
    });

    this.physics.add.collider(this.meteor, this.player1, (meteor, player) => {
      this.hit.play();
      meteor.destroy();
      this.life -= 1;
      player.body.velocity.y = 0;
      if (this.life === 0) {
        player.destroy();
        this.add.image(400, 300, 'gameover').setScale(1 / 2);
        clearInterval(this.interval);
        this.gameEnd();
      }
      this.lifeText.setText(`Life: ${this.life}`);
    });
  }

  pause() {
    if (this.life > 0) {
      if (this.clicked) {
        this.physics.resume();
        this.movements.forEach(elt => {
          elt.enabled = true;
        });
        this.enter.enabled = true;
        this.interval = setInterval(() => {
          this.intervalSection();
        }, 1000);
        this.clicked = false;
      } else {
        clearInterval(this.interval);
        this.enter.enabled = false;
        this.movements.forEach(elt => {
          elt.enabled = false;
        });
        this.physics.pause();
        this.clicked = true;
      }
    }
  }

  intervalSection() {
    this.timer += this.timeSpead / 1000;
    this.timerText.setText(`Timer: ${Math.floor(this.timer)}`);
    this.resetPosition();
  }

  increaseLevel() {
    this.level += 1;
    this.life += 2;
    this.levelText.setText(`Level: ${this.level}`);
    this.lifeText.setText(`Life: ${this.life}`);
  }

  switchLevel(array, velocity, scale, speed) {
    this.timeSpead = speed;
    const resetPosition = Phaser.Math.Between(0, 800);
    const randomNum = Math.floor(Phaser.Math.Between(0, array.length));
    const meteorKey = array[randomNum];
    this.meteor = this.physics.add.sprite(resetPosition, 0, meteorKey).setScale(scale);
    this.meteor.body.bounce.y = 0.5;
    this.meteor.body.onWorldBounds = true;
    this.meteor.body.world.on('worldbounds', (body) => {
      if (body.gameObject === this) {
        this.setActive(false);
        this.setVisible(false);
      }
    }, this);
    this.meteor.body.velocity.y = velocity;
  }

  gameEnd() {
    const user = localStorage.getItem('Name');
    sendData(this.score, user).then(() => { this.scene.start('Title'); });
  }
}
