/*
 * Copyright (c) 2023-2026 LabKey Corporation
 *
 * Licensed under the Apache License, Version 2.0: http://www.apache.org/licenses/LICENSE-2.0
 */
import { immerable } from "immer";
import { Map } from "immutable";

export class FileAttachmentModel {
    [immerable] = true;

    readonly filesToUpload?: Map<string, File>; // to upload files to the server
    readonly savedFiles?: Array<SavedFileModel>; // to get uploaded file props from the server

    constructor(values?: Partial<FileAttachmentModel>) {
        Object.assign(this, values);
    }

    static create(raw?: any): FileAttachmentModel {
        return new FileAttachmentModel({ ...raw });
    }
}

export class SavedFileModel {
    [immerable] = true;

    readonly href: string;
    readonly fileName: string;

    constructor(values?: Partial<SavedFileModel>) {
        Object.assign(this, values);
    }

    static create(raw?: any): SavedFileModel {
        return new SavedFileModel({ ...raw });
    }
}