class GameHelper {
  constructor(level, life, time) {
    this.level = level;
    this.time = time;
    this.life = life;
  }

  increaseLevel() {
    if ((this.time === 60) || (this.time === 120)) {
      this.level += 1;
      this.life += 1;
    }
    return [this.level, this.life];
  }
}

export default GameHelper;