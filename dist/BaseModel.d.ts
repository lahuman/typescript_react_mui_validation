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
export declare class RegexAndMsg {
    regex: RegExp;
    msg: string;
    constructor(regex: RegExp, msg: string);
}
export declare type KeyAndRegexMsg = {
    [index: string]: RegexAndMsg;
};
export declare class BaseModel {
    [index: string]: any;
    static readonly required: Strings | KeyAndMsg;
    static readonly number: Strings | KeyAndMsg;
    static readonly min: KeyAndNumber | KeyAndKeyAndMsg;
    static readonly max: KeyAndNumber | KeyAndKeyAndMsg;
    static readonly same: KeyAndStrings | KeyWithKeysAndMsg;
    static readonly regex: KeyAndRegex | KeyAndRegexMsg;
}
