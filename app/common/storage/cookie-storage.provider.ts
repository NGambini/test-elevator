import { Injectable } from '@angular/core';

import { Storage } from '../interfaces/storage';

@Injectable()
export class CookieStorageProvider implements Storage {

    constructor(private _exp: number) {
    }

    store(key: string, value: string): void {
        var date = new Date();
        date.setTime(date.getTime() + (this._exp * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date;
        document.cookie = key + "=" + value + expires + "; path=/";
    }

    read(key: string): string {
        var name = key + "=";
        var ca = document.cookie.split(';');
        for (var i = 0, max = ca.length; i < max; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1, c.length);
            }

            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }

        return null;
    }

    remove(key: string): void {
        document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
}