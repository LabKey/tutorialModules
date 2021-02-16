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
import React, { FC, memo, useCallback, useEffect, useState } from 'react'
import { FileAttachmentPanel } from "./FileAttachmentPanel";
import { FileAttachmentModel } from "./models";
import './fileAttachment.scss';
import { ActionURL, getServerContext } from "@labkey/api";
import { uploadMyAttachmentsToServer } from "./actions";


export const App : FC = memo(() => {

    const [fileAttachmentModel, setFileAttachmentModel] = useState<FileAttachmentModel>(new FileAttachmentModel());

    //equivalent to componentDidMount and componentDidUpdate
    useEffect(() => {

    }, []);

    const fileAttachmentChange = useCallback((model:FileAttachmentModel)=> {
        setFileAttachmentModel(model);
    }, [fileAttachmentModel]);

    const onSaveBtnHandler = useCallback((event) => {

        uploadMyAttachmentsToServer(fileAttachmentModel)
            .then(r => {
                if (r) {
                    //Routes to home page. Users can view files uploaded via Files webpart.
                    window.location.href = ActionURL.buildURL('project', 'begin', getServerContext().container.path)
                }
            })
            .catch(reject => {
                alert(reject);
            });
    }, [fileAttachmentModel]);

    return (
        <>
            <FileAttachmentPanel onInputChange={fileAttachmentChange} model={fileAttachmentModel}/>

            <button
                className='btn btn-primary pull-right'
                id='saveMyAttachments'
                name='saveMyAttachments'
                onClick={onSaveBtnHandler}>Save my attachments
            </button>
        </>
    )
})