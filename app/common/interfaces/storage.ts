export interface Storage {
    store(key: string, value: string): void;

    read(key: string): string;

    remove(key: string): void;
}