import React from 'react';
import styles from './style.css';
import { Link, NavLink } from 'react-router-dom';
import logo from './fontifi-logo.svg';
import Account from 'components/account';
import ClassNames from 'classnames';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false
    };
  };

  toggleNav = () => {
    this.setState({
      navOpen: !this.state.navOpen
    });
  };

  closeNav = () => {
    this.setState({
      navOpen: false
    });
  }

  render() {

    let navStyles = ClassNames(styles.nav, {[styles.isOpen] : this.state.navOpen });
    let menuStyles = ClassNames(styles.menuIcon, {[styles.isOpen] : this.state.navOpen });

    return (
      <div>
        <Link to={'/'} className={styles.siteLogo}>
          <img src={logo} alt="findafont logo" width="60px"/>
        </Link>

        <button className={menuStyles} onClick={this.toggleNav}>
          <div className={styles.menuIconTopLine} />
          <div className={styles.menuIconMiddleLine} />
          <div className={styles.menuIconBottomLine} />
        </button>

        <nav className={navStyles}>
          <ul className={styles.navUl}>
            <li className={styles.navLi}>
              <NavLink
                exact
                activeStyle={{opacity: 1}}
                className={styles.navLink}
                to={'/'}>
                Generator
              </NavLink>
            </li>

            <li className={styles.navLi}>
              <NavLink
                activeStyle={{opacity: 1}}
                className={styles.navLink}
                to={'/collection'}>
                My Collection
              </NavLink>
            </li>

          </ul>

          <div className={styles.account}>
            <Account closeNav={this.closeNav} navIsOpen={this.state.navOpen} />
          </div>

        </nav>

      </div>
    );
  };
};

export default Navigation;