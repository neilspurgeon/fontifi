import React from 'react';
import styles from './style.css';

class Lock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLocked: false
    };
  }

  handleClick = () => {
    this.setState({
      isLocked: !this.state.isLocked
    });
    this.props.handleClick && this.props.handleClick();
  }

  render() {
    return(
      <div
        className={this.props.className ? [styles.container, this.props.className].join(' ') : styles.container} onClick={this.handleClick}>
        <svg
          className={this.state.isLocked ? [styles.lock, styles.isLocked].join(' ') : styles.lock}
          width="15px"
          height="22px"
          viewBox="0 0 15 22"
          version="1.1"
          fill="none">
          <rect fill="#000" x="0" y="9" width="15" height="11" rx="2.5"></rect>
          <path className={styles.lockTop} d="M3.5,9 L3.5,4 C3.5,1.790861 5.290861,4.05812251e-16 7.5,0 L7.5,0 C9.709139,-4.05812251e-16 11.5,1.790861 11.5,4 L11.5,7" stroke="#000" strokeWidth="2"></path>
          <circle fill="#000" cx="7.5" cy="13.5" r="2"></circle>
          <rect fill="#000" x="6.25" y="13.5" width="2.5" height="4" rx="1"></rect>
        </svg>
      </div>
    );
  }
}

export default Lock;
