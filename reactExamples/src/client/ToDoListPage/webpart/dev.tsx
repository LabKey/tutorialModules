import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { App } from '@labkey/api';

import { ToDoListPage } from "../ToDoListPage";

App.registerApp<any>('demoWebpart', (target: string) => {
    ReactDOM.render(
        <AppContainer>
            <ToDoListPage />
        </AppContainer>,
        document.getElementById(target)
    );
}, true /* hot */);

declare const module: any;
