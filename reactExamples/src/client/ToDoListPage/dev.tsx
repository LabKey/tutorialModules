import React from 'react';
import { createRoot } from 'react-dom/client';

import { ToDoListPage } from './ToDoListPage';

const render = () => {
    createRoot(document.getElementById('app')).render(<ToDoListPage />);
};

render();
