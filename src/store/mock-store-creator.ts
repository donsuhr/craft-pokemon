import thunk, { ThunkDispatch } from 'redux-thunk';
import configureStore, {
  MockStoreCreator,
  MockStoreEnhanced,
} from 'redux-mock-store'; // eslint-disable-line import/no-extraneous-dependencies
import { AnyAction, Middleware } from 'redux';
import { ApplicationState } from '@/store/types';
import { PokemonDetailState } from '@/components/pokemon/Detail/reducers';

const middlewares: Array<Middleware> = [thunk];
type DispatchExts = ThunkDispatch<ApplicationState, undefined, AnyAction>;
export const mockStoreCreator: MockStoreCreator<
  ApplicationState,
  DispatchExts
> = configureStore<ApplicationState, DispatchExts>(middlewares);
export type MockStoreType = MockStoreEnhanced<ApplicationState, DispatchExts>;

const pokemonDetail: PokemonDetailState = {
  byId: {
    1: {
      details: {
        id: '2',
        weight: 200,
        height: 200,
        baseExperience: 20,
        img: 'img',
        types: ['one', 'two'],
        abilities: ['one', 'two'],
        name: 'title target',
      },
      hasEverLoaded: true,
      isFetching: false,
    },
  },
};

export const stateFixture: ApplicationState = {
  pokemon: {
    byId: {
      1: {
        id: '1',
        name: 'one',
        url: 'url',
      },
      2: {
        id: '2',
        name: 'two',
        url: 'url',
      },
      3: {
        id: '3',
        name: 'three',
        url: 'url',
      },
    },
    isFetching: false,
    hasEverLoaded: true,
  },
  pokemonBag: ['1', '2'],
  pokemonDetail,
  ui: {
    filterText: '',
    viewAll: true,
  },
  pokemonMap: {
    byId: {
      1: {
        isFetching: false,
        hasEverLoaded: true,
        locations: ['1', '2'],
      },
    },
  },
};
