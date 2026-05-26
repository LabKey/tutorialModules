/*
 * Copyright (c) 2023-2026 LabKey Corporation
 *
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';
import { Modal } from '@labkey/components';

interface Props {
    close: () => void;
    submit: (name: string) => void;
}

export const CreateDirectoryModal : FC<Props> = memo(props => {
    const { close, submit } = props;
    const [name, setName] = useState<string>('');

    const onChange = useCallback((evt: ChangeEvent<HTMLInputElement>) => {
        setName(evt.target.value);
    }, []);

    const _submit = useCallback(() => {
        submit(name?.trim());
    }, [submit, name]);

    return (
        <Modal
            canConfirm={name?.trim().length === 0}
            confirmText="Submit"
            onCancel={close}
            onConfirm={_submit} title="Create Directory"
        >
            <div className="form-group row">
                <div className="col-xs-4">
                    <div>Directory Name:</div>
                </div>
                <div className="col-xs-8">
                    <input type="text" id={'directory-name'} name={'directory-name'} onChange={onChange}/>
                </div>
            </div>
        </Modal>
    )
});