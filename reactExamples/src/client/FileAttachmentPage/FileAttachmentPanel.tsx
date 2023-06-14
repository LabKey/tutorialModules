import React, { FC, memo, useCallback } from 'react';
import { FileAttachmentForm } from '@labkey/components';
import { Map } from 'immutable';
import { Draft, produce } from 'immer';
import { FileAttachmentModel } from "./models";
import { Panel } from 'react-bootstrap';

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
                        acceptedFormats=".pdf, .jpg"
                        allowDirectories={false}
                        allowMultiple={true}
                        showLabel={false}
                        showButtons={true}
                        onSubmit={onSaveBtnHandler}
                        onFileChange={onFileChange}
                    />
                </div>
            </div>
    );
})