async function keyGenerator() {
    //try{
        const fetch = require('node-fetch');
        const name = JSON.stringify({ name: 'Space Shooter Game' });
        const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
        const data = {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: name,
        };
    const key = await fetch(url, data);
    const keyData = await key.json();
    console.log(keyData);

}; 
keyGenerator();