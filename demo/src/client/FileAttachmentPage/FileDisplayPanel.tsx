import React, { FC, memo, useCallback, useEffect, useState } from 'react';
import { Panel } from 'react-bootstrap';
import { MY_ATTACHMENTS_DIR } from "./constants";
import { Draft, produce } from "immer";
import { ActionURL } from "@labkey/api";
import { FileAttachmentModel, SavedFileModel } from "./models";
import { getUploadedFiles } from "./actions";

export const App : FC = memo(() => {

    const [fileAttachmentModel, setFileAttachmentModel] = useState<FileAttachmentModel>(new FileAttachmentModel());

    //equivalent to componentDidMount and componentDidUpdate
    useEffect(() => {
        getUploadedFiles(ActionURL.getContainer(), MY_ATTACHMENTS_DIR, false).then((files:Array<SavedFileModel>) => {
            if (files?.length > 0) {
                const updatedModel = produce(fileAttachmentModel, (draft: Draft<FileAttachmentModel>) => {
                    draft['savedFiles'] = files;
                });
                setFileAttachmentModel(updatedModel);
            }
            else {
                setFileAttachmentModel(new FileAttachmentModel());
            }
        });
    }, []);

    const showImg = useCallback((evt: any) => {
        const attachment = fileAttachmentModel.savedFiles?.filter(file => file.fileName === evt.target.innerText)
        if (attachment) {
            window.open(attachment[0].href,'popwin');
        }
    }, [fileAttachmentModel]);

    return (
        <>
            <Panel
                className='panel panel-default'
                expanded={true}
                onToggle={function () {
                }}
            >
                <div className='bg-primary'>
                    <Panel.Heading>
                        <div className='panel-title'>My Uploaded Attachments</div>
                    </Panel.Heading>
                </div>
                <Panel.Body>
                    {
                        fileAttachmentModel.savedFiles?.length > 0 &&
                        <>
                            {
                                fileAttachmentModel?.savedFiles?.map((savedFile, idx) => {
                                    return <div>
                                        <a href="#" onClick={showImg}>{savedFile.fileName}</a>
                                    </div>
                                })
                            }
                        </>
                    }
                    {
                        !fileAttachmentModel.savedFiles &&
                        <div>
                            No files to display. Please upload files by going <a href={ActionURL.getContextPath() + '/home/demo-fileAttachmentForm.view#'}>here</a>.
                        </div>
                    }
                </Panel.Body>
            </Panel>
        </>
    );
})
