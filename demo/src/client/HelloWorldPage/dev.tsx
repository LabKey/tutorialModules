import React from 'react'
import ReactDOM from 'react-dom'

import {AppContainer} from 'react-hot-loader'

import {App} from './HelloWorld'

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <App/>
        </AppContainer>,

        // TODO: Use this when not using shadow root
        document.getElementById('app')

        // TODO: Use this when using shadow root
        // window['shadowRoot'].getElementById('app')
    )
};

declare const module: any;

if (module.hot) {
    module.hot.accept();
}

render();