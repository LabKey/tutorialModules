import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './HelloWorld';
import './helloWorld.scss';

const render = () => {
    ReactDOM.render(<App />, document.getElementById('app'));
};

render();
