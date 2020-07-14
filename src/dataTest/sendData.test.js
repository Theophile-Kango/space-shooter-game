import sendData from '../data/sendData';

describe('Send the score and the user name to the API', () => {
  test('Should save the score and the player to the API', (done) => {
    sendData(80, 'Theo').then(data => {
      expect(data.result).toBe('Leaderboard score created correctly.');
      done();
    });
  });
  test('Should send an object from the API', (done) => {
    sendData().then(data => {
      expect(typeof data).toBe('object');
      done();
    });
  });
});