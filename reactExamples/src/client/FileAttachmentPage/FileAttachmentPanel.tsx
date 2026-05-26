/*
 * Copyright (c) 2023-2026 LabKey Corporation
 *
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import React, { FC, memo, useCallback } from 'react';
import { FileAttachmentForm } from '@labkey/components';
import { Map } from 'immutable';
import { Draft, produce } from 'immer';
import { FileAttachmentModel } from "./models";

interface Props {
    model: FileAttachmentModel;
    onInputChange: (model: FileAttachmentModel) => void;
    onSaveBtnHandler: () => void;
}

// Functional component which would be rendered as part of the parent component
export const FileAttachmentPanel: FC<Props> = memo((props) => {
    const { model, onInputChange, onSaveBtnHandler } = props;

    const onFileChange = useCallback((files: Map<string, File>) => {
        const updatedModel = produce(model, (draft: Draft<FileAttachmentModel>) => {
            draft['filesToUpload'] = files;
        });
        onInputChange(updatedModel);
    }, [model, onInputChange]);

    return (
            <div className='panel panel-default'>
                <div className='panel-heading'>
                    My File Attachments
                </div>
                <div className='panel-body'>
                    <FileAttachmentForm
                        acceptedFormats=".jpg, .pdf, .png"
                        allowDirectories
                        allowMultiple
                        includeDirectoryFiles
                        fileCountSuffix="included"
                        showLabel={false}
                        showButtons
                        onSubmit={onSaveBtnHandler}
                        onFileChange={onFileChange}
                    />
                </div>
            </div>
    );
})