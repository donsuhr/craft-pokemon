// @ts-ignore
import qrate from 'qrate';
import { AppThunk } from '@/store/types';
import { getDetailState } from '@/store/selectors';
import config from '@/config';
import { checkFetchResponse, parseJSON } from '@/service/util';
import { shouldFetch } from './reducers';
import {
  receiveSuccess,
  request,
  receiveError,
  receiveOffline,
} from './actions-sync';
import { Requestor } from './types';

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
    .then(checkFetchResponse)
    .then(parseJSON)
    .then((json) => {
      if (json.offline) {
        dispatch(receiveOffline(id));
      } else {
        dispatch(receiveSuccess(json, id));
      }
    })
    .catch((e) => {
      dispatch(receiveError(e, id));
    })
    .finally(done);
};

// concurrency, rateLimit x workers per second
const q = qrate(fetcher, 4, 4);

const fetchItem = (id: string): AppThunk => (dispatch) => {
  dispatch(request(id));
  q.push({ id, dispatch });
};

export const fetchIfNeeded = ({
  id,
  retry = false,
  requestor,
}: {
  id: string;
  retry?: boolean;
  requestor?: Requestor;
}): AppThunk => (dispatch, getState) => {
  if (shouldFetch(getDetailState(getState()), { id, retry, requestor })) {
    return dispatch(fetchItem(id));
  }
  return false;
};
