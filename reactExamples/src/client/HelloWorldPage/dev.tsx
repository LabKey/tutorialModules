import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './HelloWorld';
import './helloWorld.scss';

const render = () => {
    createRoot(document.getElementById('app')).render(<App/>);
};

render();
