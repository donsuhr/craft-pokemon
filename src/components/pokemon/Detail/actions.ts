// @ts-ignore
import qrate from 'qrate';
import config from '../../../config';
import { shouldFetch } from './reducers';
import { AppThunk } from '../../../redux/types';
import { getDetailState } from '../../../redux/selectors';
import { receiveDetails, requestDetails } from './actions-sync';

type FetcherFn = (
  { id, dispatch }: { id: string; dispatch: any },
  done: () => void,
) => void;

const fetcher: FetcherFn = ({ id, dispatch }, done) => {
  const url =
    process.env.DEV_USE_FIXTURE_FOR_API === 'true'
      ? /* istanbul ignore next */
        '/components/pokemon/Detail/fixtures/1.json'
      : `${config.pokeapi.url}/pokemon/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      dispatch(receiveDetails(json, id));
    })
    .finally(done);
};

// concurrency, rateLimit x workers per second
const q = qrate(fetcher, 4, 4);

const fetchItem = (id: string): AppThunk => (dispatch) => {
  dispatch(requestDetails(id));
  q.push({ id, dispatch });
};

export const fetchIfNeeded = (id: string): AppThunk => (dispatch, getState) => {
  if (shouldFetch(getDetailState(getState()), id)) {
    return dispatch(fetchItem(id));
  }
  return false;
};
