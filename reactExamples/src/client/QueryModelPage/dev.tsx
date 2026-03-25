import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './QueryModelExample';
import './queryModelExample.scss';

const render = () => {
    createRoot(document.getElementById('app')).render(<App/>);
};

render();
