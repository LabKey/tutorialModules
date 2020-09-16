import React, { FC, memo, useCallback, ChangeEvent } from 'react';

interface Props {
    label: string;
    setLabel: (label: string) => void;
    addItem: () => void;
    clearAll: () => void;
}

export const ToDoForm: FC<Props> = memo(({ addItem, clearAll, label, setLabel }) => {
    const onChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        setLabel(event.target.value);
    }, [setLabel]);
    const onSubmit = useCallback((event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();
        addItem();
    }, [addItem]);

    return (
        <div className="panel panel-primary">
            <div className="panel-heading">
                Add To-Do Items
            </div>

            <div className="panel-body">
                <form className="todo-form" onSubmit={onSubmit}>
                    <input
                        className="form-control"
                        onChange={onChange}
                        placeholder="Enter a To-Do"
                        type="text"
                        value={label}
                    />

                    <button className="btn labkey-button primary" onClick={addItem} type="button">
                        Add Item
                    </button>

                    <button className="btn btn-default" onClick={clearAll} type="button">
                        Clear All
                    </button>
                </form>
            </div>
        </div>
    );
});
