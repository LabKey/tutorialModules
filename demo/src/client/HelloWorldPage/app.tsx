import React from 'react'
import ReactDOM from 'react-dom'

import {App} from './HelloWorld'

// Need to wait for container element to be available in labkey wrapper before render
window.addEventListener('DOMContentLoaded', (event) => {
    ReactDOM.render(<App/>,
        // TODO: Use this when not using shadow root
        document.getElementById('app')

        // TODO: Use this when using shadow root
        // window['shadowRoot'].getElementById('app')
    );
});
