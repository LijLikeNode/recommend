import React from 'react';
import ReactDOM from 'react-dom';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import './assets/css/index.less';
import './assets/css/common.less';
import './assets/css/antdReStyle.less';
import './assets/js/rem.js'
import App from './router';


ReactDOM.render(
<TransitionGroup>
    <CSSTransition
      appear={true}
      classNames="appAppear"
      timeout={500}
    >
      <App/>
    </CSSTransition>
  </TransitionGroup>, document.getElementById('root'));
