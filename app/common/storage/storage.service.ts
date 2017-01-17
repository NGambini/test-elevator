import { Injectable } from '@angular/core';

import { Storage } from '../interfaces/storage';

import { CookieStorageProvider } from './cookie-storage.provider';
import { LocalStorageProvider } from './local-storage.provider';

@Injectable()
export class StorageService implements Storage {
    private _supportLocalStorage: boolean;
    private _storageProvider: Storage;

    constructor() {
        this._supportLocalStorage = localStorage ? true : false;
        this._storageProvider = this._supportLocalStorage ? new LocalStorageProvider() : new CookieStorageProvider(1);
    }

    store(key: string, value: string): void {
        if (typeof value !== "undefined" && value !== null) {
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }

            this._storageProvider.store(key, value);
        }
    }

    read(key: string): string {
        return this._storageProvider.read(key);
    }

    remove(key: string): void {
        this._storageProvider.remove(key);
    }
}