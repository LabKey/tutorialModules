import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './QueryModelExample';
import './queryModelExample.scss';

const render = () => {
    ReactDOM.render(<App />, document.getElementById('app'));
};

render();
