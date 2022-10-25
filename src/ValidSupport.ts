import { BaseModel } from "./BaseModel";

const requiredDefaultMsg = "is required!";
const numberDefaultMsg = "is not number!";
const sameDefaultMsg = "You must enter the same value.";
const regexDefaultMsg = (regex: RegExp) =>
  `You must enter the ${regex.toString()} rule.`;

const getNumAndMessage = (
  clazz: BaseModel,
  key: string,
  type: string
): { num: number; errMsg: string } => {
  let num = 0;
  let errMsg = "";

  if (typeof clazz[type][key] === "number") {
    num = clazz[type][key];
    errMsg = `The ${type}imum is ${num}!`;
  } else {
    num = clazz[type][key].num;
    errMsg = clazz[type][key].msg;
  }

  return { num, errMsg };
};


const getLengthAndMessage = (
  clazz: BaseModel,
  key: string,
  type: string
): { num: number; errMsg: string } => {
  let num = 0;
  let errMsg = "";

  if (typeof clazz[`${type}Length`][key] === "number") {
    num = clazz[`${type}Length`][key];
    errMsg = `The ${type}imum is ${num}!`;
  } else {
    num = clazz[`${type}Length`][key].num;
    errMsg = clazz[`${type}Length`][key].msg;
  }

  return { num, errMsg };
};


const minOrMaxLengthProcess = (
  isMin: boolean,
  clazz: BaseModel,
  data: BaseModel,
  key: string
) => {
  const type = isMin ? "min" : "max";
  const { num, errMsg } = getLengthAndMessage(clazz, key, type);
  let valid = makeInitValid(key);
  let isValid = true;
  let checking = isMin
    ? data[key].trim().length < num
    : data[key].trim().length  > num;
  if (checking) {
    valid = {
      [key]: {
        error: true,
        errMsg,
      },
    };
    isValid = false;
  }
  return { valid, isValid };
};

const minOrMaxProcess = (
  isMin: boolean,
  clazz: BaseModel,
  data: BaseModel,
  key: string
) => {
  const type = isMin ? "min" : "max";
  const { num, errMsg } = getNumAndMessage(clazz, key, type);
  let valid = makeInitValid(key);
  let isValid = true;
  let checking = isMin
    ? parseInt(data[key], 10) < num
    : parseInt(data[key], 10) > num;
  if (!isNaN(parseInt(data[key], 10)) && checking) {
    valid = {
      [key]: {
        error: true,
        errMsg,
      },
    };
    isValid = false;
  }
  return { valid, isValid };
};

export class ErrorState {
  [index: string]: { error: boolean; errMsg: string };
}

export const initErrorState = {} as ErrorState;

export const makeErrorProps = (state: ErrorState, key: string) => ({
  error: state[key]?.error,
  helperText: state[key]?.error ? state[key].errMsg : "",
});

const makeInitValid = (key: string) => ({
  [key]: { error: false, errMsg: "" },
});
const noError = (stat: ErrorState, key: string) =>
  !stat[key] || !stat[key].error;


const _requiredValid = (data: BaseModel, key: string, errMsg: string): [any, boolean] => {
  let valid = makeInitValid(key);
  let isValid = true;
  let value = data[key];
  if (typeof data[key] === 'string') {
    value = data[key].trim();
  }

  if (value === "") {
    valid = { [key]: { error: true, errMsg } };
    isValid = false;
  }

  return [valid, isValid];
}
const _numberValid = (data: BaseModel, key: string, errMsg: string): [any, boolean] => {
  let valid = makeInitValid(key);
  let isValid = true;
  if (isNaN(parseInt(data[key], 10))) {
    valid = { [key]: { error: true, errMsg } };
    isValid = false;
  }

  return [valid, isValid];
}

export function validation(
  rule: BaseModel,
  data: BaseModel
): { newErrorState: ErrorState; isValid: boolean } {
  let newErrorState = {} as ErrorState;
  let isValid = true;

  const requiredIsArray = rule.required instanceof Array;
  const requiredKeys = requiredIsArray ? rule.required : Object.keys(rule.required);
  for (const key of requiredKeys) {
    const [valid, updateIsValid] = _requiredValid(data, key, requiredIsArray ? requiredDefaultMsg : rule.required[key]);
    newErrorState = { ...newErrorState, ...valid };
    if (!updateIsValid) isValid = false;
  }

  const numberIsArray = rule.number instanceof Array;
  const numberKeys = numberIsArray ? rule.number : Object.keys(rule.number);
  for (const key of numberKeys) {
    const [valid, updateIsValid] = _numberValid(data, key, numberIsArray ? numberDefaultMsg : rule.number[key]);
    newErrorState = { ...newErrorState, ...valid };
    if (!updateIsValid) isValid = false;
  }

  for (const key of Object.keys(rule.minLength)) {
    if (noError(newErrorState, key)) {
      const { valid, isValid: noError } = minOrMaxLengthProcess(
        true,
        rule,
        data,
        key
      );
      newErrorState = { ...newErrorState, ...valid };
      if (!noError) isValid = noError;
    }
  }


  for (const key of Object.keys(rule.maxLength)) {
    if (noError(newErrorState, key)) {
      const { valid, isValid: noError } = minOrMaxLengthProcess(
        false,
        rule,
        data,
        key
      );
      newErrorState = { ...newErrorState, ...valid };
      if (!noError) isValid = noError;
    }
  }


  for (const key of Object.keys(rule.min)) {
    if (noError(newErrorState, key)) {
      const { valid, isValid: noError } = minOrMaxProcess(
        true,
        rule,
        data,
        key
      );
      newErrorState = { ...newErrorState, ...valid };
      if (!noError) isValid = noError;
    }
  }

  for (const key of Object.keys(rule.max)) {
    if (noError(newErrorState, key)) {
      const { valid, isValid: noError } = minOrMaxProcess(
        false,
        rule,
        data,
        key
      );
      newErrorState = { ...newErrorState, ...valid };
      if (!noError) isValid = noError;
    }
  }

  for (const key of Object.keys(rule.same)) {
    if (noError(newErrorState, key)) {
      let valid = makeInitValid(key);
      let errMsg = sameDefaultMsg;
      let cKeys = [];
      let notArray = true;

      if (rule.same[key] instanceof Array) {
        cKeys = rule.same[key];
        notArray = false;
      } else {
        cKeys = Object.keys(rule.same[key]);
        notArray = true;
      }

      for (const cKey of cKeys) {
        valid = { ...valid, ...makeInitValid(cKey) };
        if (data[key] !== data[cKey]) {
          valid = {
            ...valid,
            [key]: {
              error: true,
              errMsg: notArray ? rule.same[key][cKey] : errMsg,
            },
            [cKey]: {
              error: true,
              errMsg: notArray ? rule.same[key][cKey] : errMsg,
            },
          };
          isValid = false;
        }
      }

      newErrorState = { ...newErrorState, ...valid };
    }
  }

  for (const key of Object.keys(rule.regex)) {
    if (noError(newErrorState, key)) {
      let valid = makeInitValid(key);
      if (data[key].trim() !== "") {
        let regex;
        let errMsg = "";
        if (rule.regex[key] instanceof RegExp) {
          regex = rule.regex[key];
          errMsg = regexDefaultMsg(regex);
        } else {
          regex = rule.regex[key].regex;
          errMsg = rule.regex[key].msg;
        }

        if (!regex.test(data[key])) {
          valid = { [key]: { error: true, errMsg } };
          isValid = false;
        }
      }
      newErrorState = { ...newErrorState, ...valid };
    }
  }

  return { newErrorState, isValid };
}
