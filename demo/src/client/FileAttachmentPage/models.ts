import {immerable} from "immer";
import {Map} from "immutable";

export class FileAttachmentModel {
    [immerable] = true;

    readonly filesToUpload?: Map<string, File>; // to upload files to the server

    constructor(values?: Partial<FileAttachmentModel>) {
        Object.assign(this, values);
    }

    static create(raw?: any): FileAttachmentModel {
        return new FileAttachmentModel({ ...raw });
    }
}