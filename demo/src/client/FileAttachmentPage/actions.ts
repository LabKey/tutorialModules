import {FileAttachmentModel} from "./models";
import {uploadWebDavFile} from "@labkey/components";
import { ActionURL } from "@labkey/api";

//Uploads files to the server using WebDav api
export async function uploadMyAttachmentsToServer(model: FileAttachmentModel): Promise<any> {
    return new Promise((resolve, reject) => {

        // Nothing to do here
        if (model.filesToUpload?.size === 0) {
            resolve(model.filesToUpload);
        }

        const dir = "MyAttachmentsDir";
        const uploadedFiles = Array<string>();

        model.filesToUpload.map((fileToUpload) => {

            if (fileToUpload) {
                uploadWebDavFile(fileToUpload, ActionURL.getContainer(), dir, true)
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