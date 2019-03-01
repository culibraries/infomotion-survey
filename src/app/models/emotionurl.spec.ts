import { EmotionUrl } from './emotionurl';

describe('Emotionurl', () => {
  it('should create an instance', () => {
    expect(new EmotionUrl('', '')).toBeTruthy();
  });

  it('should return the original url', () => {
    expect(new EmotionUrl('calm.png', 'calm-active.png').getURL()).
    toMatch('assets/images/emotion/calm.png');
  });

  it('should return the active url', () => {
    expect(new EmotionUrl('calm.png', 'calm-active.png').getURLActive()).
    toMatch('assets/images/emotion/calm-active.png');
  });
});
