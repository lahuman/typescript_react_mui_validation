export type Strings = string[];
export type KeyAndMsg = { [index: string]: string };
export type KeyAndNumber = { [index: string]: number };
export class NumberAndMsg {
  num: number;
  msg: string;
  constructor(num: number, msg: string) {
    this.num = num;
    this.msg = msg;
  }
}
export type KeyAndKeyAndMsg = { [index: string]: NumberAndMsg };
export type KeyAndStrings = { [index: string]: Strings };
export type KeyWithKeysAndMsg = {
  [index: string]: { [index: string]: string };
};

export type KeyAndRegex = { [index: string]: RegExp };
export class KeyAndRegexAndMsg {
  regex: RegExp;
  msg: string;
  constructor(regex: RegExp, msg: string) {
    this.regex = regex;
    this.msg = msg;
  }
}

export type KeyAndRegexMsg = { [index: string]: KeyAndRegexAndMsg };

export default class BaseModel {
  [index: string]: any;

  protected static _required: Strings | KeyAndMsg = [];

  protected static _min: KeyAndNumber | KeyAndKeyAndMsg = {};

  protected static _max: KeyAndNumber | KeyAndKeyAndMsg = {};

  protected static _same: KeyAndStrings | KeyWithKeysAndMsg = {};

  protected static _regex: KeyAndRegex | KeyAndRegexMsg = {};

  public static get required() {
    return this._required;
  }

  public static get min() {
    return this._min;
  }

  public static get max() {
    return this._max;
  }

  public static get same() {
    return this._same;
  }

  public static get regex() {
    return this._regex;
  }
}
