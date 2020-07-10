export default (scene) => {
    let resetPosition = Phaser.Math.Between(0, 800);
    let randomNum = Math.floor(Phaser.Math.Between(0, scene.bigMeteors.length));
    let meteorKey = scene.bigMeteors[randomNum];
    scene.meteor = scene.physics.add.sprite(resetPosition, 0, meteorKey).setScale(1/2);
    scene.meteor.body.velocity.y = 100;
};