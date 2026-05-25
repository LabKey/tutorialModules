/*
 * Copyright (c) 2023-2026 LabKey Corporation
 *
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@labkey/api';

import { ToDoListPage } from "../ToDoListPage";

App.registerApp<any>('demoWebpart', (target: string) => {
    createRoot(document.getElementById(target)).render(<ToDoListPage />);
}, true /* hot */);
