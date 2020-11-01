import * as React from 'react';
import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { getItemById } from '../Detail/reducers';
import { fetchIfNeeded } from '../Detail/actions';
import ListItem from './ListItem';
import styles from './listItem.module.scss';
import Loading from '../../Loading';

interface Props {
  name: string;
  isFetching: boolean;
  img: string;
  id: string;
}

interface OwnPropsType {
  id: string;
  name: string;
}

const Container = ({ name, img, isFetching, id }: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchIfNeeded(id));
  }, []);

  return (
    <li className={styles.listItem}>
      {isFetching && <Loading />}
      <ListItem id={id} img={img} name={name} />
    </li>
  );
};

function mapStateToProps(state: ApplicationState, ownProps: OwnPropsType) {
  const item = getItemById(state.pokemonDetail, ownProps.id);
  return {
    id: ownProps.id,
    isFetching: item.isFetching,
    name: ownProps.name,
    img: item.details.img,
  };
}

const Connected = connect(mapStateToProps)(Container);

export default Connected as ListItemContainer;
