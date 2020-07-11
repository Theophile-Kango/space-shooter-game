export default (scene) => {
    const resetPosition = Phaser.Math.Between(0, 800);
    const randomNum = Math.floor(Phaser.Math.Between(0, scene.bigMeteors.length));
    const meteorKey = scene.bigMeteors[randomNum];
    scene.meteor = scene.physics.add.sprite(resetPosition, 0, meteorKey).setScale(1/2);
    scene.meteor.body.velocity.y = 200;
};