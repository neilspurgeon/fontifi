import React, {Component} from 'react';
import styles from './style.css';

class SegmentController extends Component {


  render(){
    const leftChecked = this.props.checked1;

    return (
      <div className={styles.SegmentController}>
        <div className={ leftChecked ? styles.selectedBg : [styles.selectedBg, styles.rightChecked].join(' ')} />

        <label
          className={styles.segment}
          data-checked={this.props.checked1}>
          <input
            type="radio"
            name={this.props.name1}
            value={this.props.value1}
            onChange={this.props.onChange}
            checked={this.props.checked1}
            className={styles.browserButton}
          />
          {this.props.value1}
        </label>

        <label
          className={styles.segment}
          data-checked={this.props.checked2}>
          <input
            type="radio"
            name={this.props.name2}
            value={this.props.value2}
            onChange={this.props.onChange}
            checked={this.props.checked2}
            className={styles.browserButton}
          />
          {this.props.value2}
        </label>

      </div>
    );
  };
}

export default SegmentController;