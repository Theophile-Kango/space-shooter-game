import Phaser from 'phaser';
import Button from '../objects/button';
import config from '../config/config';
import background from '../../assets/background.png';
import blueBtn1 from '../../assets/ui/blue_button02.png';
import blueBtn2 from '../../assets/ui/blue_button03.png';

const inputField = document.querySelector('.name');

class PlayerName extends Phaser.Scene {
  constructor() {
    super('InputName');
  }

  preload() {
    this.load.image('background-loading', background);
    this.load.image('blueButton1', blueBtn1);
    this.load.image('blueButton2', blueBtn2);
  }

  create() {
    inputField.classList.toggle('closed');
    this.add.image(400, 300, 'background-loading');

    this.text = this.add.text(300, 70, 'Welcome!', { fontSize: 40, fill: '#fff' });
    this.text = this.add.text(230, 210, 'Give your Name', { fontSize: 40, fill: '#fff' });
    // Next Level
    this.gameButton = new Button(this, config.width / 2, config.height - 200, 'blueButton1', 'blueButton2', 'Submit', 'Title', inputField);
  }
}

export default PlayerName;
