import 'phaser';

import './style/style.scss';
import config from './config/config';
import GameScene from './scenes/gameScene';
import BootScene from './scenes/bootScene';
import PreloaderScene from './scenes/preloaderScene';
import TitleScene from './scenes/titleScene';
import OptionsScene from './scenes/optionsScene';
import CreditsScene from './scenes/creditsScene';
import PlayerName from './scenes/nameScene';
import Model from './model';
import CheckName from './scenes/checkNameScene';
import LeaderBoardScene from './scenes/leaderBoardScene';
class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Credits', CreditsScene);
    this.scene.add('Game', GameScene);
    this.scene.add('InputName', PlayerName);
    this.scene.add('CheckName', CheckName);
    this.scene.add('LoaderBoard', LeaderBoardScene);
    this.scene.start('Boot');
  }
}

window.game = new Game();