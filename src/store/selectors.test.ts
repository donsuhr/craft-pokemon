import { getFilteredItems } from './selectors';
import { getStateFixture } from './mock-store-creator';

describe('Root Selectors', () => {
  it('should set viewAll', () => {
    const state = getStateFixture();
    const location = {
      search: '?view=all',
    };
    expect(getFilteredItems(state, location).length).toBe(3);
  });

  it('should set viewAll', () => {
    const state = getStateFixture();
    state.ui.filterText = 'three';
    const location = {
      search: '?view=all&s=three',
    };
    const result = getFilteredItems(state, location);
    expect(result.length).toBe(1);
    expect(result[0]).toMatchObject(state.pokemon.byId['3']);
  });

  it('can limit its search to the bag', () => {
    const state = getStateFixture();
    state.ui.filterText = 'three';
    state.ui.viewAll = true;
    const location = {
      search: '?view=all&s=three',
    };
    expect(getFilteredItems(state, location).length).toBe(1);
    const state1 = getStateFixture();
    state1.ui.filterText = 'three';
    state1.ui.viewAll = false;
    const location1 = {
      search: '?view=bag&s=three',
    };
    expect(getFilteredItems(state1, location1).length).toBe(0);
  });

  it('reset returns all items', () => {
    const state = getStateFixture();
    state.ui.filterText = 'three';
    state.ui.viewAll = true;
    const location = {
      search: '?view=all&s=three',
    };
    expect(getFilteredItems(state, location).length).toBe(1);
    const state1 = getStateFixture();
    state1.ui.filterText = '';
    state1.ui.viewAll = true;
    const location1 = {
      search: '?view=all&s=',
    };
    expect(getFilteredItems(state1, location1).length).toBe(3);
  });
});
