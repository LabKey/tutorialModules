import React from 'react'
import ReactDOM from 'react-dom'

import { ToDoListPage } from './ToDoListPage'

// Need to wait for container element to be available in labkey wrapper before render
window.addEventListener('DOMContentLoaded', (event) => {
    ReactDOM.render(<ToDoListPage/>, document.getElementById('app'));
});
