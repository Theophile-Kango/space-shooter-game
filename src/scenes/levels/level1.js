export default (scene) => {
  const resetPosition = Phaser.Math.Between(0, 800);
  const randomNum = Math.floor(Phaser.Math.Between(0, scene.smallMeteors.length));
  const meteorKey = scene.smallMeteors[randomNum];
  scene.meteor = scene.physics.add.sprite(resetPosition, 0, meteorKey);
  scene.meteor.body.velocity.y = 100;
};
