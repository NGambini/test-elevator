import { Injectable } from '@angular/core';

import { Storage } from '../interfaces/storage';

@Injectable()
export class LocalStorageProvider implements Storage {

    store(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    read(key: string): string {
        return localStorage.getItem(key);
    }

    remove(key: string): void {
        localStorage.removeItem(key);
    }
}