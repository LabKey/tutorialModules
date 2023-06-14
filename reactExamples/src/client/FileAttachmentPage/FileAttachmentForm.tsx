/*
 * Copyright (c) 2020 LabKey Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React, { FC, memo, useCallback, useState } from 'react'
import { Alert } from "@labkey/components";

import { FileAttachmentPanel } from "./FileAttachmentPanel";
import { FileDisplayPanel } from './FileDisplayPanel';
import { FileAttachmentModel } from "./models";
import { uploadMyAttachmentsToServer } from "./actions";

import './fileAttachment.scss';

export const App : FC = memo(() => {
    const [fileAttachmentModel, setFileAttachmentModel] = useState<FileAttachmentModel>(new FileAttachmentModel());

    const fileAttachmentChange = useCallback((model:FileAttachmentModel)=> {
        setFileAttachmentModel(model);
    }, [setFileAttachmentModel]);

    const onSaveBtnHandler = useCallback(() => {
        uploadMyAttachmentsToServer(fileAttachmentModel)
            .then(r => {
                if (r) {
                    window.location.reload();
                }
            })
            .catch(reject => {
                alert(reject);
            });
    }, [fileAttachmentModel]);

    return (
        <>
            <Alert bsStyle="info">Note: saving uploaded files will place them in the LabKey filesystem for this container.</Alert>

            <FileAttachmentPanel
                model={fileAttachmentModel}
                onInputChange={fileAttachmentChange}
                onSaveBtnHandler={onSaveBtnHandler}
            />

            <FileDisplayPanel />
        </>
    )
})