import React from 'react';
import ReactDOM from 'react-dom';

import App from '.';

if(typeof window !== 'undefined') {
  ReactDOM.hydrate(<App />, document.getElementsByTagName('main')[0]);
}

export {App};