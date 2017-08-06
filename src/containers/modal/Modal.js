import React, {Component} from 'react';
import styles from './style.css';
import Portal from 'react-portal';
import { CSSTransitionGroup } from 'react-transition-group';

class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
    this.overlayClassNames = [styles.overlay];
    this.reveal = this.reveal.bind(this);
  }

  componentWillRecieveProps(props) {
    console.log(props);
  }

  reveal() {
    this.overlayClassNames.push(styles.show);
  }


  render() {

    // let overlayClassNames = ;

    return (


        <Portal isOpened={this.props.isOpen} closeOnEsc={true}>

          <CSSTransitionGroup
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>

            <div key={'asdads'} className={this.overlayClassNames.join(' ')} onClick={this.props.closeModal}>
              <div className={styles.modal}>
                <button onClick={this.props.closeModal}>Close</button>
                {this.props.children}
              </div>
            </div>

          </CSSTransitionGroup>
        </Portal>

    );
  }

}

export default Modal;