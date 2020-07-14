import sendData from '../data/sendData';
import getData from '../data/getData';

describe('Get the scores and usernames from the API', () => {
  test('Should save the score and the player to the API', () => {
    sendData(160, 'Kango').then(data => {
      expect(data.result).toBe('Leaderboard score created correctly.');
    }).catch(() => {

    });
  });

  test('The object should contain the created user', () => {
    getData().then(data => {
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            user: 'Kango',
          }),
        ]),
      );
    }).catch(() => {

    });
  });
  test('The object should contain the created score', () => {
    getData().then(data => {
      expect(data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            score: '160',
          }),
        ]),
      );
    }).catch(() => {

    });
  });
});