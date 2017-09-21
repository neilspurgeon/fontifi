import React from 'react';
import styles from './style.css';
import { Link } from 'react-router-dom';
import logo from './fontifi-logo.svg';
import ClassNames from 'classnames';

class Navigation extends React.Component {

  render() {

    let navClassnames = ClassNames(styles.nav, {[styles.controlsOpen] : this.props.controlsOpen});

    return (
      <div>
        <Link to={'/'} className={styles.siteLogo}>
          <img src={logo} alt="findafont logo" width="60px"/>
        </Link>

        <nav className={navClassnames}>
          <Link to={'/'}>Generator</Link>
          <Link to={'/'}>My Collection</Link>
          <Link to={'/about'}>About</Link>
        </nav>

      </div>
    );
  };
};

export default Navigation;