export type Strings = string[];
export type KeyAndModel = { [index: string]: BaseModel };
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

  static readonly required: Strings | KeyAndMsg = [];

  static readonly number: Strings | KeyAndMsg = [];

  static readonly min: KeyAndNumber | KeyAndKeyAndMsg = {};

  static readonly max: KeyAndNumber | KeyAndKeyAndMsg = {};

  static readonly same: KeyAndStrings | KeyWithKeysAndMsg = {};

  static readonly regex: KeyAndRegex | KeyAndRegexMsg = {};

  static readonly minLength: KeyAndNumber | KeyAndKeyAndMsg = {};

  static readonly maxLength: KeyAndNumber | KeyAndKeyAndMsg = {};

  static readonly item: KeyAndModel = {};
}
