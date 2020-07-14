import Phaser from 'phaser';
import Button from '../objects/button';
import getData from '../data/getData';

export default class LoaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LoaderBoard');
  }

  create() {
    getData().then((data) => {
      data.sort((a, b) => b.score - a.score);
      this.add.text(195, 10, 'RANK      NAME                 SCORE');
      this.size = data.length < 10 ? data.length : 10;
      for (let i = 0; i < this.size; i += 1) {
        this.add.text(210, 40 * (i + 1), (i + 1));               
        this.add.text(290, 40 * (i + 1), data[i].user);
        this.add.text(500, 40 * (i + 1), data[i].score);
      }
    });

    this.menuButton = new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}
