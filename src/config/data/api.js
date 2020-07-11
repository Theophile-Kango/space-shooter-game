import { getUsername, levelFormat } from './helperFunctions';

const api = async (user, score) => {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('user', levelFormat(level, getUsername()));
  urlencoded.append('score', `${score}`);

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow',
  };

  const response = await fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/1eB7BHo2PUG0MzBK9ZQH/scores/', requestOptions);
  const data = await response.json();
  return data;
};

export default api;