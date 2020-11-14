import { getFilteredItems } from './selectors';
import { stateFixture } from './mock-store-creator';

describe('Root Selectors', () => {
  it('should set viewAll', () => {
    expect(getFilteredItems(stateFixture).length).toBe(3);
  });

  it('should set viewAll', () => {
    const state = {
      ...stateFixture,
      ui: {
        ...stateFixture.ui,
        filterText: 'three',
      },
    };
    const result = getFilteredItems(state);
    expect(result.length).toBe(1);
    expect(result[0]).toMatchObject(stateFixture.pokemon.byId['3']);
  });

  it('can limit its search to the bag', () => {
    const state = {
      ...stateFixture,
      ui: {
        ...stateFixture.ui,
        viewAll: true,
        filterText: 'three',
      },
    };
    expect(getFilteredItems(state).length).toBe(1);
    const state1 = {
      ...stateFixture,
      ui: {
        ...stateFixture.ui,
        viewAll: false,
        filterText: 'three',
      },
    };
    expect(getFilteredItems(state1).length).toBe(0);
  });

  it('reset returns all items', () => {
    const state = {
      ...stateFixture,
      ui: {
        ...stateFixture.ui,
        viewAll: true,
        filterText: 'three',
      },
    };
    expect(getFilteredItems(state).length).toBe(1);
    const state1 = {
      ...stateFixture,
      ui: {
        ...stateFixture.ui,
        viewAll: true,
        filterText: '',
      },
    };
    expect(getFilteredItems(state1).length).toBe(3);
  });
});
