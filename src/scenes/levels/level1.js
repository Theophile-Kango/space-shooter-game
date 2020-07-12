export default (scene) => {
  const resetPosition = Phaser.Math.Between(0, 800);
  const randomNum = Math.floor(Phaser.Math.Between(0, scene.smallMeteors.length));
  const meteorKey = scene.smallMeteors[randomNum];
  scene.meteor = scene.physics.add.sprite(resetPosition, 0, meteorKey);
  //scene.meteor.setCollideWorldBounds(true);
  scene.meteor.body.bounce.y = 0.8;
  //scene.meteor.body.allowGravity = true;
  scene.meteor.body.onWorldBounds = true;
  scene.meteor.body.world.on('worldbounds', function(body) {
    // Check if the body's game object is the sprite you are listening for
    if (body.gameObject === scene) {
      // Stop physics and render updates for this object
      scene.setActive(false);
      scene.setVisible(false);
    }
  }, scene);
  scene.meteor.body.velocity.y = 100;
};
