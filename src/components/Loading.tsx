import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './loading.module.scss';

const cx = classNames.bind(styles);

class Loading extends React.Component {
  componentDidMount() {
    const { parentNode } = this.node;
    const x = parentNode.offsetWidth / 2 - this.node.offsetWidth / 2;
    const y = Math.max(
      0,
      parentNode.offsetHeight / 2 - this.node.offsetHeight / 2,
    );
    this.node.style.left = `${x}px`;
    this.node.style.top = `${y}px`;
  }

  render() {
    const { withBg = false } = this.props;
    const className = cx({
      loading: true,
      'loading--with-background': withBg,
    });
    return (
      <div
        className={className}
        ref={(node) => {
          this.node = node;
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

/*
    static propTypes = {
        children: PropTypes.node.isRequired,
    };
*/

export default Loading;
