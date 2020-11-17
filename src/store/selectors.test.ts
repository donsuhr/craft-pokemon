import { getFilteredItems } from './selectors';
import { getStateFixture } from './mock-store-creator';

describe('Root Selectors', () => {
  it('should set viewAll', () => {
    const state = getStateFixture();
    expect(getFilteredItems(state).length).toBe(3);
  });

  it('should set viewAll', () => {
    const state = getStateFixture();
    state.ui.filterText = 'three';
    const result = getFilteredItems(state);
    expect(result.length).toBe(1);
    expect(result[0]).toMatchObject(state.pokemon.byId['3']);
  });

  it('can limit its search to the bag', () => {
    const state = getStateFixture();
    state.ui.filterText = 'three';
    state.ui.viewAll = true;
    expect(getFilteredItems(state).length).toBe(1);
    const state1 = getStateFixture();
    state1.ui.filterText = 'three';
    state1.ui.viewAll = false;
    expect(getFilteredItems(state1).length).toBe(0);
  });

  it('reset returns all items', () => {
    const state = getStateFixture();
    state.ui.filterText = 'three';
    state.ui.viewAll = true;
    expect(getFilteredItems(state).length).toBe(1);
    const state1 = getStateFixture();
    state1.ui.filterText = '';
    state1.ui.viewAll = true;
    expect(getFilteredItems(state1).length).toBe(3);
  });
});
