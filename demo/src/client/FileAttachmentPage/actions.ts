import { ActionURL } from "@labkey/api";
import { getWebDavFiles, uploadWebDavFile, WebDavFile } from "@labkey/components";

import { MY_ATTACHMENTS_DIR } from "./constants";
import { FileAttachmentModel, SavedFileModel } from "./models";

//Uploads files to the server using WebDav api.
export function uploadMyAttachmentsToServer(model: FileAttachmentModel): Promise<any> {
    return new Promise((resolve, reject) => {

        // Nothing to do here
        if (model.filesToUpload?.size === 0) {
            resolve(model.filesToUpload);
        }
        const uploadedFiles = Array<string>();

        model.filesToUpload.map((fileToUpload) => {

            if (fileToUpload) {
                uploadWebDavFile(fileToUpload, ActionURL.getContainer(), MY_ATTACHMENTS_DIR, true)
                    .then((name: string) => {
                        uploadedFiles.push(name);
                        if (uploadedFiles.length ===  model.filesToUpload.size) {
                            resolve(uploadedFiles);
                        }
                    })
                    .catch(reason => {
                        reject(reason);
                    });
            }
        }, this);
    });
}

// Gets file(s) previously uploaded to the server using WebDav api
export async function getUploadedFiles(container: string, directory?: string, includeSubdirectories?: boolean): Promise<Array<SavedFileModel>> {
    return new Promise(async (resolve, reject) => {
        try {
            const webDavFilesResponse = await getWebDavFiles(container, directory, includeSubdirectories);

            // Note: you can return other properties of the WebDavFile, below only returns file name & href
            const displayFiles = webDavFilesResponse.get('files').valueSeq().map((file: WebDavFile) => {
                return new SavedFileModel({fileName: file.name, href: file.href});
            });
            resolve(displayFiles.toArray());

        } catch (response) {
            let msg = `Unable to load files in ${(directory ? directory : 'root')}`;
            if (response) {
                msg += `: ${response}`;
                reject(msg);
            }
            else {
                resolve(Array<SavedFileModel>());
            }
        }
    });
}