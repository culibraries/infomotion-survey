import { Survey } from './survey';

describe('Survey', () => {
  it('should create an instance', () => {
    expect(new Survey( 0, '', '')).toBeTruthy();
  });
});
