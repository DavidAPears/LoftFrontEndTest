import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
if (module.hot) {
  module.hot.accept();
}

// NB: For app to work offline and load faster, below can be changed from unregister() & register().
// Note this comes with some pitfalls. Learn more about service workers: http://bit.ly/CRA-PWA

serviceWorker.unregister();
