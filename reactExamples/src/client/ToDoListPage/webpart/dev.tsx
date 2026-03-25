import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@labkey/api';

import { ToDoListPage } from "../ToDoListPage";

App.registerApp<any>('demoWebpart', (target: string) => {
    createRoot(document.getElementById(target)).render(<ToDoListPage />);
}, true /* hot */);
