// @ts-ignore
import qrate from 'qrate';
import { AppThunk } from '@/store/types';
import { getDetailState } from '@/store/selectors';
import { getDetails } from '@/service/details';
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

const fetcher: FetcherFn = async ({ id, dispatch }, done) => {
  try {
    const details = await getDetails(id);
    if (details.offline) {
      dispatch(receiveOffline(id));
    } else {
      dispatch(receiveSuccess(details, id));
    }
  } catch (e) {
    dispatch(receiveError(e, id));
  }
  done();
};

// concurrency: n at a time, rateLimit: n calls per second
const q = qrate(fetcher, 4, 10);

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
