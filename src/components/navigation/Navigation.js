import React from 'react';
import styles from './style.css';
import { Link, NavLink } from 'react-router-dom';
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
          <ul className={styles.navUl}>
            <li className={styles.navLi}>
              <NavLink
                exact
                activeStyle={{borderBottom: '1px solid #000'}}
                className={styles.navLink}
                to={'/'}>
                Generator
              </NavLink>
            </li>

            <li className={styles.navLi}>
              <NavLink
                activeStyle={{borderBottom: '1px solid #000'}}
                className={styles.navLink}
                to={'/collection'}>
                My Collection
              </NavLink>
            </li>

            <li className={styles.navLi}>
              <NavLink
                activeStyle={{borderBottom: '1px solid #000'}}
                className={styles.navLink}
                to={'/about'}>
                About
              </NavLink>
            </li>

          </ul>
        </nav>

      </div>
    );
  };
};

export default Navigation;