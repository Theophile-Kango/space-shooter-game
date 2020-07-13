const getData = async () => {
  const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
  const key = 'games/AaeWD9xYeWTS4TXaAlbT/scores/';
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  const request = await fetch(`${api}${key}`, data);
  const response = await request.json();
  return response.result;
};

export default getData;