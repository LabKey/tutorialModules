/*
 * Copyright (c) 2019 LabKey Corporation
 *
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
module.exports = {
    apps: [{
        name: 'helloWorld',
        title: 'Hello World Page',
        permission: 'read',
        path: './src/client/HelloWorldPage'
    },{
        name: 'todoList',
        title: 'To-Do List Page',
        permission: 'insert',
        path: './src/client/ToDoListPage'
    },{
        name: 'demoWebpart',
        title: 'To-Do List Webpart',
        permission: 'read',
        path: './src/client/ToDoListPage/webpart',
        generateLib: true // used by views/demoWebpart.html
    },{
        name: 'queryModel',
        title: 'QueryModel Example Page',
        permission: 'read',
        path: './src/client/QueryModelPage'
    },{
        name: 'fileAttachmentForm',
        title: 'File Attachment Example Page',
        permission: 'insert',
        path: './src/client/FileAttachmentPage'
    }]
};