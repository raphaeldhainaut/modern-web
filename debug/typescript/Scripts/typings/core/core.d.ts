declare module Utilities {
    interface IDictionary<T> {
        Add(key: string, value: T): void;
        Remove(key: string): void;
        ContainsKey(key: string): boolean;
        Keys(): Array<string>;
        Values(): Array<T>;
    }
    interface IKeyValuePair<String, T> {
        Key: string;
        Value: T;
    }
    class Dictionary<T> implements IDictionary<T> {
        private keys;
        private values;
        constructor(init?: {
            key: string;
            value: T;
        }[]);
        Add(key: string, value: T): void;
        Remove(key: string): void;
        Keys(): Array<string>;
        Values(): Array<T>;
        ContainsKey(key: string): boolean;
    }
}
