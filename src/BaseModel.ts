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
export class RegexAndMsg {
  regex: RegExp;
  msg: string;
  constructor(regex: RegExp, msg: string) {
    this.regex = regex;
    this.msg = msg;
  }
}

export type KeyAndRegexMsg = { [index: string]: RegexAndMsg };

export class BaseModel {
  [index: string]: any;

  static required: Strings | KeyAndMsg = [];

  static min: KeyAndNumber | KeyAndKeyAndMsg = {};

  static max: KeyAndNumber | KeyAndKeyAndMsg = {};

  static same: KeyAndStrings | KeyWithKeysAndMsg = {};

  static regex: KeyAndRegex | KeyAndRegexMsg = {};
}
