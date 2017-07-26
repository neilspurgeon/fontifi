import React, { Component } from 'react';
import styles from './style.css';

class FontControls extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);

    this.state = {
      fontController: 'heading',
      heading: {variants: ['headingnone']},
      body: {variants: ['bodynone']},
      activeFontIndex: 0,
      activeFontWeights: ['font weights'],
      fontList: [{"variants": ['Regular']}],
    };

    this.handleFontController = this.handleFontController.bind(this);
    this.fontSizes = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 36, 48, 64, 72, 144, 288];
  }




  // componentDidMount() {
  //   fetch('/fonts')
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((parsedData) => {
  //       this.setState({
  //         fontList: parsedData.items
  //       });
  //       this.setFont('heading', this.props);
  //       this.setFont('body', this.props);
  //     });
  // };

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.body) {
  //     this.setFont('body', nextProps);
  //   }
  //   if (nextProps.heading) {
  //     this.setFont('heading', this.props);
  //   }
  // }

  // setFont(fontType, props) {
  //   const fontList = this.state.fontList;
  //   const font = fontList.find((obj) => {
  //     return obj.family === this.state[fontType].fontFamily;
  //   });
  //   this.setState({
  //     fontType: font
  //   });
  // }



  componentDidMount() {
    fetch('/fonts')
      .then((response) => {
        return response.json();
      })
      .then((parsedData) => {
        this.setState({
          fontList: parsedData.items,
        });
        this.setHeading();
        this.setBody();
      });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.body) {
      this.setBody();
    }
    if (nextProps.heading) {
      this.setHeading();
    }
  }

  setBody() {
    const fontList = this.state.fontList;
    const bodyFont = fontList.find((obj) => {
      return obj.family === this.props.body.fontFamily;
    });
    this.setState({
      body: bodyFont
    });
  }

  setHeading() {
    const fontList = this.state.fontList;
    const font = fontList.find((obj) => {
      return obj.family === this.props.heading.fontFamily;
    });
    this.setState({
      heading: font
    });
  }

  handleFontController(event) {
    this.setState({
      fontController: event.target.value
    });
  }

  render() {
    return (
      <div className={styles.ControlPanel}>
        <p>{this.state.body.variants}</p>

        <form>
          <div>
            <label>
              <input
                type="radio"
                name="fontType"
                value="heading"
                onChange={this.handleFontController}
                checked={this.state.fontController === 'heading'} />
              Heading
            </label>

            <label>
              <input
                type="radio"
                name="fontType"
                value="body"
                onChange={this.handleFontController}
                checked={this.state.fontController === 'body'} />
              body
            </label>
          </div>

          <select
            className={styles.inputSelect}
            onChange={this.props.handleChange.bind(this, this.state.fontController, 'fontFamily')}
            value={this.state.fontController === 'heading' ? this.props.heading.fontFamily : this.props.body.fontFamily}>
            { this.state.fontList.map((fontObj, index) => {
              return <option
                value={fontObj.family}
                key={index}
                dataKey={index}>{fontObj.family}</option>;
            })}
          </select>


          <select
            className={styles.inputSelect}
            onChange={this.props.handleChange.bind(this, this.state.fontController, 'fontWeight')}
            value={this.state.fontController === 'heading' ? this.props.heading.fontWeight : this.props.body.fontWeight}>

            { this.state[this.state.fontController].variants.map((fontWeight) => {
              return <option value={fontWeight}>{fontWeight}</option>;
            }) }

          </select>

        </form>

      </div>
    );
  }
};

export default FontControls;