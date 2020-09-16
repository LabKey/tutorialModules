import React, { FC, memo, useCallback, useState } from 'react'
import "./todolist.scss";
import { ToDoForm } from './ToDoForm';
import { ToDoList } from './ToDoList';
import { Item } from './models';

export const ToDoListPage: FC = memo(() => {
    const [items, setItems] = useState<Item[]>([]);
    const [label, setLabel] = useState<string>('');
    const addItem = useCallback(() => {
        setItems(items.concat({ id: items.length + 1, isComplete: false, label }));
        setLabel('');
    }, [items, label]);
    const clearAll = useCallback(() => setItems([]), [setItems]);
    const onItemClick = useCallback((id) => {
        setItems(items.map(item => {
            if (id === item.id) {
                return {...item, isComplete: !item.isComplete };
            }

            return item;
        }));
    }, [items]);

    return (
        <div className="todo-list-page">
            <ToDoForm addItem={addItem} clearAll={clearAll} label={label} setLabel={setLabel} />
            <ToDoList items={items} onItemClick={onItemClick} />
        </div>
    );
});
