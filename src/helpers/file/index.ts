import * as fs from 'fs';
import * as path from 'path';

export namespace FileHelper {
    export const getRoot = (): string => {
        return path.resolve(__dirname);
    };

    export const deleteFile = (filePath: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    export const deleteFolder = (folderPath: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            fs.rm(folderPath, {recursive: true, force: true}, (err) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    };

    export const getFile = (filePath: string): Promise<string> => {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    };
}
