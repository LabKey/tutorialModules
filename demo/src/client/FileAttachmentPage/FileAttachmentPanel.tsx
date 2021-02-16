import React, { FC, memo, useCallback } from 'react';
import { FileAttachmentForm } from '@labkey/components';
import { Map } from 'immutable';
import { Draft, produce } from 'immer';
import { FileAttachmentModel } from "./models";
import { Panel } from 'react-bootstrap';

interface Props {
    model: FileAttachmentModel;
    onInputChange: (model: FileAttachmentModel) => void;
}

// Functional component which would be rendered as part of the parent component
export const FileAttachmentPanel: FC<Props> = memo((props) => {
    const { model, onInputChange } = props;

    const onFileChange = useCallback((files: Map<string, File>) => {
        const updatedModel = produce(model, (draft: Draft<FileAttachmentModel>) => {
            draft['filesToUpload'] = files;
        });
        onInputChange(updatedModel);

    }, [model, onInputChange]);

    return (
            <Panel
                className='panel panel-default'
                expanded={true}
                onToggle={function () {
                }} // this is added to suppress JS warning about providing an expanded prop without onToggle
            >
                <div className='bg-primary'>
                    <Panel.Heading>
                        <div className='panel-title'>My File Attachments</div>
                    </Panel.Heading>
                </div>
                <Panel.Body>
                    <FileAttachmentForm
                        acceptedFormats=".pdf, .jpg"
                        allowDirectories={false}
                        allowMultiple={true}
                        showLabel={false}
                        onFileChange={onFileChange}
                    />
                </Panel.Body>
            </Panel>
    );
})