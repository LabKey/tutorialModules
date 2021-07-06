import React, { FC, memo, useEffect, useState } from 'react';
import { Draft, produce } from "immer";
import { ActionURL } from "@labkey/api";
import { LoadingSpinner } from '@labkey/components';

import { MY_ATTACHMENTS_DIR } from "./constants";
import { FileAttachmentModel, SavedFileModel } from "./models";
import { getUploadedFiles } from "./actions";

export const FileDisplayPanel : FC = memo(() => {
    const [loading, setLoading] = useState<boolean>(true);
    const [fileAttachmentModel, setFileAttachmentModel] = useState<FileAttachmentModel>(new FileAttachmentModel());

    //equivalent to componentDidMount and componentDidUpdate
    useEffect(() => {
        getUploadedFiles(ActionURL.getContainer(), MY_ATTACHMENTS_DIR, false)
            .then((files:Array<SavedFileModel>) => {
                if (files?.length > 0) {
                    const updatedModel = produce(fileAttachmentModel, (draft: Draft<FileAttachmentModel>) => {
                        draft['savedFiles'] = files;
                    });
                    setFileAttachmentModel(updatedModel);
                }
                else {
                    setFileAttachmentModel(new FileAttachmentModel());
                }

                setLoading(false);
            });
    }, []);

    return (
        <div className='panel panel-default'>
            <div className='panel-heading'>
                My Uploaded Attachments
            </div>
            <div className='panel-body'>
                {loading && <LoadingSpinner />}
                {
                    !loading && fileAttachmentModel.savedFiles?.length > 0 && (
                        <ul>
                            {
                                fileAttachmentModel?.savedFiles?.map((savedFile) => (
                                    <li key={savedFile.fileName}>
                                        <a href={savedFile.href} target='_blank'>{savedFile.fileName}</a>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
                {
                    !loading && !fileAttachmentModel.savedFiles && (
                        <p>
                            No files to display. Use the panel above to upload files to this location.
                        </p>
                    )
                }
                {!loading && (
                    <p>
                        <a className='labkey-text-link' href={ActionURL.buildURL('filecontent', 'begin', undefined, {
                            path: MY_ATTACHMENTS_DIR
                        })}>
                            Manage Files
                        </a>
                    </p>
                )}
            </div>
        </div>
    );
})
