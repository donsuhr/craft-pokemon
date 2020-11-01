import * as React from 'react';
import { connect, useDispatch } from 'react-redux';
import { ApplicationState } from '../../../reducers';
import { getInBag } from './reducers';
import { add, remove } from './actions';
import styles from './toggle.module.scss';

interface OwnPropsType {
  id: string;
}

const Container = ({ id, inBag }: ContainerProps) => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const {target} = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    if (value) {
      dispatch(add(id));
    } else {
      dispatch(remove(id));
    }
  };

  return (
    <form className={styles.wrapper}>
      <label>
        In Bag 
        {' '}
        <input type="checkbox" checked={inBag} onChange={handleChange} />
      </label>
    </form>
  );
};

function mapStateToProps(state: ApplicationState, ownProps: OwnPropsType) {
  return {
    id: ownProps.id,
    inBag: getInBag(state.pokemonBag, ownProps.id),
  };
}

const Connected = connect(mapStateToProps)(Container);

export default Connected as Bag;
