import React, {Component} from 'react';

class SegmentController extends Component {


  render(){
    return (
      <div>
        <label>
          <input
            type="radio"
            name={this.props.name1}
            value={this.props.value1}
            onChange={this.props.onChange}
            checked={this.props.checked1}
          />
          {this.props.value1}
        </label>

        <label>
          <input
            type="radio"
            name={this.props.name2}
            value={this.props.value2}
            onChange={this.props.onChange}
            checked={this.props.checked2}
          />
          {this.props.value2}
        </label>

      </div>
    );
  };
}

export default SegmentController;