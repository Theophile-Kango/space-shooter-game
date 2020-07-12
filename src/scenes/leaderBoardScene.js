import 'phaser';
import Button from '../objects/button';
import getData from '../data/getData';

export default class LoaderBoardScene extends Phaser.Scene {
  constructor() {
    super('LoaderBoard');
  }

  create() {

    getData().then((scores) => {
      scores.sort((a, b) => b.score - a.score);
      this.add.text(130, 20, 'RANK   NAME   SCORE');
      if (getData().length <= 15){
        for (let i = 0; i < getData().length; i += 1) {
          this.add.text(100, 30 * (i + 1), ` 
          ${i + 1}     ${scores[i].user}     ${scores[i].score}
          `, 
          { fill: '#fff' });
        }
      }else{
        for (let i = 0; i < 15; i += 1) {
          this.add.text(100, 30 * (i + 1), ` 
          ${i + 1}     ${scores[i].user}     ${scores[i].score}
          `, 
          { fill: '#fff' });
        }
      }
      
    });

    new Button(this, 400, 500, 'blueButton1', 'blueButton2', 'Menu', 'Title');
  }
  
}
