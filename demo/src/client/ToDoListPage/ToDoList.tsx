import React, { FC, memo, useCallback } from 'react';
import { getServerContext } from '@labkey/api';

import { Item } from './models';

interface ToDoItemProps {
    item: Item;
    onItemClick: (id: number) => void;
}

const ToDoItem: FC<ToDoItemProps> = memo(({ item, onItemClick }) => {
    const { isComplete, id, label } = item;
    const onClick = useCallback(() => onItemClick(id), [id, onItemClick]);
    const inputId = `todo-item-${id}`

    return (
        <li className="todo-item">
            <input id={inputId} checked={isComplete} type="checkbox" onClick={onClick}/>
            <label htmlFor={inputId}>{id} - {label}</label>
        </li>
    );
});

interface ToDoListProps {
    items: Item[];
    onItemClick: (id: number) => void;
}

export const ToDoList: FC<ToDoListProps> = memo(({ items, onItemClick }) => {
    const completedItems = items.filter(i => i.isComplete);
    const incompleteItems = items.filter(i => !i.isComplete);

    return (
        <div className="todo-list-wrapper panel panel-default">
            <div className="panel-heading">
                To-Dos for {getServerContext().user.displayName}
            </div>

            <div className="panel-body">
                <p>To-Do:</p>

                {incompleteItems.length === 0 && (
                    <p>All To-Dos complete!</p>
                )}

                <ul className="todo-list">
                    {incompleteItems.map((item) => <ToDoItem item={item} key={item.id} onItemClick={onItemClick} />)}
                </ul>

                <p>Completed:</p>
                
                <ul className="todo-list todo-list--completed">
                    {completedItems.map((item) => <ToDoItem item={item} key={item.id} onItemClick={onItemClick} />)}
                </ul>
            </div>
        </div>
    );
});
