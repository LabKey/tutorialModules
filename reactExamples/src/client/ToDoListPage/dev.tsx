import React from 'react';
import ReactDOM from 'react-dom';

import { ToDoListPage } from './ToDoListPage';

const render = () => {
    ReactDOM.render(<ToDoListPage />, document.getElementById('app'))
};

render();
