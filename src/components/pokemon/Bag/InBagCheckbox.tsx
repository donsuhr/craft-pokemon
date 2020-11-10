import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState, getBagState } from '../../../redux/reducers';
import { getInBag } from './reducers';
import { add, remove } from './actions';
import styles from './InBagCheckbox.module.scss';

interface Props {
  id: string;
}

export default function InBagCheckbox({ id }: Props) {
  const dispatch = useDispatch();
  const inBag = useSelector((state: ApplicationState) =>
    getInBag(getBagState(state), id),
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    if (target.checked) {
      dispatch(add(id));
    } else {
      dispatch(remove(id));
    }
  };

  const labelfor = `inBagCheckbox${id}`;

  return (
    <>
      <label className={styles.label} htmlFor={labelfor}>
        In Bag
        <input
          className={styles.input}
          type="checkbox"
          id={labelfor}
          checked={inBag}
          onChange={handleChange}
        />
      </label>
    </>
  );
}
