import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const dataUrl = "https://www.mocky.io/v2/5a0081a83000008c08fabcda/";

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      activeZone: null
    };
  }
  
  handleClick(i) {
    this.setState({
      activeZone: i
    });
  }
  
  componentDidMount() {
    fetch(dataUrl)
      .then(response => {
        if (!response.ok) throw Error("Network request failed");
        return response;
      })
      .then(d => d.json())
      .then(d => {
        this.setState({
          coordinates: d
        })
      });
  }  
  
  render() {
    return (
      <div className="container">
        <Sidebar
          coordinates={this.state.coordinates}
          onClick={(i) => this.handleClick(i)}
          activeZone={this.state.activeZone}
        />
        <MainArea
          coordinates={this.state.coordinates}
          activeZone={this.state.activeZone}
        />
      </div>
    );
  }

}

class Sidebar extends React.Component {

  getZones() {
    return this.props.coordinates ?
      this.props.coordinates.map((coordinate, index) => {
        const label = 'Zone ' + index;
        return (
          <li key={index}>
            <ZoneButton
              isActive={this.props.activeZone === index}
              label={label}
              onClick={() => this.props.onClick(index)}
            />
          </li>
        );
      }) : [];
  }
  
  render() {    
    return (
      <div className="sidebar">
        <ol>{this.getZones()}</ol>
      </div>
    );
  }
}

function ZoneButton(props) {
  const cssClass = props.isActive ? 'active' : '';
  return (
    <button className={cssClass} onClick={props.onClick}>
      {props.label}
    </button>
  );
}

class MainArea extends React.Component {
  
  constructor(props) {
    super(props);
    this.canvasList = [];
  }
  
  render() {

    const canvasElems = this.props.coordinates ?
      this.props.coordinates.map((coordinates, i) => {
        return (
          <Canvas
            key={i}
            isActive={this.props.activeZone === i}
            coordinates={coordinates}
          />);
    }) : null;

    return (
      <div className="main-area">
        <div className="canvas-container">{canvasElems}</div>
      </div>
    );
  }
}

class Canvas extends React.Component {

  constructor(props) {
    super(props);
    window.addEventListener('resize', this.draw.bind(this));
  }

  draw() {
    if (this.canvas.getContext) {
      let ctx = this.canvas.getContext('2d');
      let ratio = Math.min(this.canvas.parentElement.offsetWidth,
        this.canvas.parentElement.offsetHeight);
      this.canvas.width = ratio;
      this.canvas.height = ratio;
      ctx.beginPath();
      ctx.moveTo(this.props.coordinates[0][0] * this.canvas.width,
        this.props.coordinates[0][1] * this.canvas.width);
      for(let i = 1; i < this.props.coordinates.length; i++) {
        ctx.lineTo(this.props.coordinates[i][0] * this.canvas.width,
          this.props.coordinates[i][1] * this.canvas.width);
      }
      ctx.fillStyle = this.props.isActive ? "#EF5350" : "#adb5bd";
      ctx.fill();
    }
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate() {
    this.draw();
  }

  render() {
    return (
      <canvas className="zone" ref={(canvas) => this.canvas = canvas }></canvas>
    );
  }

}

ReactDOM.render(<App />, document.getElementById("root"));