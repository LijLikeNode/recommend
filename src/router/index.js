import React, { Component } from 'react';
import RouterContainer from './router';
import stores from '../store';
import { Provider } from 'mobx-react';

class App extends Component {
  render() {
    return (
      <Provider {...stores}>
          <RouterContainer/>
      </Provider>
    );
  }
}

export default App;