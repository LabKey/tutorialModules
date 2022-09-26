import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { Draft, produce } from "immer";
import { ActionURL } from "@labkey/api";
import { createWebDavDirectory, LoadingSpinner } from '@labkey/components';

import { MY_ATTACHMENTS_DIR } from "./constants";
import { FileAttachmentModel, SavedFileModel } from "./models";
import { getUploadedFiles } from "./actions";
import { CreateSubfolderModal } from './CreateSubfolderModal';

export const FileDisplayPanel : FC = memo(() => {
    const [loading, setLoading] = useState<boolean>(true);
    const [showCreateSubfolderModal, setShowCreateSubfolderModal] = useState<boolean>();
    const [fileAttachmentModel, setFileAttachmentModel] = useState<FileAttachmentModel>(new FileAttachmentModel());

    //equivalent to componentDidMount and componentDidUpdate
    useEffect(() => {
        if (!loading) return;

        getUploadedFiles(ActionURL.getContainer(), MY_ATTACHMENTS_DIR, true)
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
    }, [loading]);

    const onCreateSubfolder = useCallback(() => {
        setShowCreateSubfolderModal(true);
    }, []);

    const closeCreateSubfolder = useCallback(() => {
        setShowCreateSubfolderModal(false);
    }, []);

    const submitCreateSubfolder = useCallback((name: string) => {
        let path = MY_ATTACHMENTS_DIR;
        if (!name?.startsWith('/')) path = path + '/';
        path = path + name;

        createWebDavDirectory(ActionURL.getContainer(), path, true)
            .then(() => {
                // reset loading state to force refresh of panel savedFiles
                setLoading(true);
            });

        closeCreateSubfolder();
    }, [closeCreateSubfolder]);

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
                            No files or subfolders to display. Use the panel above to upload files to this location.
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
                        <a className='labkey-text-link' onClick={onCreateSubfolder}>
                            Create Subfolder
                        </a>
                    </p>
                )}
                {showCreateSubfolderModal && <CreateSubfolderModal close={closeCreateSubfolder} submit={submitCreateSubfolder} />}
            </div>
        </div>
    );
})
