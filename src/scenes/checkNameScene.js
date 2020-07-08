import 'phaser';
import Button from '../objects/button';
import config from '../config/config';
import background from '../../assets/background.png';
import blueBtn1 from '../../assets/ui/blue_button02.png';
import blueBtn2 from '../../assets/ui/blue_button03.png';

export default class CheckName extends Phaser.Scene {
  constructor() {
    super('CheckName');
  }

  init(data) {
    this.name = data.name;
  }

  preload() {
    this.load.image('background-loading', background);
    this.load.image('blueButton1', blueBtn1);
    this.load.image('blueButton2', blueBtn2);
  
  }

  create() {
    this.add.image(400, 300, 'background-loading');
    this.text = this.add.text(270, 80, `Hello ${this.name}!`, { fontSize: 40, fill: '#fff' });
    this.text = this.add.text(305, 200, 'New Game', { fontSize: 40, fill: '#fff' });
    this.gameButton = new Button(this, config.width / 2, config.height / 2, 'blueButton1', 'blueButton2', 'Play!', 'Title');
    this.text = this.add.text(230, 380, 'Change Username', { fontSize: 40, fill: '#fff' });
    this.gameButton = new Button(this, config.width / 2, config.height / 2 + 180, 'blueButton1', 'blueButton2', 'Change', 'InputName');
    // Next Level
  }
}
