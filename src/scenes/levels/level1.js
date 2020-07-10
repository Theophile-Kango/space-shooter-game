export default (scene) => {
    let resetPosition = Phaser.Math.Between(0, 800);
    let randomNum = Math.floor(Phaser.Math.Between(0, 8));
    let meteorKey = scene.smallMeteors[randomNum];
    scene.meteor = scene.physics.add.sprite(resetPosition, 0, meteorKey);
    scene.meteor.body.velocity.y = 100;
};

