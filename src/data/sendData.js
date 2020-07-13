import 'regenerator-runtime';

const fetch = require('node-fetch');

const sendData = async (score, user) => {
  try {
    const body = JSON.stringify({ score, user });
    const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/1eB7BHo2PUG0MzBK9ZQH/scores/';
    const request = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    };
    const response = await fetch(api, request);
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export default sendData;