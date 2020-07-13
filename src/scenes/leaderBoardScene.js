import 'phaser';
import Button from '../objects/button';
import getData from '../data/getData';

export default class LoaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LoaderBoard');
  }

  create() {
    getData().then((data) => {
      data.sort((a, b) => b.score - a.score);
      this.add.text(195, 20, 'RANK      NAME                SCORE');
      for (let i = 0; i < 7; i += 1) {
        this.add.text(100, 30 * (i + 1), `
           ${i + 1}        ${data[i].user}                 ${data[i].score}
        `,
        { fill: '#fff' });
      }
    });

    new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
}
