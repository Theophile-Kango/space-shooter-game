const getData = async () => {
  try {
    const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
    const key = 'games/1eB7BHo2PUG0MzBK9ZQH/scores/';
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
    
  } catch (err) {
    errorMessage('Give a valid location');
  }
}

export default getData;