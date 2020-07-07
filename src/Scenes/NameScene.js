import 'phaser';
import Button from '../Objects/Button';
import config from '../Config/config';
import background from '../../assets/background.png';
import blueBtn1 from '../../assets/ui/blue_button02.png';
import blueBtn2 from '../../assets/ui/blue_button03.png';

const inputField = document.querySelector('.name');

class PlayerName extends Phaser.Scene {
    constructor() {
        super('InputName');
    }

    preload() {
        this.load.image('background-loading', background);
        this.load.image('blueButton1', blueBtn1);
        this.load.image('blueButton2', blueBtn2);
    }

    create() {
        inputField.classList.toggle('closed');
        this.add.image(400, 300, 'background-loading');

        this.text = this.add.text(300, 70, 'Welcome!', { fontSize: 40, fill: '#fff' });
        this.text = this.add.text(230, 210, 'Give your Name', { fontSize: 40, fill: '#fff' });
        // Next Level
        this.gameButton = new Button(this, config.width / 2, config.height - 200, 'blueButton1', 'blueButton2', 'Submit', 'Title', inputField);
        
    }
}

export default PlayerName;

// var element;

// var game = new Phaser.Game(config);

// function preload ()
// {
//     this.load.html('nameform', 'assets/text/loginform.html');
// }

// function create ()
// {
    

//     var text = this.add.text(10, 10, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '32px '});

//     var element = this.add.dom(400, 600).createFromCache('nameform');

//     element.setPerspective(800);

//     element.addListener('click');

//     element.on('click', function (event) {

//         if (event.target.name === 'loginButton')
//         {
//             var inputUsername = this.getChildByName('username');

//             //  Have they entered anything?
//             if (inputUsername.value !== '')
//             {
//                 //  Turn off the click events
//                 this.removeListener('click');

//                 //  Tween the login form out
//                 this.scene.tweens.add({ targets: element.rotate3d, x: 1, w: 90, duration: 3000, ease: 'Power3' });

//                 this.scene.tweens.add({ targets: element, scaleX: 2, scaleY: 2, y: 700, duration: 3000, ease: 'Power3',
//                     onComplete: function ()
//                     {
//                         element.setVisible(false);
//                     }
//                 });

//                 //  Populate the text with whatever they typed in as the username!
//                 text.setText('Welcome ' + inputUsername.value);
//             }
//             else
//             {
//                 //  Flash the prompt
//                 this.scene.tweens.add({ targets: text, alpha: 0.1, duration: 200, ease: 'Power3', yoyo: true });
//             }
//         }

//     });
 
//     this.tweens.add({
//         targets: element,
//         y: 300,
//         duration: 3000,
//         ease: 'Power3'
//     });
// }