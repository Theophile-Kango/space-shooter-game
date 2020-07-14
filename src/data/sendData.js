import 'regenerator-runtime'; // eslint-disable-line import/no-extraneous-dependencies

const fetch = require('node-fetch');

const sendData = async (score, user) => {
  const body = JSON.stringify({ score, user });
  const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/AaeWD9xYeWTS4TXaAlbT/scores/';
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
};

export default sendData;