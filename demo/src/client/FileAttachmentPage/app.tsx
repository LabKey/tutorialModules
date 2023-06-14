import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './FileAttachmentForm';

// Need to wait for container element to be available in labkey wrapper before render
window.addEventListener('DOMContentLoaded', (event) => {
    ReactDOM.render(<App/>, document.getElementById('app'));
});