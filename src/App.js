import React, { Component } from 'react';
import Header from './components/Header/Header';
import MobileHeader from './components/MobileHeader/MobileHeader';
import Footer from './components/Footer/Footer';
import Routes from './routes';
import Welcome from './components/Welcome/Welcome';
import './styles/foundation.min.css';
import './styles/custom.css';


class App extends Component {

  constructor(props){
    super(props);
    this.state ={
      appName : 'Clapping Ape'
    }
  }

  render() {
    return (
      <div className="off-canvas-wrapper">
        <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
    
          <div className="off-canvas-content" data-off-canvas-content>
            <MobileHeader name={this.state.appName}/>
            <Header name={this.state.appName}/>
            <Routes />
              <hr />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
