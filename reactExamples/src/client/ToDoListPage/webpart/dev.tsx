import React from 'react';
import ReactDOM from 'react-dom';
import { App } from '@labkey/api';

import { ToDoListPage } from "../ToDoListPage";

App.registerApp<any>('demoWebpart', (target: string) => {
    ReactDOM.render(<ToDoListPage />, document.getElementById(target));
}, true /* hot */);
