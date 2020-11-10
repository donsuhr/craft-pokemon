import { bag, getInBag, getBagItems } from './reducers';
import { PokemonBagActionTypes } from './types';

describe('pokemon bag reducer', () => {
  it('should return the initial state', () => {
    expect(bag(undefined, { type: 'foo' })).toEqual([]);
  });

  it('adds an item', () => {
    expect(
      bag(undefined, { type: PokemonBagActionTypes.ADD, payload: '2' }),
    ).toEqual(['2']);
  });

  it('removes an item', () => {
    expect(
      bag(['1', '2'], { type: PokemonBagActionTypes.REMOVE, payload: '2' }),
    ).toEqual(['1']);
  });

  it('doesnt error removing not found item', () => {
    expect(
      bag(['1', '2'], { type: PokemonBagActionTypes.REMOVE, payload: '3' }),
    ).toEqual(['1', '2']);
  });

  describe('selectors', () => {
    it('tests if has an item', () => {
      expect(getInBag(['1', '2'], '2')).toBeTruthy();
      expect(getInBag(['1', '2'], '3')).toBeFalsy();
    });

    it('returns the items... which happens to be the state', () => {
      const state = ['1', '3'];
      expect(getBagItems(state)).toEqual(state);
    });
  });
});
