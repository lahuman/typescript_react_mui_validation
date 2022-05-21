export declare type Strings = string[];
export declare type KeyAndMsg = {
    [index: string]: string;
};
export declare type KeyAndNumber = {
    [index: string]: number;
};
export declare class NumberAndMsg {
    num: number;
    msg: string;
    constructor(num: number, msg: string);
}
export declare type KeyAndKeyAndMsg = {
    [index: string]: NumberAndMsg;
};
export declare type KeyAndStrings = {
    [index: string]: Strings;
};
export declare type KeyWithKeysAndMsg = {
    [index: string]: {
        [index: string]: string;
    };
};
export declare type KeyAndRegex = {
    [index: string]: RegExp;
};
export declare class KeyAndRegexAndMsg {
    regex: RegExp;
    msg: string;
    constructor(regex: RegExp, msg: string);
}
export declare type KeyAndRegexMsg = {
    [index: string]: KeyAndRegexAndMsg;
};
export default class BaseModel {
    [index: string]: any;
    protected static _required: Strings | KeyAndMsg;
    protected static _min: KeyAndNumber | KeyAndKeyAndMsg;
    protected static _max: KeyAndNumber | KeyAndKeyAndMsg;
    protected static _same: KeyAndStrings | KeyWithKeysAndMsg;
    protected static _regex: KeyAndRegex | KeyAndRegexMsg;
    static get required(): KeyAndMsg | Strings;
    static get min(): KeyAndNumber | KeyAndKeyAndMsg;
    static get max(): KeyAndNumber | KeyAndKeyAndMsg;
    static get same(): KeyAndStrings | KeyWithKeysAndMsg;
    static get regex(): KeyAndRegex | KeyAndRegexMsg;
}
